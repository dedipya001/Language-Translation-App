from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import requests
import fitz
import base64
import os
import time
from dotenv import load_dotenv
from schemas import Text
from schemas2 import TranslationRequest, TranslationResponse, DownloadPDFResponse, UploadForm
from translation import translate_text
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

load_dotenv()

model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")



language_mapping = {
    "arabic": "ar_AR",
    "english": "en_XX",
    "gujarati": "gu_IN",
    "hindi": "hi_IN",
    "bengali": "bn_IN",
    "malayalam": "ml_IN",
    "marathi": "mr_IN",
    "tamil": "ta_IN",
    "telugu": "te_IN"
}



@app.get("/")
def index():
    return {"message": "Welcome to the translation API!"}

@app.post("/translate/")
async def translate_text_endpoint(Data: Text) -> List[str]:
    # Check if the target and source languages are supported
    if Data.target_language.lower() not in language_mapping or Data.source_language.lower() not in language_mapping:
        raise HTTPException(status_code=400, detail="Source or target language is not supported.")
    
    source_language_code = language_mapping[Data.source_language.lower()]
    target_language_code = language_mapping[Data.target_language.lower()]
    
    # Perform translation
    translations = translate_text([Data.text], source_language_code, target_language_code)
    
    return translations

pdf_directory = "../Testing/"
output_directory = os.path.join(os.path.dirname(os.getcwd()), "Translated_Texts")
os.makedirs(output_directory, exist_ok=True)

temp_pdf_path = None

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    global temp_pdf_path
    filename = file.filename
    temp_pdf_path = os.path.join(pdf_directory, filename)
    with open(temp_pdf_path, "wb") as temp_pdf:
        temp_pdf.write(await file.read())
    print("Uploaded PDF file saved to:", temp_pdf_path)
    return {"message": "File uploaded successfully"}

def translate_text_from_pdf(temp_pdf_path, target_language):
    text = ""
    with fitz.open(temp_pdf_path) as pdf_document:
        for page_number in range(len(pdf_document)):
            page = pdf_document.load_page(page_number)
            text += page.get_text()
    translated_text = translate_txt(text, target_language)
    timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")
    temp_file_path = os.path.join(output_directory, f"{timestamp}.txt")
    with open(temp_file_path, 'w', encoding='utf-8') as temp_file:
        temp_file.write(translated_text)
    print("Translated text has been written to:", temp_file_path)
    return translated_text



def translate_txt(text, target_language):
    target_language_code = language_mapping.get(target_language.lower())
    if not target_language_code:
        raise ValueError(f"Unsupported target language: {target_language}")
    text_lines = text.splitlines()
    batch_size = 10
    translated_lines = []
    for i in range(0, len(text_lines), batch_size):
        batch = text_lines[i:i+batch_size]
        translated_batch = translate_batch(batch, target_language_code)
        translated_lines.extend(translated_batch)
    translated_text = '\n'.join(translated_lines)
    return translated_text

def translate_batch(text_lines, target_language_code):
    model_inputs = tokenizer(text_lines, return_tensors="pt", padding=True, truncation=True)
    generated_tokens = model.generate(**model_inputs, forced_bos_token_id=tokenizer.lang_code_to_id[target_language_code])
    translations = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
    return translations

# @app.post("/translatefile", response_model=TranslationResponse)
# async def translate_pdf(request: TranslationRequest):
#     translated_text = translate_text_from_pdf(temp_pdf_path, request.language)
#     return TranslationResponse(translated_text=translated_text)

@app.get("/download_pdf/{target_language}", response_model=DownloadPDFResponse)
async def download_pdf(target_language: str):
    translated_text = translate_text_from_pdf(temp_pdf_path, target_language)
    base64_content = base64.b64encode(translated_text.encode()).decode()
    api_endpoint = "https://v2.convertapi.com/convert/txt/to/pdf"
    payload = {
        "Parameters": [
            {
                "Name": "File",
                "FileValue": {
                    "Name": "translatedtext.txt",
                    "Data": base64_content
                }
            },
            {
                "Name": "StoreFile",
                "Value": True
            },
            {
                "Name": "FontSize",
                "Value": "16"
            }
        ]
    }
    convertapi_secret = os.getenv("CONVERTAPI_SECRET")
    if not convertapi_secret:
        raise ValueError("CONVERTAPI_SECRET environment variable is not set.")
    response = requests.post(f"{api_endpoint}?Secret={convertapi_secret}", json=payload)
    if response.status_code == 200:
        response_data = response.json()
        download_link = response_data["Files"][0]["Url"]
        return DownloadPDFResponse(download_link=download_link)
    else:
        raise ValueError("Failed to convert the text to PDF.")

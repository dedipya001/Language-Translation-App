from fastapi import FastAPI, HTTPException, File , UploadFile
from typing import List
from translation import translate_text, language_mapping
from fastapi.middleware.cors import CORSMiddleware
import schemas
from schemas2 import TranslationRequest, TranslationResponse, DownloadPDFResponse, UploadForm
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import requests
import fitz
import base64
import os
from dotenv import load_dotenv
import time
from pydantic import BaseModel


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

# pdf_directory = "../Testing/"
# output_directory = os.path.join(os.path.dirname(os.getcwd()), "Translated_Texts")
# os.makedirs(output_directory, exist_ok=True)


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

# temp_pdf_path = None

@app.get("/")
def index():
    return {"message": "Welcome to the translation API!"}

@app.post("/translate/")
async def translate_text_endpoint(Data: schemas.Text) -> List[str]:
    # Check if the target and source languages are supported
    if Data.target_language.lower() not in language_mapping or Data.source_language.lower() not in language_mapping:
        raise HTTPException(status_code=400, detail="Source or target language is not supported.")
    
    source_language_code = language_mapping[Data.source_language.lower()]
    target_language_code = language_mapping[Data.target_language.lower()]
    
    # Perform translation
    # translations = translate_text([Data.text], source_language_code)
    translations = translate_text([Data.text], source_language_code, target_language_code)
    
    return translations



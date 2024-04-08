
# # .txt to .txt using the Mbart model

# import fitz  # PyMuPDF
# from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
# import tempfile
# import requests
# import base64
# import json

# model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
# tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

# pdf_path = "../Testing/Normal.pdf"

# language_mapping = {
#     "arabic": "ar_AR",
#     "english": "en_XX",
#     "gujarati": "gu_IN",
#     "hindi": "hi_IN",
#     "bengali": "bn_IN",
#     "malayalam": "ml_IN",
#     "marathi": "mr_IN",
#     "tamil": "ta_IN",
#     "telugu": "te_IN"
# }

# def select_output_language():
#     print("Available languages:")
#     for language in language_mapping:
#         print(language)
#     while True:
#         choice = input("Enter the desired language: ").lower()
#         if choice in language_mapping:
#             return language_mapping[choice]
#         else:
#             print("Invalid language. Please choose from the available languages.")


# def translate_text_from_pdf(pdf_path, output_language):
#     text = ""
#     with fitz.open(pdf_path) as pdf_document:
#         for page_number in range(len(pdf_document)):
#             page = pdf_document.load_page(page_number)
#             text += page.get_text()
    
    
#     translated_text = translate_text(text, output_language)
#     return translated_text

# def translate_text(text, output_language):
#     text_lines = text.splitlines()
#     batch_size = 10  # Adjust the batch size as needed
#     translated_lines = []
#     for i in range(0, len(text_lines), batch_size):
#         batch = text_lines[i:i+batch_size]
#         translated_batch = translate_batch(batch, output_language)
#         translated_lines.extend(translated_batch)
#     translated_text = '\n'.join(translated_lines)
#     return translated_text


# def translate_batch(text_lines, output_language):
#     model_inputs = tokenizer(text_lines, return_tensors="pt", padding=True, truncation=True)
#     generated_tokens = model.generate(**model_inputs, forced_bos_token_id=tokenizer.lang_code_to_id[output_language])
#     translations = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
#     return translations

# # Translate text from the PDF file
# output_language = select_output_language()
# translated_text = translate_text_from_pdf(pdf_path, output_language)

# output_file = "translated_text.txt"
# with open(output_file, "w", encoding="utf-8") as file:
#     file.write(translated_text)

# print("Translated text has been written to:", output_file)



# #sending api req and then obtaining download link for pdf


# with open(output_file, "r", encoding="utf-8") as file:
#     txt_content = file.read()

# base64_content = base64.b64encode(txt_content.encode()).decode()

# api_endpoint = "https://v2.convertapi.com/convert/txt/to/pdf?Secret=XBhgaKwRYekTUC7p"

# payload = {
#     "Parameters": [
#         {
#             "Name": "File",
#             "FileValue": {
#                 "Name": "translatedtext.txt",
#                 "Data": base64_content
#             }
#         },
#         {
#             "Name": "StoreFile",
#             "Value": True
#         },
#         {
#             "Name": "FontSize",
#             "Value": "16"
#         }
#     ]
# }

# response = requests.post(api_endpoint, json=payload)
# if response.status_code == 200:
#     response_data = response.json()
#     print("Link to download: ", response_data["Files"][0]["Url"])
   



import fitz  # PyMuPDF
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import tempfile
import requests
import base64
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

pdf_path = "../Testing/smalltest.pdf"

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

def select_output_language():
    print("Available languages:")
    for language in language_mapping:
        print(language)
    while True:
        choice = input("Enter the desired language: ").lower()
        if choice in language_mapping:
            return language_mapping[choice]
        else:
            print("Invalid language. Please choose from the available languages.")

def translate_text_from_pdf(pdf_path, output_language):
    text = ""
    with fitz.open(pdf_path) as pdf_document:
        for page_number in range(len(pdf_document)):
            page = pdf_document.load_page(page_number)
            text += page.get_text()
    
    translated_text = translate_text(text, output_language)
    return translated_text

def translate_text(text, output_language):
    text_lines = text.splitlines()
    batch_size = 10  # Adjust the batch size as needed
    translated_lines = []
    for i in range(0, len(text_lines), batch_size):
        batch = text_lines[i:i+batch_size]
        translated_batch = translate_batch(batch, output_language)
        translated_lines.extend(translated_batch)
    translated_text = '\n'.join(translated_lines)
    return translated_text

def translate_batch(text_lines, output_language):
    model_inputs = tokenizer(text_lines, return_tensors="pt", padding=True, truncation=True)
    generated_tokens = model.generate(**model_inputs, forced_bos_token_id=tokenizer.lang_code_to_id[output_language])
    translations = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
    return translations



# Translate text from the PDF file
output_language = select_output_language()
translated_text = translate_text_from_pdf(pdf_path, output_language)


# output_directory = os.path.join(os.getcwd(), "Backend", "Translatedtexts")
# os.makedirs(output_directory, exist_ok=True)
# output_file = os.path.join(output_directory, "translated_text.txt")
# # Write the translated text to the specified file
# with open(output_file, "w", encoding="utf-8") as file:
#     file.write(translated_text)


output_directory = os.path.join(os.getcwd(), "Backend", "Translated_Texts")
os.makedirs(output_directory, exist_ok=True)

# Create a temporary file with a random name in the specified directory
with tempfile.NamedTemporaryFile(dir=output_directory, delete=False, suffix='.txt') as temp_file:
    temp_file.write(translated_text.encode())

print("Translated text has been written to:", output_file)

print("Translated text has been written to:", output_file)

# Sending API request and then obtaining download link for PDF
with open(output_file, "r", encoding="utf-8") as file:
    txt_content = file.read()

base64_content = base64.b64encode(txt_content.encode()).decode()

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

# Use the ConvertAPI secret key from environment variable
convertapi_secret = os.getenv("CONVERTAPI_SECRET")
if not convertapi_secret:
    print("Error: CONVERTAPI_SECRET environment variable is not set.")
else:
    response = requests.post(f"{api_endpoint}?Secret={convertapi_secret}", json=payload)
    if response.status_code == 200:
        response_data = response.json()
        print("Link to download:", response_data["Files"][0]["Url"])
    else:
        print("Failed to convert the text to PDF.")



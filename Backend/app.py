from fastapi import FastAPI, HTTPException
from typing import List
from translation import translate_text, language_mapping
from fastapi.middleware.cors import CORSMiddleware
import schemas

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    translations = translate_text([Data.text], source_language_code, target_language_code)
    
    return translations



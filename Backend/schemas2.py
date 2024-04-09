from pydantic import BaseModel


class TranslationRequest(BaseModel):
    language: str

class TranslationResponse(BaseModel):
    translated_text: str

class DownloadPDFResponse(BaseModel):
    download_link: str

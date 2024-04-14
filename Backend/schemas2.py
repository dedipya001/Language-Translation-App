from pydantic import BaseModel


class TranslationRequest(BaseModel):
    language: str

class TranslationResponse(BaseModel):
    translated_text: str

class DownloadPDFResponse(BaseModel):
    download_link: str

class UploadForm(BaseModel):
    output_language: str
    file: bytes
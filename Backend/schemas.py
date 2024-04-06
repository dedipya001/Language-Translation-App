from pydantic import BaseModel

class Text(BaseModel):
    text: str
    source_language: str 
    target_language: str

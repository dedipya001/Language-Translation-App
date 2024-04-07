import fitz  # PyMuPDF
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import tempfile

# Initialize the MBART model and tokenizer
model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

pdf_path = "../Testing/Normal.pdf"

# Define the function to extract text from a PDF file and translate it
def translate_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as pdf_document:
        for page_number in range(len(pdf_document)):
            page = pdf_document.load_page(page_number)
            text += page.get_text()
    
    # Translate the extracted text
    translated_text = translate_text(text)
    return translated_text

# Define the function to translate a text
def translate_text(text):
    text_lines = text.splitlines()
    batch_size = 10  # Adjust the batch size as needed
    translated_lines = []
    for i in range(0, len(text_lines), batch_size):
        batch = text_lines[i:i+batch_size]
        translated_batch = translate_batch(batch)
        translated_lines.extend(translated_batch)
    translated_text = '\n'.join(translated_lines)
    return translated_text

# Define the function to translate a batch of text lines
def translate_batch(text_lines):
    model_inputs = tokenizer(text_lines, return_tensors="pt", padding=True, truncation=True)
    generated_tokens = model.generate(**model_inputs, forced_bos_token_id=tokenizer.lang_code_to_id["hi_IN"])
    translations = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
    return translations

# Translate text from the PDF file
translated_text = translate_text_from_pdf(pdf_path)

output_file = "translatedtxt69.txt"

# Write the translated text to the specified file
with open(output_file, "w", encoding="utf-8") as file:
    file.write(translated_text)

# Inform the user about the file path
print("Translated text has been written to:", output_file)

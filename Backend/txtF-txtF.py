from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import PyPDF2
import tempfile

# Initialize the MBART model and tokenizer
model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

# Define the function to extract text from a PDF file and translate it
def translate_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    
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

# Define the path to the PDF file
pdf_path = "C:\\Users\\91983\\OneDrive\\Desktop\\new\\Normal.pdf"

# Translate text from the PDF file
translated_text = translate_text_from_pdf(pdf_path)

# Write the translated text to a temporary text file
with tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".txt", encoding="utf-8") as temp_file:
    temp_file.write(translated_text)

# Inform the user about the temporary file path
print("Translated text from the PDF has been written to a temporary text file:", temp_file.name)

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate
from reportlab.rl_config import defaultPageSize
import codecs

def txt_to_pdf(txt_file_path, pdf_file_path):
    # Read the text file
    with codecs.open(txt_file_path, "r", "utf-8") as txt_file:
        text_content = txt_file.read()

    # Create a PDF document
    doc = SimpleDocTemplate(pdf_file_path, pagesize=letter)
    styles = getSampleStyleSheet()
    style = styles["Normal"]

    # Specify the font explicitly
    style.fontName = "DejaVuSans"

    # Create Paragraph object for each line of text and add to document
    paragraphs = [Paragraph(line, style) for line in text_content.split('\n')]
    doc.build(paragraphs)

# Example usage:
txt_file_path = "input.txt"
pdf_file_path = "output.pdf"
txt_to_pdf(txt_file_path, pdf_file_path)

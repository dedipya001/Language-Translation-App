import requests
import base64
import json
import requests
import base64

with open("translated_text.txt", "r", encoding="utf-8") as file:
    txt_content = file.read()

base64_content = base64.b64encode(txt_content.encode()).decode()

api_endpoint = "https://v2.convertapi.com/convert/txt/to/pdf?Secret=XBhgaKwRYekTUC7p"

payload = {
    "Parameters": [
        {
            "Name": "File",
            "FileValue": {
                "Name": "translatedtxt69.txt",
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

response = requests.post(api_endpoint, json=payload)
if response.status_code == 200:
    response_data = response.json()
    print("Link to download: ", response_data["Files"][0]["Url"])
   
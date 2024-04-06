from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import torch



model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

# Mapping of language names to language codes (lowercase)
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

def translate(articles_en, target_lang, batch_size=4):
    num_articles = len(articles_en)
    translations = []

    for i in range(0, num_articles, batch_size):
        batch_articles = articles_en[i:i+batch_size]
        model_inputs = tokenizer(batch_articles, return_tensors="pt", padding=True, truncation=True)
        target_lang_code = tokenizer.lang_code_to_id[target_lang]  # Use original case
        generated_tokens = model.generate(**model_inputs, forced_bos_token_id=target_lang_code)
        batch_translations = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
        translations.extend(batch_translations)

    return translations

while True:
    x = input("Enter an article (type 'exit' to quit): ")
    if x.lower() == 'exit':
        break
    target_language = input("Enter the language for translation: ").lower()
    if target_language not in language_mapping:
        print("Invalid language name.")
        continue
    target_language_code = language_mapping[target_language]
    
    if len(x) > 512:  
        chunks = [x[i:i+512] for i in range(0, len(x), 512)]
        translations = translate(chunks, target_language_code)
    else:
        translations = translate([x], target_language_code)
    for translation in translations:
        print(translation)





# Define the data to be pickled
data_to_pickle = {
    "translate_function": translate,
    "language_mapping": language_mapping
}

# File path for saving the pickle file
pickle_file_path = "translation_functions.pickle"

# Dump the data into a pickle file
with open(pickle_file_path, "wb") as pickle_file:
    pickle.dump(data_to_pickle, pickle_file)

print("Pickle file has been created successfully:", pickle_file_path)

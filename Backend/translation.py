from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import torch



model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

# Mapping of language names to language codes (lowercase)
language_mapping = {
    "arabic": "ar_AR",
    "english": "en_XX",
    "hindi": "hi_IN",
    "bengali": "bn_IN",
    "malayalam": "ml_IN",
    "marathi": "mr_IN",
    "tamil": "ta_IN",
    "telugu": "te_IN"
}

def translate_text(articles_en, source_lang, target_lang, batch_size=4):
    num_articles = len(articles_en)
    translations = []

    for i in range(0, num_articles, batch_size):
        batch_articles = articles_en[i:i+batch_size]
        
        source_lang_token = tokenizer.lang_code_to_id[source_lang]
        target_lang_token = tokenizer.lang_code_to_id[target_lang]
        
        # Prepend source language token to each article
        batch_articles_with_lang = [f"{article}" for article in batch_articles]
        
        # Tokenize batch_articles_with_lang
        inputs = tokenizer(batch_articles_with_lang, return_tensors="pt", padding=True, truncation=True)
        inputs["labels"] = inputs.input_ids.clone()
        
        # Generate translations
        outputs = model.generate(**inputs, forced_bos_token_id=target_lang_token)
        batch_translations = tokenizer.batch_decode(outputs, skip_special_tokens=True)
        
        translations.extend(batch_translations)

    return translations





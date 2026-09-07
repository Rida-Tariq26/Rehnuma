import os
import re
import google.generativeai as genai
from typing import Tuple

DOMAIN_KEYWORDS = {
    "fir": [
        "fir", "police", "complaint", "arrest", "bail", "investigation", "crime", "criminal",
        "crpc", "ppc", "police station", "thana", "cognizable", "officer", "f.i.r",
        "ایف آئی آر", "پولیس", "شکایت", "گرفتاری", "ضمانت", "تھانہ", "جرم", "سزا"
    ],
    "tenant": [
        "tenant", "landlord", "rent", "evict", "eviction", "lease", "agreement", "premises",
        "rented", "tenancy", "rent controller", "rent agreement", "security deposit",
        "کرایہ دار", "مالک مکان", "کرایہ", "بے دخلی", "معاہدہ کرایہ", "سیکیورٹی"
    ],
    "consumer": [
        "consumer", "defective", "warranty", "seller", "shopkeeper", "product", "service",
        "consumer court", "refund", "unfair trade", "receipt", "fake", "faulty",
        "صارف", "گاہک", "دکاندار", "خریداری", "وارنٹی", "وارنٹی کارڈ", "صارف عدالت"
    ]
}

def classify_query_rule_based(query: str) -> Tuple[str, float]:
    """Fallback keyword match classification for fast & zero-cost classification."""
    q_lower = query.lower()
    scores = {"fir": 0, "tenant": 0, "consumer": 0}
    
    for domain, kw_list in DOMAIN_KEYWORDS.items():
        for kw in kw_list:
            if kw in q_lower:
                scores[domain] += 1
                
    best_domain = max(scores, key=scores.get)
    max_score = scores[best_domain]
    
    if max_score > 0:
        confidence = min(0.60 + (max_score * 0.15), 0.95)
        return best_domain, confidence
        
    return "unknown", 0.0

def classify_query(query: str) -> Tuple[str, float]:
    """
    Classifies a user query (English or Urdu) into one of the MVP legal domains:
    'fir' | 'tenant' | 'consumer' | 'unknown'
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return classify_query_rule_based(query)
        
    try:
        genai.configure(api_key=api_key)
        model_names = [
            os.getenv("GEMINI_MODEL", "gemini-1.5-flash"),
            "gemini-2.0-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-flash",
            "gemini-2.5-flash"
        ]
        prompt = f"""
You are a legal domain classifier for Punjab law (Pakistan).
Classify the following user query into EXACTLY ONE of these categories:
- fir (Police complaints, FIR registration, criminal procedure, police misconduct)
- tenant (Tenant rights, landlord eviction, rent agreement, security deposit)
- consumer (Defective products, seller fraud, consumer court, warranty claims)
- unknown (General questions, irrelevant topics, or unsupported domains like tax, family law, banking)

User Query: "{query}"

Output ONLY a JSON object: {{"domain": "<fir|tenant|consumer|unknown>", "confidence": <float 0.0 to 1.0>}}
"""
        response = None
        for name in model_names:
            try:
                model = genai.GenerativeModel(name)
                response = model.generate_content(
                    prompt,
                    generation_config={"response_mime_type": "application/json"}
                )
                break
            except Exception:
                continue

        if not response:
            return classify_query_rule_based(query)
        import json
        res = json.loads(response.text.strip())
        domain = res.get("domain", "unknown").lower()
        confidence = float(res.get("confidence", 0.5))
        
        if domain not in ["fir", "tenant", "consumer", "unknown"]:
            return classify_query_rule_based(query)
            
        return domain, confidence
    except Exception as e:
        print(f"[Classifier LLM Error] {e}. Falling back to rule-based classification.")
        return classify_query_rule_based(query)

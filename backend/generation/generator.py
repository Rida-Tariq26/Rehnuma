import os
import google.generativeai as genai
from typing import Dict, Any, List
from generation.prompts import SYSTEM_PROMPT, format_user_prompt

def generate_grounded_response(user_query: str, valid_chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Generates a citation-backed response using Gemini 3.6 Flash.
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    
    citations = []
    for chunk in valid_chunks:
        citations.append({
            "act": chunk.get("act_name", ""),
            "section": chunk.get("section_number", ""),
            "title": chunk.get("section_title", ""),
            "passage": chunk.get("text", "")[:300] + "...",
            "similarity": chunk.get("similarity_score", 0.0)
        })
        
    if not api_key:
        # Fallback offline mode for testing UI without API key
        return {
            "explanation": f"**[Offline Mode - GOOGLE_API_KEY not set]**\n\nRetrieved {len(valid_chunks)} supporting sections from Punjab legislation. Configure `GOOGLE_API_KEY` in `.env` to enable full LLM generation.",
            "citations": citations,
            "source_passages": valid_chunks
        }
        
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(
            model_name="gemini-3.6-flash",
            system_instruction=SYSTEM_PROMPT
        )
        
        user_prompt = format_user_prompt(user_query, valid_chunks)
        response = model.generate_content(user_prompt)
        
        return {
            "explanation": response.text.strip(),
            "citations": citations,
            "source_passages": valid_chunks
        }
    except Exception as e:
        print(f"[LLM Generation Error] {e}")
        return {
            "explanation": f"An error occurred while generating the response from legal text: {str(e)}",
            "citations": citations,
            "source_passages": valid_chunks
        }
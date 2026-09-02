from typing import List, Dict, Any, Tuple

CONFIDENCE_THRESHOLD = 0.45  # Minimum similarity score required for supporting evidence

def evaluate_retrieval_confidence(query: str, domain: str, chunks: List[Dict[str, Any]]) -> Tuple[bool, str, List[Dict[str, Any]]]:
    """
    Hallucination Containment Engine:
    Evaluates retrieved statutory chunks to verify if sufficient evidence exists.
    Returns (sufficient: bool, refusal_reason: str, valid_chunks: List[Dict])
    """
    if domain == "unknown":
        return False, "This query falls outside the supported legal domains (FIR/Police, Tenant Rights, and Consumer Protection in Punjab).", []
        
    if not chunks:
        return False, "No relevant legal sections could be retrieved from the official Punjab statutory database for this query.", []
        
    # Filter chunks meeting threshold
    valid_chunks = [c for c in chunks if c.get("similarity_score", 0.0) >= CONFIDENCE_THRESHOLD]
    
    if not valid_chunks:
        return False, f"The retrieved statutory provisions did not reach the confidence threshold ({CONFIDENCE_THRESHOLD}) required to provide an accurate answer without hallucination.", []
        
    return True, "", valid_chunks

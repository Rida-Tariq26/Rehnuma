import os
from typing import List, Dict, Any
from ingest.embedder import get_chroma_client

def retrieve_relevant_chunks(query: str, domain: str, top_k: int = 4) -> List[Dict[str, Any]]:
    """
    Retrieves top_k relevant statutory sections from the appropriate domain collection in ChromaDB.
    Returns list of dicts: {text, act_name, section_number, section_title, similarity_score}
    """
    if domain not in ["fir", "tenant", "consumer"]:
        return []
        
    client = get_chroma_client()
    collection_name = f"{domain}_corpus"
    
    try:
        collection = client.get_collection(name=collection_name)
    except Exception as e:
        print(f"[Retriever Error] Collection {collection_name} not found: {e}")
        return []
        
    results = collection.query(
        query_texts=[query],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )
    
    retrieved_chunks = []
    
    if results and results.get("documents") and results["documents"][0]:
        docs = results["documents"][0]
        metas = results["metadatas"][0]
        distances = results["distances"][0] if "distances" in results else [0.5] * len(docs)
        
        for doc, meta, dist in zip(docs, metas, distances):
            # ChromaDB cosine distance range is 0 (identical) to 2 (opposite).
            # Convert cosine distance to similarity score range 0.0 -> 1.0
            similarity = max(0.0, 1.0 - (dist / 2.0))
            
            retrieved_chunks.append({
                "text": doc,
                "act_name": meta.get("act_name", "Punjab Legislation"),
                "section_number": meta.get("section_number", "Section N/A"),
                "section_title": meta.get("section_title", ""),
                "domain": meta.get("domain", domain),
                "similarity_score": round(similarity, 3)
            })
            
    return retrieved_chunks

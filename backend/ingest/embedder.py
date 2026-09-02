import os
import chromadb
from chromadb.config import Settings
from typing import List, Dict, Any

CHROMA_PATH = os.getenv("CHROMA_PERSIST_DIR", "./data/chroma_db")

def get_chroma_client():
    """Initializes persistent ChromaDB client."""
    os.makedirs(CHROMA_PATH, exist_ok=True)
    return chromadb.PersistentClient(path=CHROMA_PATH)

def populate_vector_store(chunks: List[Dict[str, Any]], client=None):
    """
    Stores legal chunks in ChromaDB grouped by domain collection.
    Collections: 'fir_corpus', 'tenant_corpus', 'consumer_corpus'
    """
    if client is None:
        client = get_chroma_client()
        
    domain_groups: Dict[str, List[Dict[str, Any]]] = {
        "fir": [],
        "tenant": [],
        "consumer": []
    }
    
    for chunk in chunks:
        domain = chunk.get("domain", "fir")
        if domain in domain_groups:
            domain_groups[domain].append(chunk)
            
    stats = {}
    for domain, group in domain_groups.items():
        if not group:
            continue
            
        collection_name = f"{domain}_corpus"
        collection = client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )
        
        ids = [item["chunk_id"] for item in group]
        documents = [item["text"] for item in group]
        metadatas = [{
            "act_name": item["act_name"],
            "section_number": item["section_number"],
            "section_title": item["section_title"],
            "domain": item["domain"]
        } for item in group]
        
        # Upsert into ChromaDB
        collection.upsert(
            ids=ids,
            documents=documents,
            metadatas=metadatas
        )
        
        stats[domain] = collection.count()
        print(f"Collection [{collection_name}] updated: {collection.count()} total items.")
        
    return stats

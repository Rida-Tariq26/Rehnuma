from pydantic import BaseModel, Field
from typing import List, Optional

class QueryRequest(BaseModel):
    question: str = Field(..., max_length=500, example="My landlord wants to evict me without notice. Can he do that?")

class CitationSchema(BaseModel):
    act: str
    section: str
    title: str
    passage: str
    similarity: float

class QueryResponse(BaseModel):
    answered: bool
    domain_detected: str
    domain_confidence: float
    explanation: Optional[str] = None
    citations: List[CitationSchema] = []
    refusal_reason: Optional[str] = None
    query: str

class DomainInfo(BaseModel):
    id: str
    name: str
    description: str
    sources: List[str]

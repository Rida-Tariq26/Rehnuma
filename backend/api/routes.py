from fastapi import APIRouter, HTTPException
from api.schemas import QueryRequest, QueryResponse, CitationSchema, DomainInfo
from retrieval.classifier import classify_query
from retrieval.retriever import retrieve_relevant_chunks
from retrieval.confidence import evaluate_retrieval_confidence
from generation.generator import generate_grounded_response

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "healthy", "service": "Rehnuma API", "version": "1.0.0"}

@router.get("/domains")
def get_supported_domains():
    return [
        DomainInfo(
            id="fir",
            name="FIR & Police Complaints",
            description="Procedures for filing FIRs, rights during arrest, bail provisions, and police responsibilities.",
            sources=["Code of Criminal Procedure (CrPC) 1898", "Pakistan Penal Code (PPC) 1860"]
        ),
        DomainInfo(
            id="tenant",
            name="Tenant Rights & Eviction",
            description="Notice periods, rent escalation limits, security deposits, and landlord responsibilities.",
            sources=["Punjab Rented Premises Act 2009"]
        ),
        DomainInfo(
            id="consumer",
            name="Consumer Protection",
            description="Defective goods, service warranty, seller obligations, and filing complaints in Consumer Court.",
            sources=["Punjab Consumer Protection Act 2005", "Consumer Protection Amendment Act 2025"]
        )
    ]

@router.post("/ask", response_model=QueryResponse)
def ask_question(request: QueryRequest):
    question = request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
        
    # Step 1: Domain Classification
    domain, confidence = classify_query(question)
    
    # Step 2: Semantic Retrieval
    retrieved_chunks = retrieve_relevant_chunks(question, domain, top_k=4)
    
    # Step 3: Confidence & Safety Refusal Check
    sufficient, refusal_reason, valid_chunks = evaluate_retrieval_confidence(question, domain, retrieved_chunks)
    
    if not sufficient:
        return QueryResponse(
            answered=False,
            domain_detected=domain,
            domain_confidence=confidence,
            refusal_reason=refusal_reason,
            query=question
        )
        
    # Step 4: Grounded Response Generation
    gen_result = generate_grounded_response(question, valid_chunks)
    
    citations = [
        CitationSchema(**c) for c in gen_result.get("citations", [])
    ]
    
    return QueryResponse(
        answered=True,
        domain_detected=domain,
        domain_confidence=confidence,
        explanation=gen_result.get("explanation"),
        citations=citations,
        query=question
    )

export interface Citation {
  act: string;
  section: string;
  title: string;
  passage: string;
  similarity: number;
}

export interface QueryResponse {
  answered: boolean;
  domain_detected: string;
  domain_confidence: number;
  explanation?: string;
  citations: Citation[];
  refusal_reason?: string;
  query: string;
}

function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  const cleanUrl = envUrl.trim().replace(/\/+$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
}

const API_BASE_URL = getApiBaseUrl();

export async function askLegalQuestion(question: string): Promise<QueryResponse> {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Failed to query Rehnuma API' }));
    throw new Error(errorData.detail || 'Failed to reach Rehnuma legal assistant backend');
  }

  return response.json();
}

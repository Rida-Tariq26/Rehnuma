import { QueryResponse } from '@/lib/api';
import CitationBlock from './CitationBlock';
import { Scale, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnswerCardProps {
  response: QueryResponse;
}

export default function AnswerCard({ response }: AnswerCardProps) {
  const domainLabel =
    response.domain_detected === 'tenant'
      ? 'Tenant Rights'
      : response.domain_detected === 'fir'
        ? 'FIR & Police'
        : response.domain_detected === 'consumer'
          ? 'Consumer Protection'
          : 'Punjab Law';

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-legal-200 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-legal-900 flex items-center justify-center text-white">
            <Scale className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900">Rehnuma Grounded Answer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-legal-50 text-legal-800 px-3 py-1 rounded-full border border-legal-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-legal-700" /> Domain: {domainLabel}
          </span>
        </div>
      </div>

      <div className="prose prose-emerald max-w-none text-gray-800 text-base leading-relaxed">
        <ReactMarkdown>{response.explanation}</ReactMarkdown>
      </div>

      <CitationBlock citations={response.citations} />
    </div>
  );
}
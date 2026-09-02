import { AlertCircle, ShieldAlert } from 'lucide-react';

interface RefusalCardProps {
  reason?: string;
  domain?: string;
}

export default function RefusalCard({ reason, domain }: RefusalCardProps) {
  return (
    <div className="bg-amber-50/80 p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 border border-amber-300">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-amber-950 text-base">
            Confidence-Based Refusal (Hallucination Safeguard)
          </h3>
          <span className="text-xs font-semibold text-amber-800">
            Rehnuma priority: Accuracy over unsupported generation
          </span>
        </div>
      </div>

      <p className="text-sm text-amber-900 leading-relaxed mb-4">
        {reason || "I couldn't find enough supporting legal text in the available Punjab legislation to answer this question confidently."}
      </p>

      <div className="p-4 bg-white/80 rounded-xl border border-amber-200 text-xs text-gray-700 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Why did this happen?</strong>
          <p className="mt-0.5 text-gray-600">
            Rehnuma refuses to output unsupported legal advice. The MVP currently covers <strong>FIR & Police Complaints</strong>, <strong>Tenant Rights</strong>, and <strong>Consumer Protection</strong> under Punjab law. If your question is outside these domains or lacks direct statutory match, the assistant halts generation to prevent hallucinated advice.
          </p>
        </div>
      </div>
    </div>
  );
}

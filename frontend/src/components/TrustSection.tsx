import { ShieldCheck, FileCheck2, AlertTriangle, Layers } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Grounded in Official Law",
    description: "Built exclusively from Tier 1 statutory acts. No blogs, opinion pieces, or legal commentaries are used in the knowledge base."
  },
  {
    icon: FileCheck2,
    title: "Explicit Section Citations",
    description: "Every answer includes direct citations to the relevant Act and Section number, allowing citizens to verify source text independently."
  },
  {
    icon: AlertTriangle,
    title: "Confidence-Based Refusal",
    description: "If the retrieval pipeline cannot find supporting legal evidence above a strict confidence threshold, Rehnuma explicitly refuses rather than hallucinating."
  },
  {
    icon: Layers,
    title: "Bilingual English & Urdu",
    description: "Ask questions naturally in English or Urdu. The system processes statutory context and responds in plain, clear language."
  }
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-legal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-legal-300 text-xs font-bold uppercase tracking-wider bg-legal-800/80 px-3 py-1 rounded-full border border-legal-700">
            Trustworthy & Verifiable AI
          </span>
          <h2 className="text-3xl font-extrabold mt-4 mb-3 tracking-tight">
            Why Should You Trust Rehnuma?
          </h2>
          <p className="text-legal-200 text-sm leading-relaxed">
            Designed to solve the hallucination challenge in AI legal applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-legal-800/60 p-6 rounded-2xl border border-legal-700 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-legal-700/80 flex items-center justify-center text-legal-200 mb-4 border border-legal-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white mb-2">{p.title}</h3>
                <p className="text-xs text-legal-200 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

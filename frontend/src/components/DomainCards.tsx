import { FileText, Home, ShoppingBag } from 'lucide-react';

const DOMAINS = [
  {
    icon: FileText,
    title: "FIR & Police Complaints",
    titleUrdu: "ایف آئی آر اور پولیس شکایات",
    description: "Learn how to file an FIR, mandatory officer duties under CrPC 154, rights during arrest, and bail guidelines.",
    sources: ["Code of Criminal Procedure 1898", "Pakistan Penal Code 1860"],
    accent: "border-legal-200 hover:border-legal-400 bg-white"
  },
  {
    icon: Home,
    title: "Tenant Rights & Eviction",
    titleUrdu: "کرایہ داروں کے حقوق اور بے دخلی",
    description: "Understand lawful eviction notice periods, rent escalation limits, security deposit refunds, and landlord obligations.",
    sources: ["Punjab Rented Premises Act 2009"],
    accent: "border-legal-200 hover:border-legal-400 bg-white"
  },
  {
    icon: ShoppingBag,
    title: "Consumer Protection",
    titleUrdu: "صارفین کے حقوق",
    description: "Know your rights against defective goods, false advertising, service warranties, and consumer court claims.",
    sources: ["Punjab Consumer Protection Act 2005", "2025 Amendment Act"],
    accent: "border-legal-200 hover:border-legal-400 bg-white"
  }
];

export default function DomainCards() {
  return (
    <section id="domains" className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            What Can Rehnuma Help You With?
          </h2>
          <p className="text-gray-600 mt-2">
            The MVP focuses on three core legal domains under Punjab provincial legislation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOMAINS.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border shadow-sm transition hover:shadow-md ${domain.accent}`}
              >
                <div className="w-12 h-12 rounded-xl bg-legal-50 flex items-center justify-center text-legal-900 mb-4 border border-legal-200">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{domain.title}</h3>
                  <span className="text-xs font-semibold text-legal-700 bg-legal-50 px-2 py-0.5 rounded">
                    {domain.titleUrdu}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {domain.description}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Official Statutory Sources
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {domain.sources.map((s, i) => (
                      <span key={i} className="text-xs font-medium bg-sand-100 text-gray-700 px-2 py-0.5 rounded border border-sand-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

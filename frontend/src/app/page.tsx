import Hero from '@/components/Hero';
import DomainCards from '@/components/DomainCards';
import TrustSection from '@/components/TrustSection';

export default function LandingPage() {
  return (
    <div className="space-y-12 pb-12">
      <Hero />
      <DomainCards />
      <TrustSection />
    </div>
  );
}

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ResumenSection from '@/components/ResumenSection';
import FichaTecnicaSection from '@/components/FichaTecnicaSection';
import MapSection from '@/components/MapSection';
import GeologiaSection from '@/components/GeologiaSection';
import PlanCierreSection from '@/components/PlanCierreSection';
import DocumentosSection from '@/components/DocumentosSection';
import ContactoSection from '@/components/ContactoSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ResumenSection />
        <FichaTecnicaSection />
        <MapSection />
        <GeologiaSection />
        <PlanCierreSection />
        <DocumentosSection />
        <ContactoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

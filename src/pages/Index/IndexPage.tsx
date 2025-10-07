import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { ProjectsProvider } from "@/contexts/ProjectsContext";

import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";

const IndexPage = () => {
  return (
    <ProjectsProvider>
      <SEOHead
        title="Bernardo Gomes — Desenvolvedor de Software"
        description="Desenvolvedor full-stack especializado em aplicações web modernas, rápidas e acessíveis. Construindo o futuro com React, Node.js e tecnologias inovadoras."
        keywords={[
          "desenvolvedor",
          "software", 
          "web",
          "full-stack",
          "react",
          "nodejs",
          "typescript",
          "portfolio",
          "bernardo",
          "gomes"
        ]}
        canonical="https://bebitterbebetter.com.br"
      />
      
      <StructuredData
        pageType="person"
        title="Bernardo Gomes — Desenvolvedor de Software"
        description="Desenvolvedor full-stack especializado em aplicações web modernas, rápidas e acessíveis. Construindo o futuro com React, Node.js e tecnologias inovadoras."
        url="https://bebitterbebetter.com.br"
      />

      <div className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </ProjectsProvider>
  );
};

export default IndexPage;
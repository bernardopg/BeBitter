import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import { useLanguage } from "@/hooks/useLanguage";

import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";

const IndexPage = () => {
  const { language } = useLanguage();
  const title =
    language === "en"
      ? "Bernardo Gomes — Frontend, automation and Linux"
      : "Bernardo Gomes — Frontend, automação e Linux";
  const description =
    language === "en"
      ? "Frontend engineer, automation builder, and medical student building polished products for web, Linux, and healthcare workflows."
      : "Engenheiro de frontend, criador de automações e estudante de Medicina construindo produtos refinados para web, Linux e fluxos de trabalho em saúde.";
  const keywords =
    language === "en"
      ? [
          "frontend engineer",
          "automation builder",
          "linux tooling",
          "react",
          "typescript",
          "python",
          "healthcare workflows",
          "portfolio",
        ]
      : [
          "engenheiro de frontend",
          "automação",
          "linux",
          "react",
          "typescript",
          "python",
          "fluxos de trabalho em saúde",
          "portfolio",
        ];

  return (
    <ProjectsProvider>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonical="https://bebitterbebetter.com.br"
      />
      
      <StructuredData
        pageType="person"
        title={title}
        description={description}
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

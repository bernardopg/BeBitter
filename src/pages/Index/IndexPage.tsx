import ErrorBoundary from "@/components/ErrorBoundary";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/hooks/useLanguage";
import type { ReactNode } from "react";

import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";

const SectionFallback = ({ name }: { name: string }) => (
  <section className="py-20">
    <div className="container mx-auto px-4 text-center text-muted-foreground">
      <p className="text-sm">
        {name} — something went wrong loading this section.
      </p>
    </div>
  </section>
);

const wrap = (node: ReactNode, name: string) => (
  <ErrorBoundary fallback={<SectionFallback name={name} />}>
    {node}
  </ErrorBoundary>
);

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
    <>
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
        {wrap(<HeroSection />, "Hero")}
        {wrap(<AboutSection />, "About")}
        {wrap(<ProjectsSection />, "Projects")}
        {wrap(<ContactSection />, "Contact")}
      </div>
    </>
  );
};

export default IndexPage;

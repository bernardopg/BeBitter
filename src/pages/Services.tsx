import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/hooks/useLanguage";
import { ServicesCTA } from "./Services/ServicesCTA";
import { ServicesHeader } from "./Services/ServicesHeader";
import { ServicesList } from "./Services/ServicesList";
import { ServicesProcess } from "./Services/ServicesProcess";

const Services = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <SEOHead
        title={`${t("services.meta.title")} | Bernardo Gomes`}
        description={t("services.meta.description")}
        keywords={
          language === "en"
            ? ["frontend product engineering", "automation", "linux tooling", "internal tools", "healthcare workflows", "typescript"]
            : ["engenharia de produto", "automação", "linux", "ferramentas internas", "fluxos de trabalho em saúde", "typescript"]
        }
        canonical="https://bebitterbebetter.com.br/services"
        type="website"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />

      <StructuredData
        pageType="website"
        title={`${t("services.meta.title")} | Bernardo Gomes`}
        description={t("services.meta.description")}
        url="https://bebitterbebetter.com.br/services"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <ServicesHeader />
          <ServicesList />
          <ServicesProcess />
          <ServicesCTA />
        </div>
      </div>
    </>
  );
};

export default Services;

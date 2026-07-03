import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { SERVICES_FAQ } from "@/constants/services-faq";
import { useLanguage } from "@/hooks/useLanguage";
import { ServicesCTA } from "./Services/ServicesCTA";
import { ServicesFAQ } from "./Services/ServicesFAQ";
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
        pageType="service"
        title={`${t("services.meta.title")} | Bernardo Gomes`}
        description={t("services.meta.description")}
        url="https://bebitterbebetter.com.br/services"
        faq={SERVICES_FAQ.map((item) => ({
          question: language === "en" ? item.questionEn : item.question,
          answer: language === "en" ? item.answerEn : item.answer,
        }))}
      />

      <div className="relative min-h-screen">
        <div className="absolute inset-x-0 top-0 h-[460px] grid-bg opacity-50 pointer-events-none" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[460px] gradient-hero pointer-events-none" aria-hidden />
        <div className="container relative z-10 mx-auto px-4 pt-16 pb-28 max-w-7xl">
          <ServicesHeader />
          <ServicesList />
          <ServicesProcess />
          <ServicesFAQ />
          <ServicesCTA />
        </div>
      </div>
    </>
  );
};

export default Services;

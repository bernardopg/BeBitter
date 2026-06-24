import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { NowAchievements } from "./Now/NowAchievements";
import { NowContact } from "./Now/NowContact";
import { NowCurrentFocus } from "./Now/NowCurrentFocus";
import { NowHeader } from "./Now/NowHeader";

const Now = () => {
  const { t, language } = useLanguage();
  const title = "Now | Bernardo Gomes";
  const description =
    language === "en"
      ? "A living snapshot of what I am building, studying, and refining across frontend, automation, Linux, and healthcare-adjacent workflows."
      : "Um recorte vivo do que estou construindo, estudando e refinando entre frontend, automação, Linux e fluxos de trabalho em saúde.";

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={["now", "frontend", "automação", "linux", "bernardo gomes", "healthcare workflows", "current focus"]}
        canonical="https://bebitterbebetter.com.br/now"
        type="article"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />
      <div className="relative min-h-screen">
        <div className="absolute inset-x-0 top-0 h-[480px] grid-bg opacity-50 pointer-events-none" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[480px] gradient-hero pointer-events-none" aria-hidden />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {t("hero.skipToContent")}
        </a>

        <div className="container relative z-10 mx-auto px-4 pt-16 pb-28 max-w-4xl">
          <NowHeader />
          <NowCurrentFocus />
          <NowAchievements />
          <NowContact />
        </div>
      </div>
    </>
  );
};

export default Now;

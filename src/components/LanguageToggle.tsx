import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
        className="flex items-center gap-2"
      >
        <Languages className="h-4 w-4" />
        {language === 'pt' ? 'EN' : 'PT'}
      </Button>
    </div>
  );
};

export default LanguageToggle;
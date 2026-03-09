import React, { createContext, useCallback, useMemo, useState } from "react";
import { translations } from "../constants/translations";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export { LanguageContext };

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "pt";
  }

  const savedLanguage = window.localStorage.getItem("language");
  return savedLanguage === "pt" || savedLanguage === "en" ? savedLanguage : "pt";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    window.localStorage.setItem("language", lang);
  }, []);

  const t = useCallback((key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [handleSetLanguage, language, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

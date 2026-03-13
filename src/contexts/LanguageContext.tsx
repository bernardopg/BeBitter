import React, { createContext, useState } from "react";
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
  return savedLanguage === "pt" || savedLanguage === "en"
    ? savedLanguage
    : "pt";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    window.localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

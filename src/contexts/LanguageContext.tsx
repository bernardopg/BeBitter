import React, { createContext, useSyncExternalStore } from "react";
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

/**
 * Idioma do HTML pré-renderizado. O build roda em Node, sem localStorage, então
 * todo markup estático sai em pt — e a primeira renderização no browser precisa
 * bater com ele, ou a hidratação diverge e o React repinta a árvore inteira.
 */
const DEFAULT_LANGUAGE: Language = "pt";

const STORAGE_KEY = "language";

/**
 * O idioma é estado externo (localStorage), não estado do React — por isso
 * `useSyncExternalStore` e não `useState` + efeito. É o único hook que aceita um
 * snapshot de servidor diferente do de cliente: a hidratação usa
 * `getServerSnapshot` (sempre pt, igual ao HTML estático) e só depois o React
 * lê `getSnapshot` e re-renderiza se a preferência salva for outra.
 */
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

const subscribeToLanguage = (callback: () => void) => {
  listeners.add(callback);
  // `storage` só dispara em outras abas: mantém o site coerente quando o
  // usuário troca o idioma em uma janela paralela.
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0) {
      window.removeEventListener("storage", notify);
    }
  };
};

// Fallback para quando o storage está bloqueado (modo privado, cookies off):
// a troca de idioma continua funcionando, só não sobrevive ao reload.
let memoryLanguage: Language | null = null;

const getLanguageSnapshot = (): Language => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "pt" || saved === "en" ? saved : DEFAULT_LANGUAGE;
  } catch {
    return memoryLanguage ?? DEFAULT_LANGUAGE;
  }
};

const getServerLanguageSnapshot = (): Language => DEFAULT_LANGUAGE;

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  const handleSetLanguage = (lang: Language) => {
    memoryLanguage = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Sem persistência; `memoryLanguage` segura a preferência nesta sessão.
    }
    notify();
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

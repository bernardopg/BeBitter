import { memo, useEffect, useState } from "react";
import { CONFIG } from "@/constants/config";

interface TypingTextProps {
  texts: string[];
}

/**
 * Animação de digitação isolada num componente-folha: o setState a cada
 * TYPING_SPEED re-renderiza só este span, não a seção inteira que o contém.
 */
export const TypingText = memo(function TypingText({ texts }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex] || texts[0] || "";

    if (displayText.length < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, CONFIG.TYPING_SPEED);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (displayText.length === 0) {
        setTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        setDisplayText("");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [displayText, textIndex, texts]);

  return (
    <>
      {displayText}
      <span className="ml-1 animate-pulse">|</span>
    </>
  );
});

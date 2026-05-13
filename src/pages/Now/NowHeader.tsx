import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function NowHeader() {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const start = () => {
      timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout?: number }) => number }).requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => start(), { timeout: 2000 });
    } else {
      setTimeout(() => start(), 1200);
    }
    return () => { if (timer) clearInterval(timer); };
  }, []);

  useEffect(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout?: number }) => number }).requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => setIsInteractive(true), { timeout: 2000 });
    } else {
      const t = setTimeout(() => setIsInteractive(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const MotionDiv = useMemo<React.ElementType>(() => (isInteractive ? motion.div : "div"), [isInteractive]);
  const MotionH1 = useMemo<React.ElementType>(() => (isInteractive ? motion.h1 : "h1"), [isInteractive]);
  const MotionP = useMemo<React.ElementType>(() => (isInteractive ? motion.p : "p"), [isInteractive]);

  const locale = language === "pt" ? "pt-BR" : "en-US";

  return (
    <MotionDiv id="main-content" className="text-center mb-20">
      <MotionH1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
        {t("now.title")}
      </MotionH1>

      <MotionP className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
        {t("now.description")} {currentTime.toLocaleDateString(locale)}
      </MotionP>

      <MotionDiv
        className="relative p-8 rounded-2xl mb-8 border border-primary/10 bg-background/70"
        {...(prefersReducedMotion ? {} : {})}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">{t("now.clockLabel")}</span>
        </div>
        <div className="text-4xl md:text-6xl font-mono font-bold gradient-text">
          {currentTime.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}

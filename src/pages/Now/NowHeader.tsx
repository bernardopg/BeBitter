import { useLanguage } from "@/hooks/useLanguage";
import { m as motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

/**
 * Relógio como store externo, não como estado do React.
 *
 * Esta rota tem HTML pré-renderizado no build: um `useState(new Date())`
 * congelaria o horário do build dentro do HTML estático — o usuário veria a
 * hora errada até hidratar, e o React acusaria divergência. `getServerSnapshot`
 * devolve null, então o markup sai com placeholder e só o browser mostra hora.
 */
let now: number | null = null;
let tickTimer: number | undefined;
const clockListeners = new Set<() => void>();

const subscribeToClock = (callback: () => void) => {
  clockListeners.add(callback);

  if (clockListeners.size === 1) {
    now = Date.now();
    const startTicking = () => {
      tickTimer = window.setInterval(() => {
        now = Date.now();
        clockListeners.forEach((listener) => listener());
      }, 1000);
    };
    // O primeiro valor aparece na hidratação; o tique de 1s espera a thread
    // esvaziar para não competir com o carregamento inicial.
    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout?: number }) => number;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => startTicking(), { timeout: 2000 });
    } else {
      window.setTimeout(startTicking, 1200);
    }
  }

  return () => {
    clockListeners.delete(callback);
    if (clockListeners.size === 0 && tickTimer) {
      clearInterval(tickTimer);
      tickTimer = undefined;
    }
  };
};

const getClockSnapshot = () => now;
const getServerClockSnapshot = (): number | null => null;

export function NowHeader() {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const timestamp = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getServerClockSnapshot,
  );
  const currentTime = useMemo(
    () => (timestamp === null ? null : new Date(timestamp)),
    [timestamp],
  );
  const [isInteractive, setIsInteractive] = useState(false);

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
        {t("now.description")} {currentTime?.toLocaleDateString(locale) ?? ""}
      </MotionP>

      <MotionDiv
        className="glass relative mx-auto max-w-md p-8 rounded-2xl mb-8 border"
        {...(prefersReducedMotion ? {} : {})}
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium uppercase tracking-wider">{t("now.clockLabel")}</span>
        </div>
        <div className="text-5xl md:text-6xl font-mono font-bold gradient-text tabular-nums">
          {currentTime?.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }) ?? "--:--:--"}
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}

"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/registro/RegistroPage.module.css";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
        },
      ) => number;
      reset: (widgetId: number) => void;
    };
    onRegistroRecaptchaLoad?: () => void;
  }
}

type RecaptchaFieldProps = {
  siteKey: string;
  onChange: (token: string) => void;
  onExpire: () => void;
};

export function RecaptchaField({
  siteKey,
  onChange,
  onExpire,
}: RecaptchaFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    const renderWidget = () => {
      if (!containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) {
        return;
      }

      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: onChange,
        "expired-callback": onExpire,
      });
    };

    window.onRegistroRecaptchaLoad = renderWidget;

    if (window.grecaptcha) {
      renderWidget();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="google.com/recaptcha/api.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", renderWidget);
      return () => existingScript.removeEventListener("load", renderWidget);
    }

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=onRegistroRecaptchaLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      window.onRegistroRecaptchaLoad = undefined;
    };
  }, [onChange, onExpire, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className={styles.captchaWrap}>
      <div ref={containerRef} />
    </div>
  );
}

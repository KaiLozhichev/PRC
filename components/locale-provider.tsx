"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Translations = Record<string, any>;

const LocaleContext = createContext({
  locale: "en",
  setLocale: (l: string) => {},
  t: (k: string) => k,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>("en");
  const [messages, setMessages] = useState<Translations>({});

  useEffect(() => {
    // initialize locale from localStorage if available
    const stored = localStorage.getItem("locale");
    const initial = stored || "en";
    setLocale(initial);
  }, []);

  useEffect(() => {
    // load messages dynamically
    async function load() {
      try {
        const mod = await import(`../locales/${locale}.json`);
        setMessages(mod);
      } catch (e) {
        console.error("Failed to load locale", locale, e);
        setMessages({});
      }
    }
    load();
    localStorage.setItem("locale", locale);
  }, [locale]);

  function t(key: string) {
    const parts = key.split(".");
    let cur: any = messages;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in cur) {
        cur = cur[p];
      } else {
        return key;
      }
    }
    if (typeof cur === "string") return cur;
    return key;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useTranslation() {
  const ctx = useContext(LocaleContext);
  return { t: ctx.t, locale: ctx.locale, setLocale: ctx.setLocale };
}

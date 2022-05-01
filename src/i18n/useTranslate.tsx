import { useState } from "react";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

export const useTranslate: () => {
  setLang: (key: string) => void;
  t: (value: string) => string;
  lang: string;
} = () => {
  const [{ lang }, setState] = useState({ lang: "es" });
  const dicitionaries = { en, es };

  const t = (key: string) => {
    const dict = dicitionaries[lang];
    const path = key.split(".");

    let value = dict;

    for (const key of path) {
      value = value[key];
    }
    return typeof value === "string" ? value : key;
  };

  return { setLang: (lang: string) => setState({ lang }), t, lang };
};

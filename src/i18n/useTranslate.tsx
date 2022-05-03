import { useState } from "react";
import { DictType } from "./dictionaries/dict.type";
import en from "./dictionaries/en";
import es from "./dictionaries/es";

export const useTranslate: () => {
  setLang: (key: string) => void;
  t: (value: keyof DictType) => string;
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

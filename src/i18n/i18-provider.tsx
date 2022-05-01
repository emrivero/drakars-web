import {
  Context,
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

export const I18nContext: Context<{
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
  t: (key: string) => string;
}> = createContext({ lang: "", setLang: () => {}, t: null });

export const I18nProvider: FC = ({ children }) => {
  const dicitionaries = { en, es };
  const [lang, setLang] = useState("es");

  const t = (key: string) => {
    const dict = dicitionaries[lang];
    const path = key.split(".");

    let value = dict;

    for (const key of path) {
      value = value[key];
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

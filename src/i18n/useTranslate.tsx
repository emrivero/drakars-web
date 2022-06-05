import { createContext, FC, useContext, useMemo, useState } from "react";
import en from "./dictionaries/en";
import es from "./dictionaries/es";

export type Translate = (key: string) => string;

export interface I18nProvider {
  t: Translate;
  setLang: (key: string) => void;
  lang: string;
}

export interface ITranslationContext {
  i18nProvider?: I18nProvider;
}

export type TranslationProvider = Required<ITranslationContext>;
export const TranslationContext = createContext<ITranslationContext>({});

export const TranslationContextProvider: FC<ITranslationContext> = ({
  children,
}) => {
  const [{ lang }, setState] = useState({ lang: "es" });
  const dicitionaries = { en, es };

  const t = (key: string) => {
    const dict = dicitionaries[lang];
    const path = key?.split(".");

    let value = dict;
    if (path) {
      for (const key of path) {
        value = value[key];
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider
      value={{
        i18nProvider: {
          lang,
          t,
          setLang: (lang: string) => setState({ lang }),
        },
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslate = () => {
  const { i18nProvider } = useContext(TranslationContext);

  const fn = useMemo(() => {
    function t(key: string) {
      return i18nProvider?.t(key);
    }

    return t;
  }, [i18nProvider]);

  return { t: fn, ...i18nProvider };
};

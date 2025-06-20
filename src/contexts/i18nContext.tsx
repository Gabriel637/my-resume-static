import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/i18n';

export type SupportedLanguage = 'en' | 'pt' | 'es';

interface I18nContextType {
  language: SupportedLanguage;
  toggleLanguage: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(i18n.language as SupportedLanguage);

  useEffect(() => {
    const handler = (lng: string) => {
      setLanguageState(lng as SupportedLanguage);
    };

    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  }, [language, setLanguage]);

  console.log(language)

  return (
    <I18nContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

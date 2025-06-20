import '../i18n/i18n';
import { ThemeProvider } from '../contexts/ThemeContext';
import { I18nProvider } from '../contexts/i18nContext';
import type { ReactNode } from 'react';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <I18nProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </I18nProvider>
  );
}
// File: app/pt-BR/layout.tsx
import { ReactNode } from 'react';
import { useMessages } from 'next-intl';
import Header from '../../components/Header';
import { NextIntlClientProvider } from 'next-intl';

export default function PtLayout({ children }: { children: ReactNode }) {
  const messages = useMessages();

  return (
    <html lang="pt-BR">
      <body>
        <NextIntlClientProvider locale="pt-BR" messages={messages}>
          <Header />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

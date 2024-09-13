import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import './globals.css';
import { Kanit } from 'next/font/google'

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: "300",
});

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body className={`${kanit.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
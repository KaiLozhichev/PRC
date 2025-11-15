import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import Image from 'next/image';
import { LocaleProvider } from '@/components/locale-provider';
import LanguageSwitcher from '@/components/language-switcher';

// Initialize fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Directory - Search Students",
  description: "Search and find student information by name, surname, student ID, or nickname",
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <LocaleProvider>
          <header className="w-full border-b border-gray-800 bg-black">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <a href="/">
                  <Image src="/logo.svg" alt="Logo" width={48} height={48} />
                </a>
                <span className="text-white font-semibold">Student Directory</span>
              </div>
              <div>
                <LanguageSwitcher />
              </div>
            </div>
          </header>

          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}

function LanguageSwitcher() {
  // small client wrapper inside layout; locale-provider is a client component
  // we import a hook dynamically to avoid server/client mismatch
  // but since LocaleProvider is client we can render a small script
  // We'll render a simple button group using client-side only
  return (
    <div className="flex items-center gap-2">
      <LanguageButton lang="en" label="EN" />
      <LanguageButton lang="th" label="TH" />
    </div>
  );
}

function LanguageButton({ lang, label }: { lang: string; label: string }) {
  // client-only behavior
  return (
    // @ts-expect-error React will treat this as client interactive element
    <button
      onClick={() => {
        try {
          localStorage.setItem('locale', lang);
          // force reload to pick up translations quickly
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      }}
      className="rounded-sm bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700"
    >
      {label}
    </button>
  );
}

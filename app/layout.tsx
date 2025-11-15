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
                  <Image src="/logo.png" alt="Logo" width={48} height={48} />
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

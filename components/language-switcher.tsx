"use client";

import React from 'react';

export default function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-2">
      <LanguageButton lang="en" label="EN" />
      <LanguageButton lang="th" label="TH" />
    </div>
  );
}

function LanguageButton({ lang, label }: { lang: string; label: string }) {
  return (
    <button
      onClick={() => {
        try {
          localStorage.setItem('locale', lang);
          // reload to apply new locale
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

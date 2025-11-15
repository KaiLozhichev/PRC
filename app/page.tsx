"use client";

import { Award as IdCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-24">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center justify-center rounded-full bg-zinc-900 p-6 ring-2 ring-zinc-800">
            <IdCard className="h-16 w-16 text-blue-500" />
          </div>
          
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white">
            Student ID Card Creator
          </h1>
          
          <p className="mb-8 text-balance text-lg text-zinc-400">
            Create professional student ID cards in three simple steps
          </p>
          
          <Link href="/create-id-card">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              <IdCard className="mr-2 h-6 w-6" />
              Create ID Card
            </Button>
          </Link>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-bold text-lg">
                1
              </div>
              <h3 className="mb-2 font-semibold text-white">Upload Photo</h3>
              <p className="text-sm text-zinc-400">Upload a clear student photo</p>
            </div>
            
            <div className="rounded-lg bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-bold text-lg">
                2
              </div>
              <h3 className="mb-2 font-semibold text-white">Select Student</h3>
              <p className="text-sm text-zinc-400">Search and select from database</p>
            </div>
            
            <div className="rounded-lg bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-bold text-lg">
                3
              </div>
              <h3 className="mb-2 font-semibold text-white">Preview & Save</h3>
              <p className="text-sm text-zinc-400">Review and download the ID card</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

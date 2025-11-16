"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateIDCardPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(1);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          setImageAspectRatio(ratio);
          sessionStorage.setItem("imageAspectRatio", ratio.toString());
          setTimeout(() => {
            setIsUploading(false);
          }, 500);
        };
        img.src = result;
        setUploadedImage(result);
        sessionStorage.setItem("uploadedPhoto", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleNextStep = () => {
    if (uploadedImage) {
      router.push("/create-id-card/select-student");
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div>
          <Link href="/">
            <Button 
              variant="ghost" 
              size="sm"
              className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-white">
              Step 1: Upload Photo
            </h1>
            <p className="text-lg text-gray-400">
              Upload a clear photo of the student for their ID card
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-linear-to-b from-gray-900 to-black p-12 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="mb-8 flex items-center justify-center">
              {isUploading ? (
                <div className="flex h-64 w-64 items-center justify-center rounded-full border-4 border-gray-700">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-blue-600" />
                </div>
              ) : uploadedImage ? (
                <div 
                  className="relative max-w-2xl overflow-hidden rounded-lg border-4 border-gray-700 shadow-xl"
                  style={{ 
                    width: imageAspectRatio > 1 ? '100%' : 'auto',
                    maxWidth: imageAspectRatio > 1 ? '600px' : '400px'
                  }}
                >
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded photo"
                    className="h-auto w-full object-contain"
                    style={{ aspectRatio: imageAspectRatio }}
                  />
                </div>
              ) : (
                <div className="flex h-64 w-64 items-center justify-center rounded-full border-4 border-dashed border-gray-700 animate-pulse">
                  <p className="text-gray-500">No photo uploaded</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleUploadClick}
              variant="outline"
              size="lg"
              className="mb-4 border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-500 transition-all hover:scale-105 hover:shadow-lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileUpload}
              className="hidden"
            />

            <p className="mb-8 text-sm text-gray-500">
              Accepted formats: JPEG, PNG
            </p>

            <div className="flex w-full justify-end">
              <Button
                onClick={handleNextStep}
                disabled={!uploadedImage}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-600/50 disabled:hover:scale-100"
              >
                Next Step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

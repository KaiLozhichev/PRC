"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { Student } from "@/app/actions";
import Link from "next/link";

export default function PreviewPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(1.5);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const photo = sessionStorage.getItem("uploadedPhoto");
    const studentData = sessionStorage.getItem("selectedStudent");
    const aspectRatio = sessionStorage.getItem("imageAspectRatio");

    if (!photo || !studentData) {
      router.push("/create-id-card");
      return;
    }

    setUploadedImage(photo);
    setSelectedStudent(JSON.parse(studentData));
    if (aspectRatio) {
      setImageAspectRatio(parseFloat(aspectRatio));
    }
  }, [router]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Dynamically import html2canvas to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        ignoreElements: (element) => {
          // Ignore elements that might cause parsing issues
          return false;
        },
        onclone: (clonedDoc) => {
          // Convert any oklch/lab colors to rgb in the cloned document
          const allElements = clonedDoc.querySelectorAll('*');
          const clonedWindow = clonedDoc.defaultView || (clonedDoc as any).parentWindow;
          
          if (clonedWindow) {
            allElements.forEach((el) => {
              try {
                const computedStyle = clonedWindow.getComputedStyle(el as Element);
                const style = (el as HTMLElement).style;
                
                // Convert background-color
                const bgColor = computedStyle.backgroundColor;
                if (bgColor && (bgColor.includes('oklch') || bgColor.includes('lab'))) {
                  style.backgroundColor = '#ffffff';
                }
                
                // Convert color
                const textColor = computedStyle.color;
                if (textColor && (textColor.includes('oklch') || textColor.includes('lab'))) {
                  style.color = '#000000';
                }
                
                // Convert border-color
                const borderColor = computedStyle.borderColor;
                if (borderColor && (borderColor.includes('oklch') || borderColor.includes('lab'))) {
                  style.borderColor = '#e5e5e5';
                }
              } catch (e) {
                // Ignore errors for elements that can't be styled
              }
            });
          }
        },
      });
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${selectedStudent?.Name.replace(/\s+/g, '_')}_ID_Card.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          // Show success state
          setDownloadComplete(true);
          setTimeout(() => {
            setDownloadComplete(false);
          }, 2000);
        }
        setIsDownloading(false);
      }, 'image/png');
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  if (!uploadedImage || !selectedStudent) {
    return (
      <main className="min-h-screen bg-black">
        <div className="flex min-h-screen items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-blue-600" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/create-id-card/select-student">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="mb-2 text-4xl font-bold text-white">
              Step 3: Preview & Save
            </h1>
            <p className="text-lg text-gray-400">
              Review the ID card and download when ready
            </p>
          </div>
        </div>

        <div ref={cardRef} className="mb-8">
          <Card className="overflow-hidden border-2 border-gray-800 bg-white shadow-2xl">
            <CardContent className="p-0">
              {/* Image Section */}
              <div 
                className="w-full overflow-hidden bg-gray-100"
                style={{ aspectRatio: imageAspectRatio }}
              >
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Student ID"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Student Info Section */}
              <div className="border-t-2 border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  {selectedStudent.Name}
                </h2>
                <dl className="space-y-2 text-sm">
                  {selectedStudent.classes && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-gray-600">Classes:</dt>
                      <dd className="text-gray-900">{selectedStudent.classes}</dd>
                    </div>
                  )}
                  {selectedStudent.number_col && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-gray-600">Number:</dt>
                      <dd className="text-gray-900">{selectedStudent.number_col}</dd>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <dt className="font-medium text-gray-600">Student Number:</dt>
                    <dd className="font-mono text-gray-900">{selectedStudent.student_number_col}</dd>
                  </div>
                  {selectedStudent.school_plan && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-gray-600">School Plan:</dt>
                      <dd className="text-gray-900">{selectedStudent.school_plan}</dd>
                    </div>
                    
                  )}
                   <div className="flex gap-2">
                      <dt className="font-medium text-gray-600">Time:</dt>
                     <dd className="text-gray-900">{new Date().toLocaleString()}</dd>
                    </div>
                </dl>
                
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleDownload}
            disabled={isDownloading || downloadComplete}
            size="lg"
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-600/50 disabled:hover:scale-100"
          >
            {isDownloading ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Downloading...
              </>
            ) : downloadComplete ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Downloaded!
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download ID Card
              </>
            )}
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            size="lg"
            className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-500 transition-all hover:scale-105"
          >
            Done
          </Button>
        </div>
      </div>
    </main>
  );
}

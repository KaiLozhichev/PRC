"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getAllStudents, type Student } from "@/app/actions";
import { useTranslation } from '@/components/locale-provider';
import Link from "next/link";

export default function SelectStudentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      const students = await getAllStudents();
      setAllStudents(students);
      setIsLoading(false);
    };

    loadStudents();
  }, []);

  const filteredStudents = allStudents.filter((student) => {
    if (!searchQuery.trim()) return true;
    const searchTerm = searchQuery.toLowerCase();
    return (
      student.Name.toLowerCase().includes(searchTerm) ||
      (student.classes && student.classes.toLowerCase().includes(searchTerm)) ||
      (student.number_col && student.number_col.toLowerCase().includes(searchTerm)) ||
      student.student_number_col.toLowerCase().includes(searchTerm) ||
      (student.school_plan && student.school_plan.toLowerCase().includes(searchTerm))
    );
  });

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    sessionStorage.setItem("selectedStudent", JSON.stringify(student));
  };

  const handleNextStep = () => {
    if (selectedStudent) {
      router.push("/create-id-card/preview");
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/create-id-card">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="mb-2 text-4xl font-bold text-white">
              {t('selectStudent.title')}
            </h1>
            <p className="text-lg text-gray-400">
              {t('selectStudent.subtitle')}
            </p>
          </div>
        </div>

        <Card className="mb-8 border-gray-800 bg-gray-900">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t('selectStudent.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 border-gray-700 bg-black pl-10 text-base text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
              />
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-blue-600" />
            <p className="mt-4 text-gray-400">{t('selectStudent.loading') || 'Loading students...'}</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="py-12 text-center">
              <p className="text-gray-400">{t('selectStudent.noResults')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredStudents.map((student, index) => (
              <Card
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                className={`cursor-pointer border-2 transition-all duration-300 hover:border-gray-600 hover:scale-[1.02] hover:shadow-xl ${
                  selectedStudent?.id === student.id
                    ? "border-red-500 bg-gray-900 shadow-xl shadow-red-500/30 scale-[1.02]"
                    : "border-gray-800 bg-gray-900"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white">{student.Name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-2 text-sm">
                    {student.classes && (
                      <div className="flex items-center gap-2">
                        <dt className="font-medium text-gray-400">Classes:</dt>
                        <dd className="text-gray-200">{student.classes}</dd>
                      </div>
                    )}
                    {student.number_col && (
                      <div className="flex items-center gap-2">
                        <dt className="font-medium text-gray-400">Number:</dt>
                        <dd className="text-gray-200">{student.number_col}</dd>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <dt className="font-medium text-gray-400">Student Number:</dt>
                      <dd className="font-mono text-gray-200">{student.student_number_col}</dd>
                    </div>
                    {student.school_plan && (
                      <div className="flex items-center gap-2">
                        <dt className="font-medium text-gray-400">School Plan:</dt>
                        <dd className="text-gray-200">{student.school_plan}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleNextStep}
            disabled={!selectedStudent}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-600/50 disabled:hover:scale-100"
          >
            {t('selectStudent.nextStep')}
          </Button>
        </div>
      </div>
    </main>
  );
}

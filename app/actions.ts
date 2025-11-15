'use client';

export type Student = {
  id: string;
  student_number_col: string;
  Name: string;
  classes: string | null;
  number_col: string | null;
  school_plan: string | null;
};

/**
 * Fetch all students from the API
 */
export async function getAllStudents(): Promise<Student[]> {
  try {
    const response = await fetch('/api/students');
    
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

'use client';

import { createClient } from '@/lib/supabase/server';

export type Student = {
  id: string;
  student_number_col: string;
  Name: string;
  classes: string | null;
  number_col: string | null;
  school_plan: string | null;
};

export async function getAllStudents(): Promise<Student[]> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('Student')
      .select('*')
      .order('Name');

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

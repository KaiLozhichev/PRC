import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export type Student = {
  id: string;
  student_number_col: string;
  Name: string;
  classes: string | null;
  number_col: string | null;
  school_plan: string | null;
};

/**
 * GET /api/students - Fetch all students
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('Student')
      .select('*')
      .order('Name');

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

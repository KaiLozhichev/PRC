'use server';

import { createClient } from '@/lib/supabase/server';

export type Student = {
  id: string;
  student_number_col: string;
  Name: string;
  classes: string | null;
  number_col: string | null;
  school_plan: string | null;
};

/**
 * Fetch all students from Supabase
 */
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

/**
 * Fetch all data from any table
 * @param tableName - The name of the table to fetch from
 * @param selectColumns - Specific columns to fetch (default: '*' for all)
 * @param orderBy - Column to order results by
 * @returns Array of records from the table
 */
export async function getAllData(
  tableName: string,
  selectColumns: string = '*',
  orderBy?: string,
) {
  const supabase = await createClient();

  try {
    let query = supabase.from(tableName).select(selectColumns);

    if (orderBy) {
      query = query.order(orderBy);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    return [];
  }
}

/**
 * Fetch data with filters
 * @param tableName - The name of the table to fetch from
 * @param filters - Object with column names as keys and values to filter by
 * @param selectColumns - Specific columns to fetch (default: '*' for all)
 * @returns Array of filtered records
 */
export async function getDataWithFilters(
  tableName: string,
  filters: Record<string, any>,
  selectColumns: string = '*',
) {
  const supabase = await createClient();

  try {
    let query = supabase.from(tableName).select(selectColumns);

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value);
      }
    });

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error(`Error fetching filtered data from ${tableName}:`, error);
    return [];
  }
}

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "students_select_public" ON "Student";

-- Create a new policy that allows public SELECT access
-- This allows anyone to read student data without authentication
CREATE POLICY "students_select_public" 
ON "Student" 
FOR SELECT 
USING (true);

-- Create students table
create table if not exists public."Student" (
  id uuid primary key default gen_random_uuid(),
  "Name" text not null,
  classes text,
  number_col text,
  student_number_col text unique not null,
  school_plan text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public."Student" enable row level security;

-- Allow public read access (anyone can search students)
create policy "students_select_public"
  on public."Student" for select
  using (true);

-- Create index for faster searches
create index if not exists students_search_idx on public."Student"(student_number_col, "Name", classes, number_col, school_plan);

-- Insert sample data
insert into public."Student" (student_number_col,  "Name", classes, number_col, school_plan)
values
  ('47496', 'Kai Lozhichev', '3/12', '24', 'IEP')
on conflict (student_number_col) do nothing;

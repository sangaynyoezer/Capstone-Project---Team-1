create table if not exists public.course_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  unlocked_lessons text[] not null default array['lesson-1']::text[],
  completed_lessons text[] not null default '{}'::text[],
  completed_activities text[] not null default '{}'::text[],
  reviewed_notes integer[] not null default '{}'::integer[],
  updated_at timestamptz not null default now()
);

alter table public.course_progress enable row level security;

revoke all on public.course_progress from anon;
grant select, insert, update, delete on public.course_progress to authenticated;

drop policy if exists "Users can read their own course progress" on public.course_progress;
create policy "Users can read their own course progress"
  on public.course_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own course progress" on public.course_progress;
create policy "Users can create their own course progress"
  on public.course_progress
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own course progress" on public.course_progress;
create policy "Users can update their own course progress"
  on public.course_progress
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own course progress" on public.course_progress;
create policy "Users can delete their own course progress"
  on public.course_progress
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.course_resources (
  id uuid primary key default gen_random_uuid(),
  uploaded_by uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  category text not null check (category in ('Curriculum Guide', 'Lesson Plan', 'Worksheet', 'Slide Resource', 'Rubric')),
  description text not null default '',
  file_type text not null check (file_type in ('PDF', 'DOCX', 'PPTX')),
  file_size bigint not null check (file_size > 0 and file_size <= 20971520),
  storage_path text not null unique,
  created_at timestamptz not null default now()
);

alter table public.course_resources enable row level security;

revoke all on public.course_resources from anon, authenticated;
grant select on public.course_resources to anon, authenticated;
grant insert, delete on public.course_resources to authenticated;

drop policy if exists "Anyone can read course resources" on public.course_resources;
create policy "Anyone can read course resources"
  on public.course_resources
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Teachers can publish course resources" on public.course_resources;
create policy "Teachers can publish course resources"
  on public.course_resources
  for insert
  to authenticated
  with check (
    (select auth.uid()) = uploaded_by
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'teacher'
  );

drop policy if exists "Teachers can remove their own course resources" on public.course_resources;
create policy "Teachers can remove their own course resources"
  on public.course_resources
  for delete
  to authenticated
  using (
    (select auth.uid()) = uploaded_by
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'teacher'
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'course-resources',
  'course-resources',
  true,
  20971520,
  array[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can read course resource files" on storage.objects;
create policy "Anyone can read course resource files"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'course-resources');

drop policy if exists "Teachers can upload course resource files" on storage.objects;
create policy "Teachers can upload course resource files"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'course-resources'
    and (select auth.uid())::text = (storage.foldername(name))[1]
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'teacher'
  );

drop policy if exists "Teachers can delete their own course resource files" on storage.objects;
create policy "Teachers can delete their own course resource files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'course-resources'
    and (select auth.uid())::text = (storage.foldername(name))[1]
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'teacher'
  );

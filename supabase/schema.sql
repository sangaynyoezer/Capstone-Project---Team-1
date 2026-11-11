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

create table if not exists public.ai_tutor_daily_usage (
  user_id uuid primary key references auth.users (id) on delete cascade,
  usage_date date not null default current_date,
  request_count integer not null default 0 check (request_count between 0 and 40),
  updated_at timestamptz not null default now()
);

alter table public.ai_tutor_daily_usage enable row level security;
revoke all on public.ai_tutor_daily_usage from anon, authenticated;

create or replace function public.consume_ai_tutor_request()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  request_allowed boolean;
begin
  if current_user_id is null then
    raise exception 'Authentication is required to use the AI tutor.';
  end if;

  insert into public.ai_tutor_daily_usage (user_id, usage_date, request_count, updated_at)
  values (current_user_id, current_date, 1, now())
  on conflict (user_id) do update
  set usage_date = current_date,
      request_count = case
        when public.ai_tutor_daily_usage.usage_date < current_date then 1
        else public.ai_tutor_daily_usage.request_count + 1
      end,
      updated_at = now()
  where public.ai_tutor_daily_usage.usage_date < current_date
     or public.ai_tutor_daily_usage.request_count < 40
  returning true into request_allowed;

  return coalesce(request_allowed, false);
end;
$$;

revoke all on function public.consume_ai_tutor_request() from public, anon;
grant execute on function public.consume_ai_tutor_request() to authenticated;

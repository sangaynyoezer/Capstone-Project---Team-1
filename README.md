# RecognAI Course Platform

## Supabase setup

The app uses Supabase Auth for student accounts, PostgreSQL for course progress and shared resources, and Supabase Storage for uploaded resource files.

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql). It creates the progress and shared-resource tables, the public file bucket, and row-level security policies. Students can read resources; only teacher accounts can upload and remove files. If you already ran an earlier version of this schema, run the updated file again.
3. In Supabase **Authentication → URL Configuration**, set the Site URL to your GitHub Pages site (for example, `https://YOUR_GITHUB_USERNAME.github.io/Capstone-Project---Team-1/`) and add that same URL to the allowed redirect URLs.
4. For local development, copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Supabase project's API settings. Then run `npm ci` and `npm run dev`.
5. In GitHub, add repository **Actions secrets** named `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with those same public project values. The Pages workflow reads them during its build.

The sign-in and registration forms ask whether the account is for a student or teacher. Selecting teacher records an access request only; it does not grant privileges. To approve a registered account, find its user UUID in **Authentication → Users**, then run this in the SQL Editor, replacing the UUID:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"teacher"}'::jsonb
where id = 'USER_UUID';
```

The teacher must sign out and back in after the role is granted. Resource uploads accept PDF, DOCX, and PPTX files up to 20 MB. Uploaded files are publicly readable to anyone with the course site; do not upload private or sensitive documents.

The anon/publishable key is intended for browser use, but the row-level security policies are essential. Never put a Supabase `service_role` or secret key in this frontend project, `.env.example`, or GitHub Pages build variables.

If Supabase settings are absent, the site still builds, but account sign-in and registration are unavailable until the settings are added.

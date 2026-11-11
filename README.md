# RecognAI Course Platform

## Supabase setup

The app uses Supabase Auth for student accounts, PostgreSQL for course progress and shared resources, and Supabase Storage for uploaded resource files.

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql). It creates the progress and shared-resource tables, the public file bucket, AI tutor daily-usage limits, and row-level security policies. Students can read resources; only teacher accounts can upload and remove files. If you already ran an earlier version of this schema, run the updated file again.
3. In Supabase **Authentication → URL Configuration**, set the Site URL to your GitHub Pages site (for example, `https://YOUR_GITHUB_USERNAME.github.io/Capstone-Project---Team-1/`) and add that same URL to the allowed redirect URLs.
4. For local development, copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Supabase project's API settings. Then run `npm ci` and `npm run dev`.
5. In GitHub, add repository **Actions secrets** named `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with those same public project values. The Pages workflow reads them during its build.
6. To enable Gemini for signed-in students, create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey), then save it as the Supabase Edge Function secret `GEMINI_API_KEY` in **Supabase Dashboard → Edge Functions → Secrets**. Never put this key in `.env.local`, GitHub Pages secrets, or browser code.
7. Deploy the Edge Function from the repository root with the Supabase CLI: `supabase functions deploy study-buddy --project-ref YOUR_PROJECT_REF`. The project ref is the subdomain in your Supabase URL. The function uses the `gemini-3.5-flash-lite` model, requires an authenticated user, and limits each account to 40 requests per day. Gemini free-tier availability and quotas are controlled by Google and can change. Google may use free-tier prompts to improve its products; the tutor UI warns students not to share private information. Guests continue to use the local tutor.

The sign-in and registration forms ask whether the account is for a student or teacher. Selecting teacher records an access request only; it does not grant privileges. To approve a registered account, find its user UUID in **Authentication → Users**, then run this in the SQL Editor, replacing the UUID:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"teacher"}'::jsonb
where id = 'USER_UUID';
```

The teacher must sign out and back in after the role is granted. Resource uploads accept PDF, DOCX, and PPTX files up to 20 MB. Uploaded files are publicly readable to anyone with the course site; do not upload private or sensitive documents.

The anon/publishable key is intended for browser use, but the row-level security policies are essential. Never put a Supabase `service_role` or secret key in this frontend project, `.env.example`, or GitHub Pages build variables.

If Supabase settings are absent, the site still builds, but account sign-in and registration are unavailable until the settings are added.

The Gemini key is read only by the deployed Edge Function. If the function or Gemini free-tier quota is unavailable, signed-in students see an explicit warning and get the local tutor response instead.

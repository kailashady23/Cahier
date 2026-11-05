# Cahier setup

## Cloud database (Supabase)

Create a free project, open **SQL Editor**, and run:

```sql
create table public.cahier_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.cahier_state enable row level security;
create policy "own row read" on public.cahier_state for select to authenticated using (auth.uid() = user_id);
create policy "own row insert" on public.cahier_state for insert to authenticated with check (auth.uid() = user_id);
create policy "own row update" on public.cahier_state for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Copy the Project URL and the publishable (anon) key into `config.js`.
Never put a secret or service-role key in this app.

After creating your own account, turn off new sign-ups in Supabase's Auth settings.

## Hosting (GitHub Pages)

Put these files in a repository, then turn on Pages under Settings, using the main branch and root folder.

## Updating

Change `VERSION` in `sw.js` with each release.

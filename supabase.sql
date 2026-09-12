-- Jalankan sekali di Supabase Dashboard > SQL Editor.
-- Publik boleh BACA; hanya user login (Admin) boleh TULIS.

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Website',
  year text not null,
  "desc" text not null,
  image text not null,
  github text,
  demo text,
  created_at timestamptz not null default now()
);

alter table projects enable row level security;

drop policy if exists "public read projects" on projects;
create policy "public read projects"
  on projects for select using (true);

drop policy if exists "login insert projects" on projects;
create policy "login insert projects"
  on projects for insert with check (auth.role() = 'authenticated');

drop policy if exists "login update projects" on projects;
create policy "login update projects"
  on projects for update using (auth.role() = 'authenticated');

drop policy if exists "login delete projects" on projects;
create policy "login delete projects"
  on projects for delete using (auth.role() = 'authenticated');

-- Bucket publik untuk gambar project.
-- Upload via Dashboard > Storage > project-images, lalu tempel URL-nya di /admin.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images"
  on storage.objects for select using (bucket_id = 'project-images');

drop policy if exists "login upload images" on storage.objects;
create policy "login upload images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

drop policy if exists "login delete images" on storage.objects;
create policy "login delete images"
  on storage.objects for delete using (bucket_id = 'project-images' and auth.role() = 'authenticated');

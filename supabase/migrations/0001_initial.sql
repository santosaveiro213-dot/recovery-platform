-- Avenger initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) to create the tables.

create extension if not exists "pgcrypto";

create type specialization_t as enum (
  'investment_fraud',
  'crypto_loss',
  'bank_fraud',
  'romance_scam',
  'other'
);

create type case_status_t as enum ('pending', 'reviewed', 'matched', 'closed');

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  website_url text,
  logo_url text,
  specialization specialization_t[] not null default '{}',
  languages text[] not null default '{}',
  country text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists companies_active_idx on public.companies (is_active);
create index if not exists companies_country_idx on public.companies (country);
create index if not exists companies_specialization_idx on public.companies using gin (specialization);

create table if not exists public.case_submissions (
  id uuid primary key default gen_random_uuid(),
  loss_type specialization_t not null,
  amount_range text not null,
  country text not null,
  description text not null,
  contact_email text not null,
  phone text not null,
  locale text not null default 'en',
  status case_status_t not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists case_submissions_created_idx on public.case_submissions (created_at desc);
create index if not exists case_submissions_status_idx on public.case_submissions (status);

-- Row level security
alter table public.companies enable row level security;
alter table public.case_submissions enable row level security;

-- Anyone can read active companies (used by the public matching UI).
drop policy if exists "Public read active companies" on public.companies;
create policy "Public read active companies"
  on public.companies for select
  using (is_active = true);

-- Anonymous case submissions are allowed; reads are restricted to service role only.
drop policy if exists "Anonymous insert case submissions" on public.case_submissions;
create policy "Anonymous insert case submissions"
  on public.case_submissions for insert
  with check (true);

-- RLS policies are additional to GRANTs, not a replacement. Without these grants
-- the anon/authenticated roles cannot reach the policy check and inserts/selects
-- fail with "permission denied for table" (SQLSTATE 42501).
grant select on public.companies to anon, authenticated;
grant insert on public.case_submissions to anon, authenticated;

# ToolNova

Futuristic tool showcase with uploads, downloads, and AI assistance.

## Setup
1. Rename `.env.local.example` to `.env.local` and fill in your Supabase keys.
2. `npm install`
3. `npm run dev` to start locally.
4. Deploy on Vercel linking this repo.

## Supabase Schema
Table: tools
Columns:
- id: uuid (default uuid_generate_v4()), primary key
- slug: text, unique
- title: text
- description: text
- how_to: text
- tags: text[]
- file_url: text
- version: text
- views: int, default 0
- downloads: int, default 0
- created_at: timestamp, default now()

Bucket: tool_files

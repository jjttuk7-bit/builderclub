-- BuilderClub 데이터 모델 SQL 스키마
-- Postgres / Supabase용 초기 테이블 정의

create type visibility_enum as enum ('private', 'club', 'public', 'archived');
create type builder_room_status_enum as enum ('active', 'paused', 'archived');
create type project_status_enum as enum ('planning', 'building', 'feedback', 'completed', 'paused');
create type build_log_status_enum as enum ('draft', 'shared', 'converted', 'archived');
create type knowledge_status_enum as enum ('draft', 'published', 'pinned', 'archived');
create type question_urgency_enum as enum ('today', 'this_week', 'low');
create type question_status_enum as enum ('open', 'waiting', 'answered', 'solved', 'archived');
create type feedback_status_enum as enum ('open', 'in_review', 'applied', 'closed', 'archived');
create type comment_target_type_enum as enum ('knowledge_post', 'question', 'feedback_request', 'build_log');
create type comment_type_enum as enum ('comment', 'answer', 'feedback', 'reflection');
create type attachment_type_enum as enum ('image', 'file', 'url');
create type activity_verb_enum as enum ('created', 'updated', 'commented', 'answered', 'requested_feedback', 'converted', 'completed');
create type activity_target_type_enum as enum ('project', 'build_log', 'knowledge_post', 'question', 'feedback_request', 'comment');
create type target_type_enum as enum ('project', 'build_log', 'knowledge_post', 'question', 'feedback_request');

create table builders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  display_name text not null,
  handle text not null unique,
  bio text null,
  interests text[] not null default array[]::text[],
  tools text[] not null default array[]::text[],
  avatar_url text null,
  current_project_id uuid null,
  room_status builder_room_status_enum not null default 'active',
  visibility visibility_enum not null default 'club',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  owner_builder_id uuid not null references builders(id),
  title text not null,
  summary text not null,
  problem text null,
  target_user text null,
  goal text null,
  core_features text[] not null default array[]::text[],
  status project_status_enum not null default 'planning',
  progress integer not null default 0,
  demo_url text null,
  repository_url text null,
  visibility visibility_enum not null default 'club',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null
);

create table build_logs (
  id uuid primary key default gen_random_uuid(),
  builder_id uuid not null references builders(id),
  project_id uuid not null references projects(id),
  title text not null,
  log_date date not null,
  status build_log_status_enum not null default 'draft',
  project_status_snapshot text null,
  progress_snapshot integer null,
  today_work text not null,
  blocked_issue text null,
  attempted_method text null,
  solved_method text null,
  ai_prompt text null,
  learned text null,
  next_action text null,
  visibility visibility_enum not null default 'club',
  converted_question_id uuid null,
  converted_knowledge_id uuid null,
  converted_feedback_id uuid null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null
);

create table knowledge_posts (
  id uuid primary key default gen_random_uuid(),
  author_builder_id uuid not null references builders(id),
  project_id uuid null references projects(id),
  source_build_log_id uuid null,
  source_question_id uuid null,
  title text not null,
  category text not null,
  background text not null,
  core_content text not null,
  applied_method text null,
  ai_prompt text null,
  reference_links text[] not null default array[]::text[],
  reuse_tip text null,
  status knowledge_status_enum not null default 'draft',
  visibility visibility_enum not null default 'club',
  view_count integer not null default 0,
  save_count integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null
);

create table questions (
  id uuid primary key default gen_random_uuid(),
  author_builder_id uuid not null references builders(id),
  project_id uuid null references projects(id),
  source_build_log_id uuid null,
  title text not null,
  situation text not null,
  symptom text null,
  attempted text null,
  related_code_or_prompt text null,
  desired_help text not null,
  urgency question_urgency_enum not null default 'today',
  status question_status_enum not null default 'open',
  accepted_comment_id uuid null,
  converted_knowledge_id uuid null,
  visibility visibility_enum not null default 'club',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null
);

create table feedback_requests (
  id uuid primary key default gen_random_uuid(),
  author_builder_id uuid not null references builders(id),
  project_id uuid not null references projects(id),
  source_build_log_id uuid null,
  title text not null,
  screen_link text null,
  current_status text not null,
  review_focus text not null,
  user_action text null,
  specific_points text null,
  due_date date null,
  status feedback_status_enum not null default 'open',
  applied_summary text null,
  reflection text null,
  visibility visibility_enum not null default 'club',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  author_builder_id uuid not null references builders(id),
  target_type comment_target_type_enum not null,
  target_id uuid not null,
  parent_id uuid null,
  content text not null,
  comment_type comment_type_enum not null default 'comment',
  is_accepted boolean not null default false,
  is_applied boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text null,
  created_at timestamp with time zone not null default now()
);

create table taggings (
  id uuid primary key default gen_random_uuid(),
  tag_id uuid not null references tags(id),
  target_type target_type_enum not null,
  target_id uuid not null,
  created_at timestamp with time zone not null default now()
);

create table attachments (
  id uuid primary key default gen_random_uuid(),
  owner_builder_id uuid not null references builders(id),
  target_type attachment_type_enum not null,
  target_id uuid not null,
  title text null,
  url text not null,
  alt_text text null,
  created_at timestamp with time zone not null default now()
);

create table activity_feed (
  id uuid primary key default gen_random_uuid(),
  actor_builder_id uuid not null references builders(id),
  verb activity_verb_enum not null,
  target_type activity_target_type_enum not null,
  target_id uuid not null,
  project_id uuid null references projects(id),
  summary text not null,
  visibility visibility_enum not null default 'club',
  created_at timestamp with time zone not null default now()
);

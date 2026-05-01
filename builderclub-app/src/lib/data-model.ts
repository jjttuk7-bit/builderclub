export type Visibility = "private" | "club" | "public" | "archived";

export type BuilderRoomStatus = "active" | "paused" | "archived";
export type ProjectStatus = "planning" | "building" | "feedback" | "completed" | "paused";
export type BuildLogStatus = "draft" | "shared" | "converted" | "archived";
export type KnowledgeStatus = "draft" | "published" | "pinned" | "archived";
export type QuestionUrgency = "today" | "this_week" | "low";
export type QuestionStatus = "open" | "waiting" | "answered" | "solved" | "archived";
export type FeedbackStatus = "open" | "in_review" | "applied" | "closed" | "archived";
export type CommentTargetType = "knowledge_post" | "question" | "feedback_request" | "build_log";
export type CommentType = "comment" | "answer" | "feedback" | "reflection";
export type AttachmentType = "image" | "file" | "url";
export type ActivityVerb = "created" | "updated" | "commented" | "answered" | "requested_feedback" | "converted" | "completed";
export type ActivityTargetType = "project" | "build_log" | "knowledge_post" | "question" | "feedback_request" | "comment";
export type TargetType = "project" | "build_log" | "knowledge_post" | "question" | "feedback_request";

export interface Builder {
  id: string;
  user_id?: string | null;
  email?: string;
  password_hash?: string;
  display_name: string;
  handle: string;
  bio?: string | null;
  interests: string[];
  tools: string[];
  avatar_url?: string | null;
  current_project_id?: string | null;
  room_status: BuilderRoomStatus;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  owner_builder_id: string;
  title: string;
  summary: string;
  problem?: string | null;
  target_user?: string | null;
  goal?: string | null;
  core_features: string[];
  status: ProjectStatus;
  progress: number;
  demo_url?: string | null;
  repository_url?: string | null;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
}

export interface BuildLog {
  id: string;
  builder_id: string;
  project_id: string;
  title: string;
  log_date: string;
  status: BuildLogStatus;
  project_status_snapshot?: string | null;
  progress_snapshot?: number | null;
  today_work: string;
  blocked_issue?: string | null;
  attempted_method?: string | null;
  solved_method?: string | null;
  ai_prompt?: string | null;
  learned?: string | null;
  next_action?: string | null;
  visibility: Visibility;
  converted_question_id?: string | null;
  converted_knowledge_id?: string | null;
  converted_feedback_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface KnowledgePost {
  id: string;
  author_builder_id: string;
  project_id?: string | null;
  source_build_log_id?: string | null;
  source_question_id?: string | null;
  title: string;
  category: string;
  background: string;
  core_content: string;
  applied_method?: string | null;
  ai_prompt?: string | null;
  reference_links: string[];
  reuse_tip?: string | null;
  status: KnowledgeStatus;
  visibility: Visibility;
  view_count: number;
  save_count: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  author_builder_id: string;
  project_id?: string | null;
  source_build_log_id?: string | null;
  title: string;
  situation: string;
  symptom?: string | null;
  attempted?: string | null;
  related_code_or_prompt?: string | null;
  desired_help: string;
  urgency: QuestionUrgency;
  status: QuestionStatus;
  accepted_comment_id?: string | null;
  converted_knowledge_id?: string | null;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
}

export interface FeedbackRequest {
  id: string;
  author_builder_id: string;
  project_id: string;
  source_build_log_id?: string | null;
  title: string;
  screen_link?: string | null;
  current_status: string;
  review_focus: string;
  user_action?: string | null;
  specific_points?: string | null;
  due_date?: string | null;
  status: FeedbackStatus;
  applied_summary?: string | null;
  reflection?: string | null;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  author_builder_id: string;
  target_type: CommentTargetType;
  target_id: string;
  parent_id?: string | null;
  content: string;
  comment_type: CommentType;
  is_accepted: boolean;
  is_applied: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  category?: string | null;
  created_at: string;
}

export interface Tagging {
  id: string;
  tag_id: string;
  target_type: TargetType;
  target_id: string;
  created_at: string;
}

export interface Attachment {
  id: string;
  owner_builder_id: string;
  target_type: TargetType | "comment";
  target_id: string;
  attachment_type: AttachmentType;
  title?: string | null;
  url: string;
  alt_text?: string | null;
  created_at: string;
}

export interface ActivityFeed {
  id: string;
  actor_builder_id: string;
  verb: ActivityVerb;
  target_type: ActivityTargetType;
  target_id: string;
  project_id?: string | null;
  summary: string;
  visibility: Visibility;
  created_at: string;
}

import Link from "next/link";
import { StatusBadge } from "@/components/status/StatusBadge";
import { TagList } from "@/components/tags/TagList";
import { ArrowRight } from "lucide-react";
import styles from "./ContentCard.module.css";

type ContentCardProps = {
  title: string;
  summary: string;
  href: string;
  status: string;
  author?: string;
  tags?: string[];
  createdAt?: string;
  onDelete?: () => void;
};

export function ContentCard({ title, summary, href, status, author, tags = [], createdAt, onDelete }: ContentCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <StatusBadge status={status} />
        {author ? <span className={styles.author}>작성자: {author}</span> : null}
        {createdAt && <span className={styles["created-at"]}>{createdAt}</span>}
      </div>
      <h2>
        <Link href={href}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <TagList tags={tags} />
      <div className={styles["card-footer"]}>
        {onDelete ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
                onDelete();
              }
            }}
            className={styles["delete-button"]}
          >
            삭제하기
          </button>
        ) : (
          <span />
        )}
        <span className={styles["view-more"]}>
          자세히 보기
          <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}

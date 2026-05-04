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
};

export function ContentCard({ title, summary, href, status, author, tags = [] }: ContentCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <StatusBadge status={status} />
        {author ? <span className={styles.author}>작성자: {author}</span> : null}
      </div>
      <h2>
        <Link href={href}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <TagList tags={tags} />
      <div className={styles["card-footer"]}>
        <span />
        <span className={styles["view-more"]}>
          자세히 보기
          <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}

import { ContentCard } from "@/components/cards/ContentCard";
import styles from "./CardSection.module.css";

import type { CardSectionItem } from "@/lib/mock-db";

type CardSectionProps = {
  title: string;
  description: string;
  items: CardSectionItem[];
  formatCreatedAt?: (createdAt?: string) => string;
  deleteAction?: (formData: FormData) => Promise<void>;
};

export function CardSection({ title, description, items, formatCreatedAt, deleteAction }: CardSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={`${title}-title`}>
      <div className={styles.header}>
        <div>
          <h2 id={`${title}-title`}>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <ContentCard
            key={item.id || item.href}
            title={item.title}
            summary={item.summary}
            href={item.href}
            status={item.status}
            author={item.author}
            tags={item.tags}
            createdAt={formatCreatedAt ? formatCreatedAt(item.created_at) : undefined}
            onDelete={deleteAction ? () => {
              const form = document.createElement("form");
              form.method = "POST";
              form.action = deleteAction;
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = "project-id";
              input.value = item.id || "";
              form.appendChild(input);
              document.body.appendChild(form);
              form.submit();
            } : undefined}
          />
        ))}
      </div>
    </section>
  );
}

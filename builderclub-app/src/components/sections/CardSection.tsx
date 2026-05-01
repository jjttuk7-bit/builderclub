import { ContentCard } from "@/components/cards/ContentCard";
import styles from "./CardSection.module.css";

type CardSectionItem = {
  title: string;
  summary: string;
  href: string;
  status: string;
  author?: string;
  tags?: string[];
};

type CardSectionProps = {
  title: string;
  description: string;
  items: CardSectionItem[];
};

export function CardSection({ title, description, items }: CardSectionProps) {
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
            key={item.href}
            title={item.title}
            summary={item.summary}
              href={item.href}
              status={item.status}
              author={item.author}
              tags={item.tags}
            />
        ))}
      </div>
    </section>
  );
}

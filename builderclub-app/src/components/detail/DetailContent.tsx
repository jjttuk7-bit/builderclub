import { StatusBadge } from "@/components/status/StatusBadge";
import styles from "./DetailContent.module.css";

type DetailSectionItem = {
  title: string;
  body: string;
};

type DetailContentProps = {
  title: string;
  status: string;
  builder: string;
  project: string;
  sections: DetailSectionItem[];
  actions: string[];
};

export function DetailContent({ title, status, builder, project, sections, actions }: DetailContentProps) {
  return (
    <article className={styles.detail}>
      <header className={styles.header}>
        <div>
          <p className={styles.meta}>
            {builder} · {project}
          </p>
          <h2>{title}</h2>
        </div>
        <StatusBadge status={status} />
      </header>

      <div className={styles.sections}>
        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </section>
        ))}
      </div>

      <aside className={styles.actions} aria-label="전환 액션">
        <h3>다음 액션</h3>
        <div>
          {actions.map((action) => (
            <button key={action} type="button">
              {action}
            </button>
          ))}
        </div>
      </aside>
    </article>
  );
}

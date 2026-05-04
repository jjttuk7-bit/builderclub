import styles from "./TagList.module.css";

type TagListProps = {
  tags?: string[];
};

export function TagList({ tags = [] }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={styles.badge}>{status}</span>;
}

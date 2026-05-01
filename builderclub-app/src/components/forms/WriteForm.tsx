import { currentBuilder } from "@/data/current-builder";
import styles from "./WriteForm.module.css";

type WriteFormField = {
  label: string;
  type?: "input" | "textarea" | "date" | "select";
  placeholder?: string;
  options?: readonly string[];
};

type WriteFormProps = {
  title: string;
  description: string;
  fields: readonly WriteFormField[];
  submitLabel: string;
  action?: (formData: FormData) => Promise<void>;
  builderName?: string;
};

export function WriteForm({ title, description, fields, submitLabel, action, builderName }: WriteFormProps) {
  const displayName = builderName ?? currentBuilder.name;
  return (
    <form className={styles.form} action={action}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>

      <section className={styles.ownerGrid} aria-label="작성 소유자 정보">
        <div>
          <span>작성자</span>
          <strong>{displayName}</strong>
        </div>
        <div>
          <span>저장 위치</span>
          <strong>내 빌더룸</strong>
        </div>
        <div>
          <span>접근 기준</span>
          <strong>로그인한 클럽 멤버</strong>
        </div>
      </section>

      <div className={styles.fields}>
        {fields.map((field) => {
          const id = field.label.replaceAll(/\s|\//g, "-");

          if (field.type === "select") {
            return (
              <label key={field.label} className={styles.field} htmlFor={id}>
                <span>{field.label}</span>
                <select id={id} name={id} defaultValue={field.options?.[0]}>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            );
          }

          if (field.type === "date") {
            return (
              <label key={field.label} className={styles.field} htmlFor={id}>
                <span>{field.label}</span>
                <input id={id} name={id} type="date" />
              </label>
            );
          }

          if (field.type === "input") {
            return (
              <label key={field.label} className={styles.field} htmlFor={id}>
                <span>{field.label}</span>
                <input id={id} name={id} placeholder={field.placeholder} />
              </label>
            );
          }

          return (
            <label key={field.label} className={styles.field} htmlFor={id}>
              <span>{field.label}</span>
              <textarea id={id} name={id} placeholder={field.placeholder} rows={5} />
            </label>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <label className={styles.visibility} htmlFor="visibility">
          <span>공개 범위</span>
          <select id="visibility" name="visibility" defaultValue="club">
            <option value="private">private</option>
            <option value="club">club</option>
            <option value="public">public</option>
          </select>
        </label>
        <button type="submit">{submitLabel}</button>
      </footer>
    </form>
  );
}

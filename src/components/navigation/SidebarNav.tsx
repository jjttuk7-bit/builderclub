import Link from "next/link";
import { primaryNavigation, writeNavigation } from "@/config/routes";
import { currentBuilder } from "@/data/current-builder";
import styles from "./SidebarNav.module.css";

export function SidebarNav() {
  return (
    <nav aria-label="주요 메뉴" className={styles.nav}>
      <div className={styles.brand}>
        <strong>Builder Club</strong>
        <span>Community OS</span>
      </div>
      <section className={styles.memberPanel} aria-label="현재 멤버">
        <p className={styles.memberBadge}>멤버 전용</p>
        <span>로그인 중</span>
        <strong>{currentBuilder.name}</strong>
        <small>{currentBuilder.role}</small>
        <Link href={currentBuilder.workspaceHref}>내 작업공간</Link>
      </section>
      <ul className={styles.list}>
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.writeBlock}>
        <p>바로 작성</p>
        <ul className={styles.writeList}>
          {writeNavigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

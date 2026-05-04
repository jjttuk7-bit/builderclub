"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { primaryNavigation, writeNavigation } from "@/config/routes";
import styles from "./SidebarNav.module.css";

type SidebarBuilder = {
  name: string;
  role?: string;
  workspaceHref?: string;
};

type SidebarNavProps = {
  builder?: SidebarBuilder;
};

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({ builder }: SidebarNavProps) {
  const pathname = usePathname();
  const [currentBuilder, setCurrentBuilder] = useState<SidebarBuilder>(
    builder ?? {
      name: "GUEST",
      role: "방문자",
      workspaceHref: "/",
    }
  );

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/session");
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (data?.name) {
          setCurrentBuilder({
            name: data.name,
            role: data.role ?? "클럽 멤버",
            workspaceHref: data.workspaceHref ?? "/",
          });
        }
      } catch {
        // ignore fetch errors and keep fallback builder
      }
    }

    loadSession();
  }, []);

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
        <Link href={currentBuilder.workspaceHref ?? "/"}>내 작업공간</Link>
        <button onClick={() => signOut({ callbackUrl: "/login" })} className={styles.logoutBtn}>
          로그아웃
        </button>
      </section>
      <ul className={styles.list}>
        {primaryNavigation.map((item) => {
          const href = (item.label === "빌더룸" ? currentBuilder.workspaceHref : item.href) || "/";
          const active = isActivePath(pathname, href);
          return (
            <li key={item.label}>
              <Link
                href={href}
                className={active ? styles.active : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
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

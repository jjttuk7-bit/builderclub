import { ReactNode } from "react";
import { SidebarNav } from "@/components/navigation/SidebarNav";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <SidebarNav />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

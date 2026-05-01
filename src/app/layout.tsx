import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "빌더클럽",
  description: "빌더들의 기록, 질문, 피드백, 지식 공유가 모이는 커뮤니티 대시보드입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

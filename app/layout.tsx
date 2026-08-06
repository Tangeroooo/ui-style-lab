import type { Metadata } from "next";
import "./globals.css";
import "./style-lab.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tangerooo.github.io/ui-style-lab/"),
  title: "UI Language Lab",
  description:
    "같은 UI 구조에 서로 다른 디자인 언어의 층위를 조합해 보는 인터랙티브 레퍼런스.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "UI Language Lab",
    description: "같은 구조, 다른 디자인 언어. 181,440개 UI 조합을 탐색하세요.",
    type: "website",
    url: "https://tangerooo.github.io/ui-style-lab/",
    images: [{ url: "/ui-style-lab/og.png", width: 1731, height: 909, alt: "UI Language Lab — three dashboard visual languages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Language Lab",
    description: "같은 구조, 다른 디자인 언어. 181,440개 UI 조합을 탐색하세요.",
    images: ["/ui-style-lab/og.png"],
  },
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

import type { Metadata } from "next";
import "./globals.css";
import "./style-lab.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tangerooo.github.io/ui-style-lab/"),
  title: "UI Language Lab",
  description:
    "일곱 디자인 층위를 조합하고 compact component lab과 실제 chart에서 결과를 확인하는 인터랙티브 레퍼런스.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "UI Language Lab",
    description: "같은 UI, 다른 디자인 언어. 미학적으로 검증된 8,332개 조합을 직접 비교하세요.",
    type: "website",
    url: "https://tangerooo.github.io/ui-style-lab/",
    images: [{ url: "/ui-style-lab/og.png", width: 1732, height: 908, alt: "UI Language Lab — the same component kit in Glass, Brutal, Editorial, and Terminal styles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Language Lab",
    description: "같은 UI, 다른 디자인 언어. 미학적으로 검증된 8,332개 조합을 직접 비교하세요.",
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

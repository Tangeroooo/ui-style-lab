import type { Metadata } from "next";
import "./globals.css";
import "./style-lab.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tangerooo.github.io/ui-style-lab/"),
  title: "UI Language Lab",
  description:
    "여섯 디자인 층위를 조합하고 실제 full-page website와 chart에서 결과를 확인하는 인터랙티브 레퍼런스.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "UI Language Lab",
    description: "Mix the system. Experience the page. 181,440개 UI 조합을 탐색하세요.",
    type: "website",
    url: "https://tangerooo.github.io/ui-style-lab/",
    images: [{ url: "/ui-style-lab/og.png", width: 1734, height: 907, alt: "UI Language Lab — field guide landscape and floating design controls" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Language Lab",
    description: "Mix the system. Experience the page. 181,440개 UI 조합을 탐색하세요.",
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

import type { Metadata } from "next";
import "./globals.css";
import "./style-lab.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tangerooo.github.io/ui-style-lab/"),
  title: "UI Style Lab",
  description:
    "Mix complete interface systems across English, Korean-only, and Korean + English typography modes, then share an agent-ready reference view.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "UI Style Lab",
    description: "One interface, many design languages. Explore up to 799,808 aesthetically compatible full-page combinations.",
    type: "website",
    url: "https://tangerooo.github.io/ui-style-lab/",
    images: [{ url: "/ui-style-lab/og.png", width: 1732, height: 908, alt: "UI Style Lab — the same component kit in Glass, Brutal, Editorial, and Terminal styles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Style Lab",
    description: "One interface, many design languages. Explore up to 799,808 aesthetically compatible full-page combinations.",
    images: ["/ui-style-lab/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

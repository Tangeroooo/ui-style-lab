import type { Metadata } from "next";
import "./globals.css";
import "./style-lab.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tangerooo.github.io/ui-style-lab/"),
  title: "UI Language Lab",
  description:
    "Mix ten compatible design layers, including independent Latin and Korean typography, across a complete interface and live charts.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "UI Language Lab",
    description: "One interface, many design languages. Explore 143,064 aesthetically compatible full-page combinations.",
    type: "website",
    url: "https://tangerooo.github.io/ui-style-lab/",
    images: [{ url: "/ui-style-lab/og.png", width: 1732, height: 908, alt: "UI Language Lab — the same component kit in Glass, Brutal, Editorial, and Terminal styles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Language Lab",
    description: "One interface, many design languages. Explore 143,064 aesthetically compatible full-page combinations.",
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

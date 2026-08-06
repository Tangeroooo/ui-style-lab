import type { Metadata } from "next";
import { StyleLab } from "./StyleLab";

export const metadata: Metadata = {
  title: "UI Language Lab — Explore UI design combinations",
  description:
    "하나의 화면에서 aesthetic, surface, layout, typography, palette, motion을 조합하고 비교하는 UI 디자인 레퍼런스.",
};

export default function Home() {
  return <StyleLab />;
}

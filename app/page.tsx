import type { Metadata } from "next";
import { StyleLabRoot } from "./StyleLabRoot";

export const metadata: Metadata = {
  title: "UI Style Lab — Explore UI design combinations",
  description:
    "Aesthetic, surface, layout, navigation, typography, palette, motion을 compact component lab에서 비교하는 UI 디자인 레퍼런스.",
};

export default function Home() {
  return <StyleLabRoot />;
}

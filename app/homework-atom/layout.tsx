import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homework",
};

export default function HomeworkAtomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

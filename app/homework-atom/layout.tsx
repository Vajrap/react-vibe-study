import { Link, Stack } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homework",
};

export default function HomeworkAtomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack direction={"column"}>
      <Link
        href="/"
        className="w-fit rounded border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:border-zinc-500"
        sx={{ margin: 2 }}
      >
        Back to lessons
      </Link>
      {children};
    </Stack>
  );
}

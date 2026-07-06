import Link from "next/link";
import type { ReactNode } from "react";

type LessonPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function LessonPage({ title, subtitle, children }: LessonPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 sm:px-8 lg:px-10">
      <Link
        href="/"
        className="w-fit rounded border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:border-zinc-500"
      >
        Back to lessons
      </Link>

      <header className="space-y-3 border-b border-zinc-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          React lesson
        </p>
        <h1 className="text-4xl font-bold text-zinc-950">{title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-700">{subtitle}</p>
      </header>

      <div className="grid gap-6">{children}</div>
    </main>
  );
}

export function LessonSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-950">{title}</h2>
      <div className="space-y-3 text-base leading-7 text-zinc-700">{children}</div>
    </section>
  );
}

export function LessonList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-zinc-700">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded bg-zinc-950 p-4 text-sm leading-6 text-zinc-50">
      <code>{children}</code>
    </pre>
  );
}

export function DemoPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded border border-teal-200 bg-teal-50 p-4 text-zinc-950">
      {children}
    </div>
  );
}

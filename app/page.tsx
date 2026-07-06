import Link from "next/link";
import { lessons } from "./lessons";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          React hooks lesson
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
          Lesson index
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-700">
          Move through the examples in order, or open one route directly while
          teaching a specific concept.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.href}
            href={lesson.href}
            className="group rounded border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                {lesson.tag}
              </span>
              <span className="text-sm font-semibold text-teal-700 group-hover:text-teal-800">
                Open
              </span>
            </div>
            <h2 className="text-xl font-semibold text-zinc-950">
              {lesson.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {lesson.summary}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { courseUnits, javascriptLessons } from "./course";

type JavaScriptCourseShellProps = {
  activeSlug?: string;
  children: ReactNode;
};

export function JavaScriptCourseShell({
  activeSlug,
  children,
}: JavaScriptCourseShellProps) {
  const activeIndex = javascriptLessons.findIndex(
    (lesson) => lesson.slug === activeSlug,
  );
  const activeLesson = javascriptLessons[activeIndex];
  const activeUnit =
    courseUnits.find((unit) => unit.id === activeLesson?.unit) ?? courseUnits[0];
  const visibleLessons = javascriptLessons.filter(
    (lesson) => lesson.unit === activeUnit.id,
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-950 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-6 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-amber-400">
                JavaScript foundations
              </p>
              <Link href="/javascript" className="mt-1 block text-2xl font-bold">
                How JavaScript Executes
              </Link>
            </div>
            <Link
              href="/"
              className="border border-zinc-600 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-white hover:text-white"
            >
              All lessons
            </Link>
          </div>

          <nav aria-label="JavaScript course units" className="overflow-x-auto">
            <ol className="flex min-w-max border border-zinc-700">
              {courseUnits.map((unit) => {
                const firstLesson = javascriptLessons.find(
                  (lesson) => lesson.unit === unit.id,
                );
                const isActive = unit.id === activeUnit.id;
                return (
                  <li key={unit.id}>
                    <Link
                      href={`/javascript/${firstLesson?.slug}`}
                      className={`block border-r border-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-wide last:border-r-0 ${
                        isActive
                          ? "bg-amber-400 text-zinc-950"
                          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                      }`}
                    >
                      Unit {unit.number}: {unit.title}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <nav aria-label={`${activeUnit.title} progress`} className="overflow-x-auto pb-1">
            <ol className="flex min-w-max items-start gap-0">
              {visibleLessons.map((lesson, index) => {
                const isActive = lesson.slug === activeSlug;
                const lessonIndex = javascriptLessons.findIndex(
                  (item) => item.slug === lesson.slug,
                );
                const isComplete = activeIndex > lessonIndex;
                return (
                  <li key={lesson.slug} className="flex items-start">
                    <Link
                      href={`/javascript/${lesson.slug}`}
                      aria-current={isActive ? "step" : undefined}
                      className="group flex w-24 flex-col items-center gap-2 text-center"
                    >
                      <span
                        className={`grid size-8 place-items-center border text-sm font-bold ${
                          isActive
                            ? "border-amber-400 bg-amber-400 text-zinc-950"
                            : isComplete
                              ? "border-emerald-400 bg-emerald-400 text-zinc-950"
                              : "border-zinc-600 bg-zinc-900 text-zinc-300 group-hover:border-zinc-300"
                        }`}
                      >
                        {lesson.number}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isActive ? "text-amber-300" : "text-zinc-400"
                        }`}
                      >
                        {lesson.shortTitle}
                      </span>
                    </Link>
                    {index < visibleLessons.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={`mt-4 h-px w-5 ${
                          activeIndex > index ? "bg-emerald-400" : "bg-zinc-700"
                        }`}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </header>
      {children}
    </main>
  );
}

import Link from "next/link";
import { JavaScriptCourseShell } from "./JavaScriptCourseShell";
import { courseUnits, javascriptLessons } from "./course";

export default function JavascriptPage() {
  return (
    <JavaScriptCourseShell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="grid gap-8 border-b border-zinc-300 pb-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700">
              Eighteen-lesson course
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
              Build a working model of JavaScript
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Follow a value from its type and binding, through scope and a
              function call, into closures and finally the event loop.
            </p>
            <Link
              href={`/javascript/${javascriptLessons[0].slug}`}
              className="mt-7 inline-block bg-teal-700 px-5 py-3 font-bold text-white hover:bg-teal-800"
            >
              Start lesson 1
            </Link>
          </div>
          <aside className="border-l-4 border-amber-500 bg-amber-50 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
              The central model
            </p>
            <ol className="mt-4 space-y-3 text-sm font-semibold leading-6 text-zinc-800">
              <li>1. Values have types.</li>
              <li>2. Bindings live in lexical scopes.</li>
              <li>3. Calls create execution contexts.</li>
              <li>4. Closures retain access to bindings.</li>
              <li>5. Queued callbacks wait for the stack.</li>
            </ol>
          </aside>
        </header>

        <section className="py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Course map
              </p>
              <h2 className="mt-1 text-3xl font-bold">
                From values to scheduling
              </h2>
            </div>
            <p className="text-sm text-zinc-500">
              Complete in order or open any lesson.
            </p>
          </div>
          <div className="mt-7 space-y-10">
            {courseUnits.map((unit) => (
              <section key={unit.id}>
                <div className="grid gap-2 border-l-4 border-amber-500 pl-4 sm:grid-cols-[1fr_1fr] sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                      Unit {unit.number}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-zinc-950">
                      {unit.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-zinc-600">
                    {unit.summary}
                  </p>
                </div>
                <ol className="mt-4 grid border-l border-t border-zinc-300 sm:grid-cols-2">
                  {javascriptLessons
                    .filter((lesson) => lesson.unit === unit.id)
                    .map((lesson) => (
                      <li
                        key={lesson.slug}
                        className="border-b border-r border-zinc-300 bg-white"
                      >
                        <Link
                          href={`/javascript/${lesson.slug}`}
                          className="group flex min-h-40 gap-5 p-5 hover:bg-teal-50"
                        >
                          <span className="grid size-10 shrink-0 place-items-center bg-zinc-950 font-bold text-white group-hover:bg-teal-700">
                            {lesson.number}
                          </span>
                          <span>
                            <span className="block text-xl font-bold text-zinc-950">
                              {lesson.title}
                            </span>
                            <span className="mt-2 block text-sm leading-6 text-zinc-600">
                              {lesson.summary}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                </ol>
              </section>
            ))}
          </div>
        </section>
      </div>
    </JavaScriptCourseShell>
  );
}

import Link from "next/link";
import { JavaScriptCourseShell } from "./JavaScriptCourseShell";
import { KnowledgeCheck } from "./KnowledgeCheck";
import { javascriptLessons, type JavaScriptLesson } from "./course";

export function JavaScriptLessonPage({ lesson }: { lesson: JavaScriptLesson }) {
  const index = javascriptLessons.findIndex(
    (item) => item.slug === lesson.slug,
  );
  const previous = javascriptLessons[index - 1];
  const next = javascriptLessons[index + 1];

  return (
    <JavaScriptCourseShell activeSlug={lesson.slug}>
      <article className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="grid gap-7 border-b border-zinc-300 pb-9 md:grid-cols-[1fr_15rem]">
          <div>
            <p className="text-sm font-bold text-teal-700">
              Lesson {lesson.number} of {javascriptLessons.length}
            </p>
            <h1 className="mt-2 text-4xl font-bold leading-tight sm:text-5xl">
              {lesson.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              {lesson.summary}
            </p>
          </div>
          <aside className="border-l-4 border-teal-600 bg-white p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-950">
              By the end
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
              {lesson.objectives.map((objective) => (
                <li key={objective}>- {objective}</li>
              ))}
            </ul>
          </aside>
        </header>

        <div className="divide-y divide-zinc-300">
          {lesson.sections.map((section, sectionIndex) => (
            <section key={section.title} className="py-9 sm:py-11">
              <div className="flex gap-4">
                <span className="mt-1 text-sm font-bold text-teal-700">
                  {lesson.number}.{sectionIndex + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold text-zinc-950">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-zinc-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-5 grid gap-2 border-l-2 border-zinc-300 pl-5 text-sm leading-6 text-zinc-700 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>- {bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.code ? (
                    <div className="mt-6 overflow-hidden border border-zinc-800 bg-zinc-950">
                      <div className="border-b border-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
                        JavaScript
                      </div>
                      <pre className="overflow-x-auto p-4 text-sm leading-6 text-zinc-50">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  ) : null}
                  {section.output ? (
                    <div className="border-x border-b border-zinc-300 bg-white px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Output
                      </p>
                      <pre className="mt-2 whitespace-pre-wrap font-mono text-sm leading-6 text-zinc-800">
                        {section.output}
                      </pre>
                    </div>
                  ) : null}
                  {section.note ? (
                    <p className="mt-5 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                      <strong>Important:</strong> {section.note}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          ))}
        </div>

        <KnowledgeCheck {...lesson.check} />

        {lesson.production ? (
          <section className="mt-8 border-l-4 border-red-600 bg-red-50 px-5 py-6 sm:px-7">
            <p className="text-xs font-bold uppercase tracking-wide text-red-700">
              Production failure mode
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">
              {lesson.production.title}
            </h2>
            <p className="mt-3 leading-7 text-zinc-700">
              {lesson.production.body}
            </p>
            {lesson.production.code ? (
              <pre className="mt-4 overflow-x-auto bg-zinc-950 p-4 text-sm leading-6 text-zinc-50">
                <code>{lesson.production.code}</code>
              </pre>
            ) : null}
          </section>
        ) : null}

        {lesson.debugging ? (
          <section className="mt-8 border border-blue-300 bg-blue-50 px-5 py-6 sm:px-7">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
              Debugging lab
            </p>
            <h2 className="mt-2 text-xl font-bold text-zinc-950">
              {lesson.debugging.prompt}
            </h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-700">
              {lesson.debugging.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="font-bold text-blue-700">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {lesson.exercises?.length ? (
          <section className="mt-8 border-y border-zinc-300 bg-white px-5 py-7 sm:px-7">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Deliberate practice
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">
              Explain before revealing
            </h2>
            <div className="mt-5 space-y-4">
              {lesson.exercises.map((exercise, index) => (
                <div
                  key={exercise.prompt}
                  className="border border-zinc-300 p-4"
                >
                  <h3 className="font-bold text-zinc-950">
                    Exercise {index + 1}: {exercise.prompt}
                  </h3>
                  {exercise.code ? (
                    <pre className="mt-3 overflow-x-auto bg-zinc-950 p-4 text-sm leading-6 text-zinc-50">
                      <code>{exercise.code}</code>
                    </pre>
                  ) : null}
                  <details className="mt-3 border-t border-zinc-200 pt-3">
                    <summary className="cursor-pointer text-sm font-bold text-teal-700">
                      Reveal reasoning
                    </summary>
                    <p className="mt-2 text-sm leading-6 text-zinc-700">
                      {exercise.answer}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="bg-teal-950 px-5 py-7 text-white sm:px-7">
          <p className="text-xs font-bold uppercase tracking-wide text-teal-300">
            Mental model
          </p>
          <h2 className="mt-2 text-2xl font-bold">Keep these distinctions</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-teal-50">
            {lesson.takeaways.map((takeaway) => (
              <li key={takeaway} className="border-l-2 border-teal-400 pl-4">
                {takeaway}
              </li>
            ))}
          </ul>
        </section>

        <nav
          aria-label="Lesson navigation"
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/javascript/${previous.slug}`}
              className="border border-zinc-300 bg-white p-4 hover:border-teal-600"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Previous
              </span>
              <span className="mt-1 block font-bold text-zinc-950">
                {previous.number}. {previous.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/javascript"
              className="border border-zinc-300 bg-white p-4 hover:border-teal-600"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Previous
              </span>
              <span className="mt-1 block font-bold text-zinc-950">
                Course overview
              </span>
            </Link>
          )}
          {next ? (
            <Link
              href={`/javascript/${next.slug}`}
              className="border border-teal-700 bg-teal-700 p-4 text-white hover:bg-teal-800 sm:text-right"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-teal-100">
                Next
              </span>
              <span className="mt-1 block font-bold">
                {next.number}. {next.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/javascript"
              className="border border-teal-700 bg-teal-700 p-4 text-white hover:bg-teal-800 sm:text-right"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-teal-100">
                Complete
              </span>
              <span className="mt-1 block font-bold">
                Return to course overview
              </span>
            </Link>
          )}
        </nav>
      </article>
    </JavaScriptCourseShell>
  );
}

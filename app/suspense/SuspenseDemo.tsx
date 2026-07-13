"use client";

import { lazy, Suspense, useState } from "react";

function loadLessonCard(delay: number) {
  return lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return import("./LazyLessonCard");
  });
}

const lazyCards = [
  loadLessonCard(1200),
  loadLessonCard(900),
  loadLessonCard(600),
];

export function SuspenseDemo() {
  const [example, setExample] = useState(0);
  const LazyCard = lazyCards[example];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-700">
          Example {example + 1} of {lazyCards.length}
        </p>
        <button
          type="button"
          className="border border-teal-700 bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-300"
          disabled={example === lazyCards.length - 1}
          onClick={() => setExample((current) => current + 1)}
        >
          Load next module
        </button>
      </div>

      <Suspense
        fallback={
          <div
            role="status"
            className="border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-950"
          >
            Loading the component module...
          </div>
        }
      >
        <LazyCard />
      </Suspense>
    </div>
  );
}

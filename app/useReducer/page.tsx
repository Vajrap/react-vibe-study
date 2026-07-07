"use client";

import { useState } from "react";
import { DemoPanel, LessonPage, LessonSection } from "../components/LessonPage";

export default function UseReducerPage() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  return (
    <LessonPage
      title="useReducer"
      subtitle="A live coding session starter. Begin with setCount, then convert it to a reducer together."
    >
      <LessonSection title="Counter">
        <DemoPanel>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Count: {count}</h2>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => setCount(count + 1)}
              >
                Inc
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => setCount(count - 1)}
              >
                Dec
              </button>
            </div>
          </div>
        </DemoPanel>
      </LessonSection>
    </LessonPage>
  );
}

"use client";

import { useReducer } from "react";
import { DemoPanel, LessonPage, LessonSection } from "../components/LessonPage";

type State = { count: number; error: string };
type Action = { type: "increase" } | { type: "decrease" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "increase": {
      const newCount = state.count + 1;

      if (newCount > 5) {
        return { count: 5, error: "too many" };
      }

      return { count: newCount, error: "" };
    }
    case "decrease": {
      const newCount = state.count - 1;

      if (newCount < 0) {
        return { count: 0, error: "too few" };
      }

      return { count: newCount, error: "" };
    }
  }
}

export default function UseReducerPage() {
  const [state, dispatch] = useReducer(reducer, { count: 0, error: "" });

  return (
    <LessonPage
      title="useReducer"
      subtitle="A live coding session starter. Begin with setCount, then convert it to a reducer together."
    >
      <LessonSection title="Counter">
        <DemoPanel>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Count: {state.count}</h2>
            {state.error ? (
              <p className="font-semibold text-red-700">{state.error}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => dispatch({ type: "increase" })}
              >
                Inc
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => dispatch({ type: "decrease" })}
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

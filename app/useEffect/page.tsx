"use client";

import { useEffect, useState } from "react";
import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";

const code = `import { useEffect, useState } from "react";

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("the count is", count);

    // Optional cleanup function
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`;

export default function UseEffectPage() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("the count is", count);
  }, [count]);

  return (
    <LessonPage
      title="useEffect"
      subtitle="useEffect lets us run code after render when specific values change."
    >
      <LessonSection title="Effect basics">
        <LessonList
          items={[
            "The dependency array tells React what values to watch.",
            "When one of those values changes, React runs the effect.",
            "The effect is where we put the thing we want to happen because of that change.",
            "In normal production behavior, React runs useEffect after mount.",
            "In React Strict Mode during development, React may run the effect twice to help detect bugs.",
            "React runs useEffect after render and commit, not during the component function.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Live example">
        <DemoPanel>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="min-w-32 text-2xl font-semibold">
                Count: {count}
              </h2>
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => setCount(0)}
              >
                Reset
              </button>
            </div>
            <p className="rounded bg-white p-3 text-sm">
              Open the browser console to see the effect log after mount and
              after count changes.
            </p>
          </div>
        </DemoPanel>
        <CodeBlock>{code}</CodeBlock>
      </LessonSection>
    </LessonPage>
  );
}

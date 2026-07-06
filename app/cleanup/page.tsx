"use client";

import { useEffect, useState } from "react";
import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";

const cleanupCode = `import { useEffect, useState } from "react";

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("the count is", count);

    // Optional cleanup function
    return () => {
      console.log("cleaning up");
    };
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`;

const renderCode = `import { useState } from "react";

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [count, setCount] = useState<number>(0);

  console.log("the count is", count);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`;

function CleanupDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("the count is", count);

    return () => {
      console.log("cleaning up");
    };
  }, [count]);

  return (
    <DemoPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="min-w-32 text-2xl font-semibold">Count: {count}</h2>
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
          Open the browser console. When count changes, React runs the previous
          cleanup before the new effect.
        </p>
      </div>
    </DemoPanel>
  );
}

export default function CleanupPage() {
  return (
    <LessonPage
      title="Cleanup Function"
      subtitle="When an effect returns a function, React saves it and calls it before the effect runs again or when the component unmounts."
    >
      <LessonSection title="Cleanup behavior">
        <LessonList
          items={[
            "If useEffect returns a function, React saves it as the cleanup function.",
            "Cleanup is used to undo what the previous effect did.",
            "React runs cleanup before the effect runs again.",
            "React runs cleanup when the component unmounts.",
            "If count changes from 0 to 1, the important console order is: cleaning up, then the count is 1.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Live example">
        <CleanupDemo />
        <CodeBlock>{cleanupCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="When useEffect is not needed">
        <p>
          If the only goal is to log a value that already causes the component
          to re-render, normal render code can show nearly the same behavior.
          The cleanup behavior is the part that only comes from the effect.
        </p>
        <CodeBlock>{renderCode}</CodeBlock>
      </LessonSection>
    </LessonPage>
  );
}

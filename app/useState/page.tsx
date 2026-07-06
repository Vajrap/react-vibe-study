"use client";

import { useState } from "react";
import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";

const code = `import { useState } from "react";

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`;

export default function UseStatePage() {
  const [count, setCount] = useState<number>(0);
  
  // if (count === 0) {
  //   const [test] = useState<string>('a');
  //   const [testB] = useState<string>('b');
  //   console.log(test);
  //   console.log(testB);
  // } else {
  //   const [testB] = useState<string>('b');
  //   const [test] = useState<string>('a');
  //   console.log(testB);
  //   console.log(test);
  // }

  return (
    <LessonPage
      title="useState"
      subtitle="A React component is just a JavaScript or TypeScript function with a specific signature: it returns React elements, commonly written as JSX."
    >
      <LessonSection title="What state is">
        <LessonList
          items={[
            "State is data that React remembers between renders.",
            "State is used for values that can change over time.",
            "When state changes, React re-renders the component.",
            "Example: isLoading starts true, becomes false after data finishes loading, and React re-renders so the UI can change.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Live example">
        <DemoPanel>
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
        </DemoPanel>
        <CodeBlock>{code}</CodeBlock>
      </LessonSection>
    </LessonPage>
  );
}

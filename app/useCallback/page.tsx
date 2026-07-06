"use client";

import { memo, useCallback, useState } from "react";
import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";

const callbackCode = `const handleClick = useCallback(() => {
  console.log("clicked");
}, []);`;

const fullCode = `import { memo, useCallback, useState } from "react";

const ChildButton = memo(function ChildButton({
  onClick,
}: {
  onClick: () => void;
}) {
  console.log("ChildButton rendered");

  return <button onClick={onClick}>Child button</button>;
});

export default function Demo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const increaseCount = useCallback(() => {
    setCount((currentCount) => currentCount + 1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />

      <ChildButton onClick={increaseCount} />
    </div>
  );
}`;

const ChildButton = memo(function ChildButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
      onClick={onClick}
    >
      Child button
    </button>
  );
});

export default function UseCallbackPage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const increaseCount = useCallback(() => {
    setCount((currentCount) => currentCount + 1);
  }, []);

  return (
    <LessonPage
      title="useCallback"
      subtitle="useMemo caches a calculated value. useCallback caches a function reference."
    >
      <LessonSection title="Function identity">
        <LessonList
          items={[
            "In JavaScript, functions are objects.",
            "Every time a component renders, a normal inline function creates a new function object.",
            "Render 1 can create function object A.",
            "Render 2 can create function object B.",
            "functionA === functionB is false.",
            "With useCallback and unchanged dependencies, React can reuse function object A.",
          ]}
        />
        <CodeBlock>{callbackCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="What useCallback does not do">
        <LessonList
          items={[
            "It does not remember the function result.",
            "It does not remember arguments passed into the function.",
            "It does not skip computation inside the function when the function is called.",
            "It is mainly about function identity, not function computation.",
          ]}
        />
      </LessonSection>

      <LessonSection title="memo background">
        <LessonList
          items={[
            "memo is not a hook.",
            "memo wraps a component and lets React skip rendering it when props are the same as the last render.",
            "memo compares props by value or reference.",
            "Primitive values like strings and numbers are easy to compare.",
            "Objects, arrays, and functions depend on reference identity.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Example">
        <DemoPanel>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Count: {count}</h2>
            <input
              className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Type your name"
            />
            <ChildButton onClick={increaseCount} />
          </div>
        </DemoPanel>
        <p>
          The code example shows the core pattern: memoized child plus stable
          callback. Use it when the child is actually expensive or callback
          identity is causing a real problem.
        </p>
        <CodeBlock>{fullCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="Be careful">
        <LessonList
          items={[
            "Do not use memo and useCallback everywhere by default.",
            "Ask whether the child component is actually expensive to render.",
            "Ask whether callback identity is actually causing a problem.",
            "If a function is huge, do not useCallback just because it is huge.",
            "If the function is called, all code inside still runs normally.",
            "For huge functions, consider splitting the function, memoizing expensive calculations, moving logic outside the component, using useReducer, or reducing component responsibilities.",
          ]}
        />
      </LessonSection>
    </LessonPage>
  );
}

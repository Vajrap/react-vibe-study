"use client";

import { useMemo, useState } from "react";
import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";

const code = `import { useMemo, useState } from "react";

export default function Demo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const expensiveValue = useMemo(() => {
    console.log("calculating expensive value");

    let result = 0;
    for (let i = 0; i < 50000; i++) {
      result += count;
    }

    return result;
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Expensive value: {expensiveValue}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increase count
      </button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
    </div>
  );
}`;

const selectedItemCode = `const selectedItem = useMemo(() => {
  return items.find((item) => item.isSelected);
}, [items]);`;

export default function UseMemoPage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const expensiveValue = useMemo(() => {
    console.log('calculating')
    let result = 0;
    for (let i = 0; i < 50000; i++) {
      result += count;
    }

    return result;
  }, [count]);

  return (
    <LessonPage
      title="useMemo"
      subtitle="useMemo lets React remember the result of a calculation between renders."
    >
      <LessonSection title="Memo behavior">
        <LessonList
          items={[
            "React stores the calculated value in a hook slot.",
            "On the next render, React checks the dependency array.",
            "If dependencies are the same, React reuses the old value.",
            "If dependencies changed, React recalculates the value.",
            "useMemo does not stop the component from re-rendering.",
            "It only prevents a specific calculation from running again when dependencies are unchanged.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Live example">
        <DemoPanel>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Count: {count}</h2>
            <p>Expensive value: {expensiveValue}</p>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => setCount(count + 1)}
              >
                Increase count
              </button>
              <input
                className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Type your name"
              />
            </div>
          </div>
        </DemoPanel>
        <p>
          Typing changes this component&apos;s state and causes a render, but
          the memoized calculation is reused while count stays the same.
          The loop is intentionally artificial so the example is visible.
        </p>
        <CodeBlock>{code}</CodeBlock>
      </LessonSection>

      <LessonSection title="When to use it">
        <LessonList
          items={[
            "Use it when the calculation is expensive enough to matter.",
            "Use it when keeping the same object or array reference is important.",
            "Do not use useMemo for every small calculation.",
            "useMemo is not free: React stores previous values, stores dependency arrays, compares dependencies, and keeps the memoized value in memory.",
            "Simple calculations like age >= 18 or firstName + ' ' + lastName are cheaper and clearer to calculate again.",
          ]}
        />
        <CodeBlock>{selectedItemCode}</CodeBlock>
      </LessonSection>
    </LessonPage>
  );
}

"use client";

import { useRef, useState } from "react";
import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";

const refCountCode = `import { useRef, useState } from "react";

export default function Demo() {
  const [renderCount, setRenderCount] = useState(0);
  const clickCountRef = useRef(0);

  function increaseRef() {
    clickCountRef.current += 1;
    console.log("ref count is", clickCountRef.current);
  }

  function forceRender() {
    setRenderCount(renderCount + 1);
  }

  return (
    <div>
      <h1>Ref count shown on screen: {clickCountRef.current}</h1>
      <p>Render count: {renderCount}</p>

      <button onClick={increaseRef}>Increase ref</button>
      <button onClick={forceRender}>Force re-render</button>
    </div>
  );
}`;

const focusCode = `import { useRef } from "react";

export default function FocusDemo() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus input</button>
    </div>
  );
}`;

export default function UseRefPage() {
  const [renderCount, setRenderCount] = useState(0);
  const [visibleRefCount, setVisibleRefCount] = useState(0);
  const clickCountRef = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function increaseRef() {
    clickCountRef.current += 1;
  }

  function forceRender() {
    setVisibleRefCount(clickCountRef.current);
    setRenderCount((currentRenderCount) => currentRenderCount + 1);
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <LessonPage
      title="useRef"
      subtitle="useRef creates a stable object with a .current property. Changing .current does not cause a re-render."
    >
      <LessonSection title="Main ideas">
        <LessonList
          items={[
            "useRef creates a stable reference object.",
            "The object has a .current property.",
            "React keeps the same ref object between renders.",
            "Changing .current does not cause a re-render.",
            "Common uses are accessing DOM elements and storing non-rendering values.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Ref value example">
        <DemoPanel>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">
              Ref count shown on screen: {visibleRefCount}
            </h2>
            <p>Render count: {renderCount}</p>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={increaseRef}
              >
                Increase ref
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={forceRender}
              >
                Force re-render
              </button>
            </div>
          </div>
        </DemoPanel>
        <CodeBlock>{refCountCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="DOM element example">
        <DemoPanel>
          <div className="flex flex-wrap gap-3">
            <input
              ref={inputRef}
              className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2"
              placeholder="Focus me with the button"
            />
            <button
              className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
              onClick={focusInput}
            >
              Focus input
            </button>
          </div>
        </DemoPanel>
        <LessonList
          items={[
            "inputRef starts as { current: null }.",
            "After React creates the real input DOM node, React puts that DOM node into inputRef.current.",
            "Then we can call inputRef.current.focus().",
            "Normally React controls the DOM for us, but sometimes we need direct access for focus, scrolling, or measuring size.",
          ]}
        />
        <CodeBlock>{focusCode}</CodeBlock>
      </LessonSection>
    </LessonPage>
  );
}

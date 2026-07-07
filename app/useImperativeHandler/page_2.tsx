"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";

type SearchBoxHandle = {
  clear: () => void;
  fill: (value: string) => void;
  focus: () => void;
};

const SearchBox = forwardRef<SearchBoxHandle>(function SearchBox(_, ref) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      setText("");
    },
    fill(value) {
      setText(value);
    },
    focus() {
      inputRef.current?.focus();
    },
  }));

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type something"
      />
      <p>Child value: {text}</p>
    </div>
  );
});

export default function UseImperativeHandlerFinalPage() {
  const searchBoxRef = useRef<SearchBoxHandle | null>(null);

  return (
    <LessonPage
      title="useImperativeHandle"
      subtitle="Final guide version: the parent has buttons, while the child owns the field state."
    >
      <LessonSection title="Teaching path">
        <LessonList
          items={[
            "Start with the normal React idea: keep state in the parent when parent buttons need to control it.",
            "Point out that if the parent state becomes complex, useReducer is often the better React-shaped answer.",
            "Then introduce the exception: sometimes the state must live inside a child, external component, or library widget.",
            "Name the design smell first. If normal props and state are possible, prefer them.",
            "Use useImperativeHandle only when the parent needs a small command API for a child-owned thing.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Final shape">
        <DemoPanel>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => searchBoxRef.current?.clear()}
              >
                Clear
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => searchBoxRef.current?.fill("Hello")}
              >
                Fill
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => searchBoxRef.current?.focus()}
              >
                Focus
              </button>
            </div>

            <SearchBox ref={searchBoxRef} />
          </div>
        </DemoPanel>
      </LessonSection>
    </LessonPage>
  );
}

"use client";

import { useImperativeHandle, useRef, useState } from "react";
import { DemoPanel, LessonPage, LessonSection } from "../components/LessonPage";

type SearchBoxHandle = {
  clear: () => void;
  fill: () => void;
};

type SearchBoxProps = {
  ref: React.Ref<SearchBoxHandle>;
};

function SearchBox({ ref }: SearchBoxProps) {
  const [text, setText] = useState("");

  useImperativeHandle(ref, () => ({
    clear() {
      setText("");
    },
    fill() {
      setText("filled");
    },
  }));

  return (
    <input
      className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2"
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder="Type something"
    />
  );
}

export default function UseImperativeHandlerPage() {
  const ref = useRef<SearchBoxHandle | null>(null);

  return (
    <LessonPage
      title="useImperativeHandle"
      subtitle="A live coding session starter. Parent buttons control a child field first, then we move the state down into the child."
    >
      <LessonSection title="Search box">
        <DemoPanel>
          <div className="space-y-4">
            <SearchBox ref={ref} />

            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => ref.current?.clear()}
              >
                Clear
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => ref.current?.fill()}
              >
                Fill
              </button>
            </div>
          </div>
        </DemoPanel>
      </LessonSection>
    </LessonPage>
  );
}

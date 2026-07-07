"use client";

import { useState } from "react";
import { DemoPanel, LessonPage, LessonSection } from "../components/LessonPage";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBox(props: SearchBoxProps) {
  return (
    <input
      className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2"
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder="Type something"
    />
  );
}

export default function UseImperativeHandlerPage() {
  const [text, setText] = useState("");

  return (
    <LessonPage
      title="useImperativeHandle"
      subtitle="A live coding session starter. Parent buttons control a child field first, then we move the state down into the child."
    >
      <LessonSection title="Search box">
        <DemoPanel>
          <div className="space-y-4">
            <SearchBox value={text} onChange={setText} />

            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => setText("")}
              >
                Clear
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => setText("Hello")}
              >
                Fill
              </button>
            </div>

            <p>Value: {text}</p>
          </div>
        </DemoPanel>
      </LessonSection>
    </LessonPage>
  );
}

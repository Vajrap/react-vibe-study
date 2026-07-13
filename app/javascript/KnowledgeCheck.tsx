"use client";

import { useState } from "react";

type KnowledgeCheckProps = {
  question: string;
  code?: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export function KnowledgeCheck({
  question,
  code,
  choices,
  answer,
  explanation,
}: KnowledgeCheckProps) {
  const [selection, setSelection] = useState<number | null>(null);
  const isAnswered = selection !== null;
  const isCorrect = selection === answer;

  return (
    <section className="border-y border-amber-300 bg-amber-50 px-5 py-6 sm:px-7">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
        Check your model
      </p>
      <h2 className="mt-2 text-xl font-bold text-zinc-950">{question}</h2>
      {code ? (
        <pre className="mt-4 overflow-x-auto bg-zinc-950 p-4 text-sm leading-6 text-zinc-50">
          <code>{code}</code>
        </pre>
      ) : null}
      <div className="mt-4 grid gap-2">
        {choices.map((choice, index) => {
          const selected = selection === index;
          const answerClass = isAnswered
            ? index === answer
              ? "border-emerald-600 bg-emerald-50 text-emerald-950"
              : selected
                ? "border-red-500 bg-red-50 text-red-950"
                : "border-zinc-200 bg-white text-zinc-500"
            : "border-zinc-300 bg-white text-zinc-800 hover:border-amber-600";

          return (
            <button
              key={choice}
              type="button"
              className={`min-h-12 border px-4 py-3 text-left text-sm font-medium transition ${answerClass}`}
              onClick={() => setSelection(index)}
              disabled={isAnswered}
            >
              <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
              {choice}
            </button>
          );
        })}
      </div>
      {isAnswered ? (
        <div
          role="status"
          className={`mt-4 border-l-4 px-4 py-3 text-sm leading-6 ${
            isCorrect
              ? "border-emerald-600 bg-emerald-100 text-emerald-950"
              : "border-red-500 bg-red-100 text-red-950"
          }`}
        >
          <p className="font-bold">{isCorrect ? "Correct." : "Not quite."}</p>
          <p>{explanation}</p>
          <button
            type="button"
            className="mt-2 text-sm font-bold underline underline-offset-4"
            onClick={() => setSelection(null)}
          >
            Try again
          </button>
        </div>
      ) : null}
    </section>
  );
}

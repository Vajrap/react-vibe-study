"use client";

import { Activity, useCallback, useEffect, useState } from "react";

function PreservedCounter({ onEvent }: { onEvent: (event: string) => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onEvent("Effect setup");
    return () => onEvent("Effect cleanup");
  }, [onEvent]);

  return (
    <div className="border-l-4 border-emerald-600 bg-emerald-50 p-4">
      <p className="text-lg font-bold text-zinc-950">Preserved count: {count}</p>
      <button
        type="button"
        className="mt-3 border border-emerald-700 bg-white px-3 py-2 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
        onClick={() => setCount((current) => current + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export function ActivityDemo() {
  const [isVisible, setIsVisible] = useState(true);
  const [events, setEvents] = useState<string[]>([]);
  const recordEvent = useCallback((event: string) => {
    setEvents((current) => [...current.slice(-3), event]);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_14rem]">
      <div>
        <button
          type="button"
          className="mb-4 border border-teal-700 bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800"
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? "Hide activity" : "Show activity"}
        </button>

        <Activity mode={isVisible ? "visible" : "hidden"}>
          <PreservedCounter onEvent={recordEvent} />
        </Activity>

        {!isVisible ? (
          <p className="border border-dashed border-zinc-400 p-4 text-sm text-zinc-600">
            The Activity is hidden. Its state is retained while its Effects are
            cleaned up.
          </p>
        ) : null}
      </div>

      <div className="bg-zinc-950 p-4 text-zinc-100">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
          Effect log
        </p>
        <ol className="mt-3 space-y-2 font-mono text-xs">
          {events.length > 0 ? (
            events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)
          ) : (
            <li>Waiting for Effect...</li>
          )}
        </ol>
      </div>
    </div>
  );
}

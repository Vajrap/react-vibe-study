"use client";

import { useState } from "react";
import { DemoPanel, LessonPage, LessonSection } from "../components/LessonPage";

type SelectedPage = "about" | "note" | "posts";

type Post = {
  id: number;
  title: string;
  body: string;
};

function sleepOneMillisecond() {
  const start = performance.now();

  while (performance.now() - start < 1) {
    // Intentionally slow for the useTransition lesson.
  }
}

function createSlowPosts() {
  return Array.from({ length: 1000 }, (_, index): Post => {
    sleepOneMillisecond();

    return {
      id: index + 1,
      title: `Post ${index + 1}`,
      body: `This post was created slowly so the page switch feels blocked.`,
    };
  });
}

function About() {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">About</h2>
      <p>This is a small page with simple content.</p>
    </div>
  );
}

function Note() {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">Note</h2>
      <p>Use this page to compare a fast update against the slow posts page.</p>
    </div>
  );
}

function Posts() {
  const posts = createSlowPosts();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Posts</h2>
      <ul className="max-h-96 space-y-3 overflow-auto pr-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="rounded border border-zinc-200 bg-white p-3"
          >
            <h3 className="font-semibold text-zinc-950">{post.title}</h3>
            <p className="text-sm text-zinc-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function UseTransitionPage() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>("about");

  return (
    <LessonPage
      title="useTransition"
      subtitle="A live coding session starter. Switch pages normally first, then use transition for the slow posts update."
    >
      <LessonSection title="Page switcher">
        <DemoPanel>
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
                onClick={() => setSelectedPage("about")}
              >
                About
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => setSelectedPage("note")}
              >
                Note
              </button>
              <button
                className="rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white"
                onClick={() => setSelectedPage("posts")}
              >
                Posts
              </button>
            </div>

            {selectedPage === "about" ? <About /> : null}
            {selectedPage === "note" ? <Note /> : null}
            {selectedPage === "posts" ? <Posts /> : null}
          </div>
        </DemoPanel>
      </LessonSection>
    </LessonPage>
  );
}

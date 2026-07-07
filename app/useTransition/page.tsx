"use client";

import { useState, useTransition } from "react";
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
  return Array.from({ length: 1000 }, (_, index): Post => ({
    id: index + 1,
    title: `Post ${index + 1}`,
    body: `This post renders slowly so the page switch can be interrupted.`,
  }));
}

const posts = createSlowPosts();

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
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Posts</h2>
      <ul className="max-h-96 space-y-3 overflow-auto pr-2">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

function PostItem({ post }: { post: Post }) {
  sleepOneMillisecond();

  return (
    <li className="rounded border border-zinc-200 bg-white p-3">
      <h3 className="font-semibold text-zinc-950">{post.title}</h3>
      <p className="text-sm text-zinc-700">{post.body}</p>
    </li>
  );
}

const selectedPageClass =
  "rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800";
const unselectedPageClass =
  "rounded border border-teal-700 px-4 py-2 font-semibold text-teal-800 hover:bg-white";

export default function UseTransitionPage() {
  const [activePage, setActivePage] = useState<SelectedPage>("about");
  const [selectedPage, setSelectedPage] = useState<SelectedPage>("about");
  const [isPending, startTransition] = useTransition();

  function handleChangePage(page: SelectedPage) {
    setActivePage(page);

    startTransition(() => {
      setSelectedPage(page);
    });
  }

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
                className={
                  activePage === "about"
                    ? selectedPageClass
                    : unselectedPageClass
                }
                onClick={() => handleChangePage("about")}
              >
                About
              </button>
              <button
                className={
                  activePage === "note"
                    ? selectedPageClass
                    : unselectedPageClass
                }
                onClick={() => handleChangePage("note")}
              >
                Note
              </button>
              <button
                className={
                  activePage === "posts"
                    ? selectedPageClass
                    : unselectedPageClass
                }
                onClick={() => handleChangePage("posts")}
              >
                Posts
              </button>
            </div>

            {isPending ? (
              <p className="text-sm font-semibold text-teal-800">
                Switching page...
              </p>
            ) : null}
            {selectedPage === "about" ? <About /> : null}
            {selectedPage === "note" ? <Note /> : null}
            {selectedPage === "posts" ? <Posts /> : null}
          </div>
        </DemoPanel>
      </LessonSection>
    </LessonPage>
  );
}

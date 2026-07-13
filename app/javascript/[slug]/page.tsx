import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JavaScriptLessonPage } from "../JavaScriptLessonPage";
import { getJavaScriptLesson, javascriptLessons } from "../course";

type LessonRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return javascriptLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: LessonRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getJavaScriptLesson(slug);

  return lesson
    ? { title: `${lesson.title} | JavaScript Foundations`, description: lesson.summary }
    : {};
}

export default async function LessonRoute({ params }: LessonRouteProps) {
  const { slug } = await params;
  const lesson = getJavaScriptLesson(slug);

  if (!lesson) {
    notFound();
  }

  return <JavaScriptLessonPage lesson={lesson} />;
}

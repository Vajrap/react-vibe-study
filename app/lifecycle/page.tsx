import { LessonList, LessonPage, LessonSection } from "../components/LessonPage";

export default function LifecyclePage() {
  return (
    <LessonPage
      title="React Life Cycle"
      subtitle="React components move through mount, update, and unmount. The component function runs during mount and update; effects run around the DOM commit and browser paint."
    >
      <LessonSection title="Mount">
        <LessonList
          items={[
            "React calls the component function for the first time.",
            "All normal code inside the function body runs.",
            "Values are created for this render: const, let, var, useState initial state, and first useMemo calculations.",
            "The component returns React elements describing the UI.",
            "React builds an internal UI tree, then commits the needed DOM nodes to the actual DOM.",
            "useLayoutEffect runs after the DOM update but before browser paint.",
            "The browser paints the UI.",
            "useEffect runs after paint.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Update">
        <LessonList
          items={[
            "Something React tracks changes: state, props, context, or a parent render.",
            "React calls the component function again.",
            "All normal code inside the function body runs again.",
            "Normal variables are recreated, state gives the latest stored value, and useMemo recalculates only when dependencies changed.",
            "The component returns a new React element tree.",
            "React compares the new internal tree with the previous tree.",
            "React commits only the necessary real DOM changes.",
            "useLayoutEffect cleanup runs, then the new useLayoutEffect runs before paint.",
            "The browser paints the updated UI.",
            "useEffect cleanup runs, then the new useEffect runs after paint.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Unmount">
        <LessonList
          items={[
            "The component is removed from the React tree.",
            "React removes the component's rendered DOM nodes from the actual DOM.",
            "useLayoutEffect cleanup runs during the commit phase.",
            "useEffect cleanup runs after the commit.",
            "The component's state and memoized values are discarded.",
            "JavaScript may later garbage-collect old values from memory.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Teaching summary">
        <LessonList
          items={[
            "A React component is just a function.",
            "The function runs during mount and update.",
            "Every time it runs, normal variables are recreated.",
            "React has an internal system running behind the component.",
            "Hooks are how the component connects to that React system.",
          ]}
        />
      </LessonSection>
    </LessonPage>
  );
}

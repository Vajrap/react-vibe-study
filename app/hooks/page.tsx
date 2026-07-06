import { LessonList, LessonPage, LessonSection } from "../components/LessonPage";

export default function HooksPage() {
  return (
    <LessonPage
      title="Hooks"
      subtitle="Hooks are the bridge between our component function and React's hidden manager."
    >
      <LessonSection title="Hook storage">
        <LessonList
          items={[
            "React stores hook data outside the component function.",
            "Each hook gets a slot.",
            "React knows which slot to use by hook call order.",
            "First hook call equals slot 0.",
            "Second hook call equals slot 1.",
            "Third hook call equals slot 2.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Rules that come from slots">
        <LessonList
          items={[
            "Hooks must be called at the top level of the component.",
            "Do not call hooks inside if, for, while, or nested functions.",
            "React depends on hook call order staying the same between renders.",
          ]}
        />
      </LessonSection>
    </LessonPage>
  );
}

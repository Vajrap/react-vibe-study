import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";
import { ActivityDemo } from "./ActivityDemo";

const exampleCode = `<Activity mode={isVisible ? "visible" : "hidden"}>
  <Sidebar />
</Activity>`;

export default function ActivityPage() {
  return (
    <LessonPage
      title="Activity"
      subtitle="React 19.2 can hide a subtree, clean up its Effects, and restore it later with state preserved."
    >
      <LessonSection title="Hidden is not discarded">
        <LessonList
          items={[
            "visible shows the children and runs their Effects normally.",
            "hidden uses display: none, cleans up Effects, and retains component state.",
            "Showing the Activity again restores its previous state and sets up its Effects again.",
            "Hidden children may still receive lower-priority rendering work from new props.",
          ]}
        />
        <CodeBlock>{exampleCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="State and Effect lifetime">
        <DemoPanel>
          <ActivityDemo />
        </DemoPanel>
        <p>
          Increment the counter, hide it, and show it again. The count survives,
          while the Effect log records cleanup and setup around visibility.
        </p>
      </LessonSection>

      <LessonSection title="When to use Activity">
        <LessonList
          items={[
            "Preserve temporary UI state for tabs, sidebars, or screens the user is likely to revisit.",
            "Pre-render likely next content at lower priority before making it visible.",
            "Do not use it when hidden content should be destroyed and reset completely.",
            "DOM elements with their own side effects, such as video or iframe, may still require explicit Effect cleanup.",
          ]}
        />
      </LessonSection>
    </LessonPage>
  );
}

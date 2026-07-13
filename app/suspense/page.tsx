import {
  CodeBlock,
  DemoPanel,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";
import { SuspenseDemo } from "./SuspenseDemo";

const exampleCode = `const Profile = lazy(() => import("./Profile"));

export default function Page() {
  return (
    <Suspense fallback={<LoadingProfile />}>
      <Profile />
    </Suspense>
  );
}`;

export default function SuspensePage() {
  return (
    <LessonPage
      title="Suspense"
      subtitle="Show a fallback while a child is not ready, then let React retry the suspended tree."
    >
      <LessonSection title="The boundary">
        <LessonList
          items={[
            "A child suspends while rendering because required code or Suspense-enabled data is not ready.",
            "React finds the closest Suspense boundary and renders its fallback.",
            "When the requirement becomes ready, React retries the suspended content.",
            "Suspense coordinates a loading boundary; it does not catch event-handler or Effect errors.",
          ]}
        />
        <CodeBlock>{exampleCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="Live lazy-loading example">
        <DemoPanel>
          <SuspenseDemo />
        </DemoPanel>
        <p>
          Each button selects a lazily loaded component for the first time. The
          closest boundary shows its fallback while the module Promise is
          pending, then React retries and reveals the component.
        </p>
      </LessonSection>

      <LessonSection title="Important limits">
        <LessonList
          items={[
            "Suspense works with lazy-loaded code, Suspense-enabled frameworks, and supported Promise reading with use.",
            "Fetching inside useEffect does not activate a Suspense fallback.",
            "A boundary should match a meaningful loading sequence, not wrap every individual component.",
            "If already visible content suspends again, a Transition or deferred value can help avoid replacing it with a fallback.",
          ]}
        />
      </LessonSection>
    </LessonPage>
  );
}

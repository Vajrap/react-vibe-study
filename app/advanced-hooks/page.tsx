import { LessonList, LessonPage, LessonSection } from "../components/LessonPage";

export default function AdvancedHooksPage() {
  return (
    <LessonPage
      title="Advanced Hooks"
      subtitle="These hooks are useful, but they are not the first tools to reach for. Use them when their timing or escape-hatch behavior is specifically needed."
    >
      <LessonSection title="Quick map">
        <LessonList
          items={[
            "useLayoutEffect is like useEffect, but it runs before browser paint. Use it for layout measurement or visual correction. Prefer useEffect unless you really need this timing.",
            "useTransition marks some state updates as non-urgent. It is useful when one update should stay responsive while another update is heavy, such as an input updating immediately while a huge list updates later.",
            "useDeferredValue lets a value lag behind. It is in the same family as useTransition and is useful for expensive UI based on fast-changing values.",
            "useImperativeHandle lets a child expose methods to a parent through a ref. It is an escape hatch. Prefer props and state unless direct commands make sense.",
          ]}
        />
      </LessonSection>
    </LessonPage>
  );
}

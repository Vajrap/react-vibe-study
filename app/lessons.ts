export type LessonLink = {
  href: string;
  title: string;
  summary: string;
  tag: string;
};

export const lessons: LessonLink[] = [
  {
    href: "/lifecycle",
    title: "React Life Cycle",
    summary: "Mount, update, unmount, and where effects fit.",
    tag: "model",
  },
  {
    href: "/hooks",
    title: "Hooks",
    summary: "Hook slots, call order, and why hooks stay top-level.",
    tag: "model",
  },
  {
    href: "/useState",
    title: "useState",
    summary: "Remember data between renders and re-render when it changes.",
    tag: "core hook",
  },
  {
    href: "/useReducer",
    title: "useReducer",
    summary: "Start with a simple count before converting it to a reducer.",
    tag: "core hook",
  },
  {
    href: "/useEffect",
    title: "useEffect",
    summary: "Run code after render when watched values change.",
    tag: "core hook",
  },
  {
    href: "/cleanup",
    title: "Cleanup Function",
    summary: "Undo the previous effect before the next one or unmount.",
    tag: "effect",
  },
  {
    href: "/useRef",
    title: "useRef",
    summary: "Keep a stable object for DOM access and non-rendering values.",
    tag: "core hook",
  },
  {
    href: "/useMemo",
    title: "useMemo",
    summary: "Cache expensive calculated values while dependencies stay equal.",
    tag: "performance",
  },
  {
    href: "/useCallback",
    title: "useCallback",
    summary: "Cache function identity for memoized children or stable props.",
    tag: "performance",
  },
  {
    href: "/useTransition",
    title: "useTransition",
    summary:
      "Switch between simple pages and an intentionally slow posts page.",
    tag: "performance",
  },
  {
    href: "/useImperativeHandler",
    title: "useImperativeHandle",
    summary:
      "Start with parent buttons and a child input before moving control into the child.",
    tag: "advanced",
  },
  {
    href: "/useContext",
    title: "useContext",
    summary:
      "A guided coding session for creating context and sharing sorted score lists.",
    tag: "context",
  },
  {
    href: "/advanced-hooks",
    title: "Advanced Hooks",
    summary:
      "A quick map of layout, transition, deferred, and imperative hooks.",
    tag: "advanced",
  },
  {
    href: "/homework",
    title: "Homework",
    summary:
      "Product search practice for state, effects, cleanup, refs, and memo.",
    tag: "practice",
  },
  {
    href: "/homework-atom",
    title: "Homework Atom",
    summary: "Atom's home work",
    tag: "practice",
  },
  {
    href: "/homework-cream/HelpDeskConsolePage",
    title: "Homework Cream",
    summary: "Cream's home work",
    tag: "practice",
  },
];

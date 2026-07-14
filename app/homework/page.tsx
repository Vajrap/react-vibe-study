import Link from "next/link";
import {
  CodeBlock,
  LessonList,
  LessonPage,
  LessonSection,
} from "../components/LessonPage";
import { Stack } from "@mui/material";

const dataCode = `type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const products: Product[] = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: \`Product \${index + 1}\`,
  category: index % 2 === 0 ? "Book" : "Toy",
  price: Math.floor(Math.random() * 1000),
}));`;

const memoCode = `const filteredProducts = useMemo(() => {
  console.log("filtering products");
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
}, [searchText]);`;

const refCode = `const inputRef = useRef<HTMLInputElement | null>(null);`;

const titleCode = `useEffect(() => {
  document.title = searchText
    ? \`Search: \${searchText}\`
    : "Product Search";
}, [searchText]);`;

const cleanupCode = `useEffect(() => {
  const id = setInterval(() => {
    console.log("ProductSearchPage is still mounted");
  }, 2000);

  return () => {
    console.log("cleaning up interval");
    clearInterval(id);
  };
}, []);`;

export default function HomeworkPage() {
  return (
    <LessonPage
      title="Homework: Product Search + Hooks Practice"
      subtitle="Build one focused page called ProductSearchPage. This should fit around 2 hours and practice useState, useEffect, cleanup, useRef, useMemo, and render behavior."
    >
      <LessonSection title="Starter route">
        <p>
          Open the starter at{" "}
          <Link
            href="/homework/ProductSearchPage"
            className="font-semibold text-teal-700 underline"
          >
            /homework/ProductSearchPage
          </Link>
          . It has the product data, the parent show/hide page, and a working
          reference shape she can compare against while practicing.
        </p>
      </LessonSection>

      <LessonSection title="Data">
        <CodeBlock>{dataCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="Requirements">
        <LessonList
          items={[
            "Search with useState: create an input, update searchText while typing, and show products whose name includes searchText.",
            "Filter with useMemo: put the product filtering inside useMemo, log 'filtering products', and depend on searchText.",
            "Show only the first 50 products using filteredProducts.slice(0, 50).",
            "Focus the input with useRef: add a Focus search input button and call inputRef.current?.focus().",
            "Use useEffect for document.title: when searchText changes, update the browser tab title.",
            "Practice cleanup: add an interval effect that logs while mounted and clears the interval when unmounted.",
            "Use the parent show/hide button to unmount ProductSearchPage and confirm the cleanup log appears.",
          ]}
        />
      </LessonSection>

      <LessonSection title="Required snippets">
        <CodeBlock>{memoCode}</CodeBlock>
        <CodeBlock>{refCode}</CodeBlock>
        <CodeBlock>{titleCode}</CodeBlock>
        <CodeBlock>{cleanupCode}</CodeBlock>
      </LessonSection>

      <LessonSection title="Questions to answer">
        <LessonList
          items={[
            'When typing in the search input, why does "filtering products" log?',
            "When clicking Focus search input, does the component re-render?",
            "What does useMemo prevent here?",
            "Why is document.title a better useEffect example than console.log(count)?",
            "When does the cleanup function run?",
          ]}
        />
      </LessonSection>
    </LessonPage>
  );
}

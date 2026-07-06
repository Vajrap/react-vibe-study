"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const products: Product[] = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  category: index % 2 === 0 ? "Book" : "Toy",
  price: Math.floor(Math.random() * 1000),
}));

export default function ProductSearchHomeworkRoute() {
  const [isShowingProductSearch, setIsShowingProductSearch] = useState(true);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-8 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-5">
        <div>
          <Link
            href="/homework"
            className="text-sm font-semibold text-teal-700 underline"
          >
            Back to homework
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-zinc-950">
            Product Search Homework
          </h1>
        </div>

        <button
          className="rounded bg-zinc-950 px-4 py-2 font-semibold text-white hover:bg-zinc-800"
          onClick={() =>
            setIsShowingProductSearch((currentIsShowing) => !currentIsShowing)
          }
        >
          {isShowingProductSearch ? "Hide" : "Show"} ProductSearchPage
        </button>
      </div>

      {isShowingProductSearch ? (
        <ProductSearchPage />
      ) : (
        <div className="rounded border border-dashed border-zinc-300 p-8 text-zinc-600">
          ProductSearchPage is unmounted. Check the console for the cleanup
          message.
        </div>
      )}
    </main>
  );
}

function ProductSearchPage() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredProducts = useMemo(() => {
    if (typeof window !== "undefined") {
      console.log("filtering products");
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  useEffect(() => {
    document.title = searchText ? `Search: ${searchText}` : "Product Search";
  }, [searchText]);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("ProductSearchPage is still mounted");
    }, 2000);

    return () => {
      console.log("cleaning up interval");
      clearInterval(id);
    };
  }, []);

  function focusSearchInput() {
    inputRef.current?.focus();
  }

  const visibleProducts = filteredProducts.slice(0, 50);

  return (
    <section className="space-y-5 rounded border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-zinc-700">Search</span>
          <input
            ref={inputRef}
            className="w-72 max-w-full rounded border border-zinc-300 px-3 py-2"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search product name"
          />
        </label>

        <button
          className="rounded bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
          onClick={focusSearchInput}
        >
          Focus search input
        </button>
      </div>

      <div className="text-sm text-zinc-600">
        Showing {visibleProducts.length} of {filteredProducts.length} matching
        products.
      </div>

      <ul className="grid gap-2">
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            className="grid gap-1 rounded border border-zinc-200 p-3 sm:grid-cols-[1fr_auto_auto] sm:items-center"
          >
            <span className="font-semibold text-zinc-950">{product.name}</span>
            <span className="text-sm text-zinc-600">{product.category}</span>
            <span className="text-sm font-semibold text-zinc-800">
              #{product.id}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

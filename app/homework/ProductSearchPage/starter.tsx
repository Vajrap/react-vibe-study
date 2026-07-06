"use client";

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

export default function ProductSearchPage() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredProducts = useMemo(() => {
    console.log("filtering products");

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
    <section>
      {/* TODO: Build the UI:
        1. Search input connected to searchText.
        2. Focus search input button.
        3. Product count.
        4. First 50 matching products.
      */}
      <input
        ref={inputRef}
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search product name"
      />

      <button onClick={focusSearchInput}>Focus search input</button>

      <p>
        Showing {visibleProducts.length} of {filteredProducts.length} matching
        products.
      </p>

      <ul>
        {visibleProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.category}
          </li>
        ))}
      </ul>
    </section>
  );
}

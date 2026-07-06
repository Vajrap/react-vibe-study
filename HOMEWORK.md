# Homework: Product Search + Hooks Practice

Build one page called `ProductSearchPage`.

This homework should fit around 2 hours. It practices:

- `useState`
- `useEffect`
- cleanup functions
- `useRef`
- `useMemo`
- render behavior

## Data

```tsx
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
```

## Requirements

1. Search with `useState`

Create an input. When the user types, update `searchText`.

Show products whose name includes `searchText`.

2. Filter with `useMemo`

Use `useMemo` for filtered products.

```tsx
const filteredProducts = useMemo(() => {
  console.log("filtering products");
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
}, [searchText]);
```

Show only the first 50 products:

```tsx
filteredProducts.slice(0, 50);
```

3. Focus input with `useRef`

Add a button:

```text
Focus search input
```

When clicked, focus the input.

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

4. `useEffect`: document title

When `searchText` changes, update the browser tab title.

```tsx
useEffect(() => {
  document.title = searchText ? `Search: ${searchText}` : "Product Search";
}, [searchText]);
```

5. Cleanup practice

Add this effect:

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("ProductSearchPage is still mounted");
  }, 2000);

  return () => {
    console.log("cleaning up interval");
    clearInterval(id);
  };
}, []);
```

Then create a parent page that can show/hide `ProductSearchPage`.

When hiding it, you should see:

```text
cleaning up interval
```

## Questions

1. When typing in the search input, why does `"filtering products"` log?
2. When clicking `Focus search input`, does the component re-render?
3. What does `useMemo` prevent here?
4. Why is `document.title` a better `useEffect` example than `console.log(count)`?
5. When does the cleanup function run?

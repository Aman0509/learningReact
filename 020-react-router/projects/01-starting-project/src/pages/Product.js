import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product One" },
  { id: "p2", title: "Product Two" },
  { id: "p3", title: "Product Three" },
];

export default function ProductPage() {
  return (
    <>
      <h1>Product Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <Link to={`/products/${prod.id}`}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

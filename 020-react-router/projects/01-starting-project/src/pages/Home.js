import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate("/products");
  }
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="products"> the list of products</Link>.{" "}
        {/*change to relative path */}
      </p>
      <button onClick={navigateHandler}>Navigate</button>
    </>
  );
}

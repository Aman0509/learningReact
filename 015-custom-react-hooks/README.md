# Building Custom React Hooks

| Contents                                                                                                                       |
| :----------------------------------------------------------------------------------------------------------------------------- |
| [Revisiting the "Rules of Hooks" & Introduction to Custom Hooks](#revisiting-the-rules-of-hooks--introduction-to-custom-hooks) |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Revisiting the "Rules of Hooks" & Introduction to Custom Hooks

We have earlier learnt about below 2 hook rules:

**1. Use Hooks Only Inside React Component Functions:** Hooks should only be used inside React component functions.

**2. Do Not Nest Hooks:** Hooks must not be placed inside conditional statements, loops, or nested functions. This rule ensures that hooks are called in the same order on every render, which is crucial for React’s hooks mechanism to work correctly.

Since now, we are talking about custom hooks, rule 1 can be extended.

Hooks can also be used inside custom hooks, not just component functions. This flexibility allows for the creation of custom hooks, enhancing code reusability.

### What are Custom Hooks?

Custom hooks are JavaScript functions that start with "use" and allow you to reuse stateful logic across multiple React components. They enable the sharing of logic that involves hooks (like `useState`, `useEffect`, etc.) without needing to use higher-order components (HOCs) or render props.

Unlike normal functions, custom hooks can use other hooks and manage state, ensuring that all the features available in component functions are maintained.

### Why use Custom Hooks?

**Code Reusability**

- Custom hooks encapsulate logic that can be reused across different components, reducing code duplication and enhancing maintainability.
- For example, if multiple components need to fetch data from an API and manage loading and error states, a custom hook can encapsulate this logic.

**Separation of Concerns**

- Custom hooks help in separating concerns by moving complex logic out of the components, allowing components to focus on rendering UI.
- This separation makes components simpler, easier to read, and easier to test.

**Encapsulation**

- Custom hooks encapsulate related stateful logic and side effects. This encapsulation hides the complexity and makes the components that use the custom hook cleaner and more focused on their primary responsibilities.

**Flexibility**

- Custom hooks provide the flexibility to extract and reuse non-visual logic in a way that ensures hooks are used in valid places, preserving the rules of hooks.
- They allow developers to create modular and maintainable code by reusing logic that doesn't belong in a single component.

**Example Use Case**

Consider a scenario where multiple components need to fetch data from an API, handle loading states, and manage errors. Instead of duplicating this logic in each component, a custom hook can be created:

```javascript
import { useState, useEffect } from "react";

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

This custom hook (`useFetchData`) can then be used in multiple components:

```javascript
function ComponentA() {
  const { data, loading, error } = useFetchData(
    "https://api.example.com/dataA"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
}

function ComponentB() {
  const { data, loading, error } = useFetchData(
    "https://api.example.com/dataB"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
```

Readings:

- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Custom React JS Hooks: What Are They and When to Use Them?](https://www.turing.com/blog/custom-react-js-hooks-how-to-use)
- [A Guide to React Custom Hooks](https://dev.to/rasaf_ibrahim/a-guide-to-react-custom-hooks-2b4h)
- [How to Build Your Own React Hooks: A Step-by-Step Guide](https://www.freecodecamp.org/news/how-to-create-react-hooks/)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Sending HTTP Requests](../014-sending-http-requests/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

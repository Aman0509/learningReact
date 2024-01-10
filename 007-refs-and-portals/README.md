# Working with Refs & Portals

| Contents                              |
| :------------------------------------ |
| [Introducing Refs](#introducing-refs) |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Introducing Refs

Refs in React are short for references. As the name suggests, they allow you to reference and interact with DOM nodes or React components directly. Refs come in handy when you need to reference some information in a component, but you don’t want that information to trigger new renders.

**What Refs Are:**

- **Special Values:** Refs are special values in React that allow you to directly access DOM elements or React components.

- **Created with [`useRef`](https://react.dev/reference/react/useRef) Hook:** You create a ref using the `useRef` hook, which returns a mutable ref object:

  ```javascript
  const inputRef = useRef(null);
  ```

- `current` Property: The value of a ref is always an object with a `current` property holding the actual element or component instance. You can access the current value of that ref through the `inputRef.current` property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track.

- **Attached to Elements with `ref` Prop:** You attach a ref to a JSX element using the `ref` prop:

  ```javascript
  <input type="text" ref={inputRef} />
  ```

- **Not for State Management:** Refs should primarily be used for direct DOM manipulation or integrating with third-party libraries. Use state for data that drives UI updates.

Here's a basic example illustrating how refs work in React:

```javascript
import React, { useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);
  const [displayText, setDisplayText] = useState("");

  const handleButtonClick = () => {
    setDisplayText(inputRef.current.value);
  };

  return (
    <div>
      <h1>Display Text Example</h1>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={handleButtonClick}>Display Text</button>
      {displayText && <h2>Text entered: {displayText}</h2>}
    </div>
  );
}

export default App;
```

In this example:

- We have an input field that captures user input.
- When the button is clicked (`handleButtonClick`), it sets the `displayText` state to the value entered in the input field (`inputRef.current.value`).
- The `displayText` is displayed in an `<h2>` element if it exists (i.e., if there is text entered in the input field).

Readings:

- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [React Refs – A Complete Guide](https://codedamn.com/news/reactjs/react-refs-a-complete-guide)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Debugging React Apps](../006-debugging-react-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

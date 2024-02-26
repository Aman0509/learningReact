# Practice Project: Project Management App

1. [Add Project (Boilerplate)](https://github.com/Aman0509/learningReact/commit/d570cc83fa3d22c9ec8900cb67454fe9b39f5523)
2. [Add "Project Sidebar" component with styles](https://github.com/Aman0509/learningReact/commit/37ed3339c0b3a966b1818e548c72af0fc0b443bf)
3. [Add "New Project" & "Input" components with their styles](https://github.com/Aman0509/learningReact/commit/dbae0b058da0eb2085b381038399d903dc5c4d88)
4. [Created & split components](https://github.com/Aman0509/learningReact/commit/9cec0e11b958b176f0869309239689e5883f6cd2)
5. [Manage state to switch between components](https://github.com/Aman0509/learningReact/commit/abefcce573be930bdf85acf5ee1732c6b0af2baa)
6. [Collecting user input with refs & forwarded refs](https://github.com/Aman0509/learningReact/commit/03b5485312b96d44219f2b061578576c6c2b983a)
7. [Handle project creation & updating the UI](https://github.com/Aman0509/learningReact/commit/4338bb10656a6049b4a97c6cbf147258dd778bf8)
8. [Validate user input & show an error modal](https://github.com/Aman0509/learningReact/commit/86fb025f7803840116778612bd220d73d8057aa5)
9. [Make project selectable & view project details](https://github.com/Aman0509/learningReact/commit/c74987dfcb0d02eb4764d15e48007b9432e5fd90)
10. [Handle project delete operation](https://github.com/Aman0509/learningReact/commit/c58ca433710f32a300d6f01da771fe2645b54ebd)
11. [Add project tasks & tasks component](https://github.com/Aman0509/learningReact/commit/0704ed4e7c63081087ba2f21ade0458bdadded27)
12. [Manage tasks & understand about prop drilling](https://github.com/Aman0509/learningReact/commit/a74a979e6ea16441b0da86146f434e23b0ce49f2)
13. [Clear tasks & fix minor bugs](https://github.com/Aman0509/learningReact/commit/514023c25f860ebb96420edbf2d5ac2b9cf6aee3)

## Prop Drilling

Prop drilling is a term used in React to describe the process of passing data from a component to another component by threading it through all intermediate components in the component tree. In other words, it involves passing props down multiple levels of nested components just to deliver them to a deeply nested child component that needs access to the data.

For example, imagine a parent component (Parent) that renders a child component (Child), which in turn renders another child component (Grandchild). If Grandchild needs access to some data that is originally provided by Parent, but Child doesn't directly use that data, you would need to pass the data through Child as props just to get it to Grandchild. This can result in unnecessary complexity and boilerplate code.

Prop drilling can make the code harder to maintain and understand, especially as the application grows and the component tree becomes deeper and more complex. It can also lead to performance issues, as each component in the chain has to re-render when props change, even if they're not directly using those props.

To mitigate prop drilling, you can use techniques like Context API, Redux, or custom hooks to manage and share state in a more centralized and efficient way, allowing components to access the necessary data without having to pass it down explicitly through props. These approaches help to avoid the need for excessive prop drilling and make the codebase cleaner and more maintainable.

**Example:** Suppose we have three components: `Parent`, `Child`, and `Grandchild`.

**_Parent.js_**

```javascript
// Parent.js
import React, { useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [data, setData] = useState("Hello from Parent!");

  return (
    <div>
      <h1>Parent Component</h1>
      <Child data={data} />
    </div>
  );
};

export default Parent;
```

**_Child.js_**

```javascript
// Child.js
import React from "react";
import Grandchild from "./Grandchild";

const Child = ({ data }) => {
  return (
    <div>
      <h2>Child Component</h2>
      <Grandchild data={data} />
    </div>
  );
};

export default Child;
```

**_Grandchild.js_**

```javascript
// Grandchild.js
import React from "react";

const Grandchild = ({ data }) => {
  return (
    <div>
      <h3>Grandchild Component</h3>
      <p>Data received: {data}</p>
    </div>
  );
};

export default Grandchild;
```

In this example, `Parent` holds some data (`data`) in its state and passes it down to `Child` as a prop. However, `Child` itself doesn't directly use `data`; it simply passes it down again to `Grandchild`. Finally, `Grandchild` receives `data` as a prop and displays it.

This is a simple example of prop drilling: `data` is passed down through `Child` just to get it to `Grandchild`, even though `Child` doesn't actually need to use `data`.

Readings:

- [How to Avoid Prop Drilling in React](https://www.freecodecamp.org/news/avoid-prop-drilling-in-react/)
- [What is prop drilling in React?](https://www.educative.io/answers/what-is-prop-drilling-in-react)
- [Prop Drilling in React](https://www.scaler.com/topics/react/prop-drilling-in-react/)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Working with Refs & Portals](../007-refs-and-portals/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[React's Context API & `useReducer` - Advanced State Management <img align="center" src="../images/right_arrow.png" height="20" width="20"/>](../009-advanced-state-management/README.md)

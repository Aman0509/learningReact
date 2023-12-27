# React Essentials - Components, JSX, Props, State & More

| Contents |
| :--- |
| [It's all about Components! [Core Concept]](#its-all-about-components-core-concept) |
| [JSX & React Components [Core Concept]](#jsx--react-components-core-concept) |
| [Components & File Extensions](#components--file-extensions) |

## It's all about Components! [Core Concept]

A React component is a modular, reusable piece of code responsible for rendering a part of a user interface. It encapsulates HTML, CSS, and JavaScript logic, representing specific sections or elements within an application's UI. Components can be composed, combined, and reused to build complex user interfaces. They can manage their own state, receive data via props, and are the fundamental building blocks used in React applications to structure and render UI elements.

**Core Concept: Components**

- React revolves around Components, the reusable building blocks for UI construction.
- They're combined to form the entire user interface in React applications.

    <img src="https://drive.google.com/uc?export=view&id=1F2VBpNnC77lAWB_O_SLQHE6YhIKKouOv" height="350" width="700" alt="academind slide">

**Essential Role of Components**

- Every React app, regardless of complexity, relies on Components as its foundation.
- They encapsulate HTML, CSS, and related JavaScript logic, controlling specific UI sections.

    <img src="https://drive.google.com/uc?export=view&id=1J4zsWiZEtN0vyltcO7wiEJQm8CGFDtrN" height="350" width="700" alt="academind slide">

**Universal Concept Beyond React**

- Building UIs from Components isn't exclusive to React; it's a widespread concept across websites and applications.

**Identifiable Components in Websites**

- Websites showcase key building blocks such as headers, tabs, etc., each serving as Components.

**Granularity and Flexibility**

- Component size and scope are determined by developers, facilitating reusability across the UI.

**Benefits of the Component Approach**

- Prevents unwieldy HTML files, aids in code navigation, and minimizes complexity.
- Enables code reusability, reducing errors by allowing changes in one location.
- Organizes related code cohesively, unlike scattered markup and JavaScript files.

    <img src="https://drive.google.com/uc?export=view&id=1KM-IGGcykzMQPKc0g5b4VYv09G0Gk9ns" height="350" width="700" alt="academind slide">

**Separation of Concerns**

- Components follow the principle of handling distinct UI functionalities, fostering clarity and ease of development.

**Widespread Adoption**

- The Components concept extends beyond React, found in various front-end frameworks and even in mobile development frameworks like Flutter.

Readings

- [Components](https://legacy.reactjs.org/docs/components-and-props.html)

## JSX & React Components [Core Concept]

<img src="https://drive.google.com/uc?export=view&id=1U4KpDmrgrVVqrWdMTrxtPKztLpTVJ-Do" height="350" width="700" alt="academind slide">

JSX, standing for JavaScript Syntax Extension, is a powerful feature in React that enables developers to describe and create HTML elements within JavaScript files. This capability is instrumental in React, where the focus lies on building user interfaces and their components.

Despite being extensively used in React and adopted in various non-React projects, JSX isn't supported by browsers directly. For instance, the code written in files like index.jsx and App.jsx wouldn't function as is in browsers. Instead, React code, including JSX, undergoes transformation before reaching the browser. The development server compiles it into browser-compatible code behind the scenes.

The key takeaway from JSX is its ability to provide a more convenient and intuitive way of defining user interfaces. In React, a crucial part of the code, like the App.jsx file, represents a React Component. Components, as emphasized in prior lectures, are essentially JavaScript functions. However, for React to recognize and utilize these functions as Components, they must adhere to specific rules:

**Naming Convention:**

- The function name must start with an uppercase character.

**Return Value:**

- The function must return a renderable value, typically comprising JSX code representing the HTML markup to be rendered.

<img src="https://drive.google.com/uc?export=view&id=1y-EUDMX65Z0uKPq54F8Z2YUgiLdYGQdw" height="350" width="700" alt="academind slide">

Readings:

- [JSX in React – Explained with Examples](https://www.freecodecamp.org/news/jsx-in-react-introduction/)

- [Create your own react library and JSX](https://www.youtube.com/watch?v=2xz-ADKsKzA)

## Components & File Extensions

At this point, we've built a first custom component and we, of course, also worked with the `App` component.

For the moment, both components are stored in the `App.jsx` file (this will change later though).

`.jsx` is a file extension that's not supported by the browser! It's working because you're working in a React project that supports this special extension. Because this extension "tells" the underlying build process (which is running behind the scenes when the development server is running) that a file contains JSX code (which is also not supported by browsers).

It's important to understand that it's really just that build process that cares about this extension.

And therefore, we'll also find React projects that don't use `.jsx` but instead just `.js` as a file extension. And in those `.js` files, we'll also find JSX code. Because it simply depends on the underlying build process which extension is expected when using this JSX syntax in a file.

Since it doesn't work in the browser either way, there is no hard rule regarding this. Instead, we'll find projects that require `.jsx` (like the project setup we use in this course) and we'll find projects that also support .js (with JSX code inside).

It is emphasized here so that we'll not get confused if encountered with React projects that don't use `.jsx` files.

In addition, we'll also find projects that require the file extension as part of file imports (e.g., import App from './App.jsx') and we'll find other projects that don't require this (i.e., there, you could just use import App from './App').

This, again, has nothing to do with the browser or "standard JavaScript" - instead it simply depends on the requirements of the code build process that's part of the project setup we chose.

***

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Introduction](../001-introduction/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[WIP... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
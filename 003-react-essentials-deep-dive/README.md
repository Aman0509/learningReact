# React Essentials - Deep Dive

| Contents |
| :--- |
| [You don't have to use JSX!](#you-dont-have-to-use-jsx) |
| [Working with Fragments](#working-with-fragments) |
| [When should you split Components?](#when-should-you-split-components) |
| [Forwarding Props to Wrapped Elements](#forwarding-props-to-wrapped-elements) |
| [Working with Multiple JSX Slots](#working-with-multiple-jsx-slots) |
| [Setting Component Types Dynamically](#setting-component-types-dynamically) |
| [Setting Default Prop Values](#setting-default-prop-values) |
| [Not all content must go into Components](#not-all-content-must-go-into-components) |
| [Closer Look: `public/` vs `assets/` for Image Storage](#closer-look-public-vs-assets-for-image-storage) |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## You don't have to use JSX!

**JSX Overview:**

- JSX is a non-standard feature allowing HTML-like syntax in JavaScript.
- It's not supported by browsers directly; a build process transforms it.

**No JSX in React:**

- You can build React apps without JSX using [`React.createElement`](https://react.dev/reference/react/createElement).
- [`createElement`](https://react.dev/reference/react/createElement) method constructs components using standard JavaScript.
- Involves specifying component types, props, and child elements manually.

<img src="https://drive.google.com/uc?export=view&id=1tO6L-ri72Q_V8qErOmuLVOtLRyW8u3cQ" alt="academind slide">

**JSX vs. Non-JSX:**

- JSX is easier, more readable, and commonly used in React projects.
- Non-JSX approach can bypass the need for a build process but is verbose.

**Usage:**

- JSX is preferred for simplicity, readability, and ease of use.
- Non-JSX approach is feasible but less intuitive and more verbose.

**Code Example:**

```javascript
// JSX Component
const Hello = () => {
  return <h1 className="main-heading">Hello, JSX!</h1>;
};
```

```javascript
// Equivalent Component Using React.createElement
const Hello = () => {
  return React.createElement('h1', { className: 'main-heading' }, 'Hello, JSX!');
};
```

## Working with Fragments

Suppose you have a component that returns multiple sibling elements:

```javascript
import React from 'react';

const MyComponent = () => {
  return (
    <h1>Hello</h1>
    <p>Welcome to React!</p>
  );
};
export default MyComponent;
```

Attempting to return these sibling elements directly will result in an error because JSX requires a single parent element. You could wrap these inside a `<div>`, but that would add an extra element that you might not need. To address this, you can utilize [`fragments`](https://react.dev/reference/react/Fragment):

```javascript
import React from 'react';

const MyComponent = () => {
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <p>Welcome to React!</p>
    </React.Fragment>
  );
};
export default MyComponent;
```

Alternatively, using the shorthand syntax:

```javascript
import React from 'react';

const MyComponent = () => {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome to React!</p>
    </>
  );
};
export default MyComponent;
```

Both approaches allow you to group sibling elements without introducing an extra wrapping `div` in the rendered output, keeping your DOM structure clean and efficient.

Readings:

- [How to use React Fragments?](https://refine.dev/blog/how-react-fragments-is-works/#using-shortcut-version)

## When should you split Components?

Here are some key pointers to consider when deciding to split components in React:

- **Complexity:** If a component is handling multiple tasks, such as rendering, managing state, and handling user interactions, it might be too complex. Splitting it into smaller components can simplify the structure and make it more manageable.

- **Responsibilities:** Components should ideally have a single responsibility. When a component does too much, it becomes harder to maintain and debug. Consider splitting it into smaller components, each handling a specific task.

- **Reusability:** Components that could be reused elsewhere in the application or in different parts of the UI are good candidates for separation. Smaller, reusable components can enhance code maintainability.

- **State Management:** If changes in one part of a component cause unnecessary re-renders in another unrelated part due to shared state, it might be wise to reorganize the components to manage state more efficiently.

- **Clarity and Readability:** Breaking down complex components can improve the code's readability. Smaller, focused components are easier to understand and maintain.

- **Performance:** When a component re-renders frequently, impacting performance due to unnecessary updates, splitting it might help isolate the elements that need updating.

By keeping an eye on these considerations, developers can identify instances where splitting components will lead to a more efficient and maintainable React application.

## Forwarding Props to Wrapped Elements

When forwarding props in React, using the spread syntax (`...`) gathers any additional props received by a component, consolidating them into an object. This technique allows passing unspecified props to an inner element or component, enhancing flexibility and reusability.

By using `...` with an identifier (like `props`), all extra props are collected into a single object within the component. This object (`props`) is then spread onto an inner element, allowing the forwarding of unextracted props to the inner component.

This method is valuable for wrapper components, enabling the setting of various attributes without manually extracting each prop. It streamlines the process, making components more adaptable and easier to use while preserving functionality.

For example,

Suppose, you are creating a custom `Section` component that forwards additional props to an inner `section` element to make `section` reusable at different places (consider it demand of web page design):

```javascript
// Section.jsx components
import React from 'react';

const Section = ({ children, ...rest }) => {
  return (
    <section {...rest}>
      {children}
    </section>
  );
};

export default Section;
```

When you use the `Section` component elsewhere in your code, any additional props you pass to it will automatically be applied to the underlying `section` element. For instance:

```javascript
import React from 'react';
import Section from './Section';

const App = () => {
  return (
    <div>
      <Section id="main-section" className="custom-section">
        <h1>Title</h1>
        <p>Content goes here...</p>
      </Section>
    </div>
  );
};

export default App;
```

## Working with Multiple JSX Slots

Working with multiple JSX slots, often referred to as slots or children slots, involves handling multiple sections of content within a single component. This allows for dynamic insertion of content based on how the component is used.

Here's a breakdown with a basic example:

**Component with Multiple Slots:**

```javascript
import React from 'react';

const Card = ({ header, content, footer }) => {
  return (
    <div className="card">
      {header}
      <div className="card-content">
        {content}
      </div>
      {footer}
    </div>
  );
};

export default Card;
```

**Using the Component with Slots:**

```javascript
import Card from './Card';

const App = () => {
  return (
    <Card
      header={<h2>Welcome</h2>}
      content={<p>This is the card's content.</p>}
      footer={<button>Learn More</button>}
    />
  );
};
```

**Explanation:**

- **Slot Props:** The `Card` component defines three slot props: `header`, `content`, and `footer`. These props accept JSX elements as their values.
- **Content Placement:** When using the `Card` component, you provide the content for each slot by passing JSX elements directly to the corresponding slot props.
- **Rendering:** The `Card` component renders the provided content within the designated areas, creating a structured layout.

**Key Points:**

- **Default Slot:** React also has a default slot, accessible as the `children` prop. It's used for content that doesn't have a specific named slot.
- **Named Slots:** Using named slots like this is a pattern, not an official React feature. It provides flexibility in component composition.
- **Reusability:** Components with multiple slots enhance reusability by allowing customization of different parts of the component's structure.

**Benefits:**

- **Improved Component Composition:** Create more adaptable and reusable components.
- **Clearer Content Organization:** Structure content within components for better readability and maintainability.
- **Enhanced Flexibility:** Allow customization of component layouts without modifying the component's core structure.

Readings:

- [Pass Multiple Children to a React Component with Slots](https://www.codeproject.com/Articles/1254614/Pass-Multiple-Children-to-a-React-Component-with-S#:~:text=These%20cases%20are%20all%20easy,and%20make%20components%20more%20reusable.)

## Setting Component Types Dynamically

The concept of setting component types dynamically in React involves allowing a component to receive a prop that defines the type of wrapper or container it should render its content into. This enhances the component's flexibility and reusability across various parts of an application.

Here's a basic example:

Suppose you have a `Tabs` component that renders a set of buttons and you want to enable the flexibility to choose the container element (like `<menu>`, `<ul>`, or `<div>`) for these buttons based on where the component is used.

```javascript
import React from 'react';

const Tabs = ({ buttonsContainer }) => {
  const ButtonsContainer = buttonsContainer; // Capitalize for custom component usage
  // Alternatively, directly accept a prop with an uppercase letter, for eg. ButtonsContainer, ensuring it's also passed with an uppercase letter when using the component.

  return (
    <ButtonsContainer>
      {/* Buttons or content */}
      <button>Button 1</button>
      <button>Button 2</button>
      {/* ... */}
    </ButtonsContainer>
  );
};

export default Tabs;
```

Using the `Tabs` component in another part of your application:

```javascript
import React from 'react';
import Tabs from './Tabs';

const Examples = () => {
  return (
    <div>
      {/* Using the Tabs component with different wrapper elements */}
      <Tabs buttonsContainer="div" />
      <Tabs buttonsContainer="ul" />
      {/* ... */}
    </div>
  );
};

export default Examples;
```

**Key Concepts:**

- **Pass component identifiers as prop values:** Allow flexibility in choosing which component to render within a parent component.
- **Built-in elements vs. custom components:**
    - Pass string names for built-in elements (e.g., `div`, `menu`).
    - Pass component function names for custom components (e.g., Section).
- **Capitalization matters:** Components must start with an uppercase character to be treated as custom components by React.
- **Remapping prop to a constant:** Remapping the prop to a constant with an uppercase letter is a common pattern for clarity and consistency.
- **Directly accepting a prop with uppercase:** Alternatively, directly accept a prop with an uppercase letter, ensuring it's also passed with an uppercase letter when using the component.
- **Flexibility and reusability:** This technique promotes flexible and reusable components that can adapt to different contexts and requirements.

## Setting Default Prop Values

In the previous example, if you set a default value like `div` for `buttonsContainer`, you can omit specifying this prop when using the `Tab` component unless you specifically desire an element other than div.

For example,

```javascript
import React from 'react';

const Tabs = ({ buttonsContainer = 'div' }) => {
  const ButtonsContainer = buttonsContainer; // Capitalize for custom component usage
  // Alternatively, directly accept a prop with an uppercase letter, for eg. ButtonsContainer, ensuring it's also passed with an uppercase letter when using the component.

  return (
    <ButtonsContainer>
      {/* Buttons or content */}
      <button>Button 1</button>
      <button>Button 2</button>
      {/* ... */}
    </ButtonsContainer>
  );
};

export default Tabs;
```

`buttonsContainer='div'` is omitted for the first <Tab/> call.

```javascript
import React from 'react';
import Tabs from './Tabs';

const Examples = () => {
  return (
    <div>
      {/* Using the Tabs component with different wrapper elements */}
      <Tabs />
      <Tabs buttonsContainer="ul" />
      {/* ... */}
    </div>
  );
};

export default Examples;
```

## Not all content must go into Components

Sometimes, not all content needs to be crammed into React components, especially if it's static content that doesn't rely on changing data or states. For instance, a header that holds an image and a title might not need to be enclosed within a React component. You can place such static markup directly within the `index.html` file rather than within a React component.

Here's a basic example to demonstrate this concept:

Let's say you have an `index.html` file that renders a React app in a `div` with an `id` of `root`. Within this HTML file, you have a static header section with an image and a title:

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags, title, and other necessary head content -->
</head>
<body>
  <header>
    <img src="public/game-logo.png" alt="Hand-drawn tic-tac-toe game board">
    <h1>Tic-Tac-Toe</h1>
  </header>

  <div id="root"></div>

  <!-- Other scripts and links -->
</body>
</html>
```

This static header isn't dependent on any changing data or states, so it doesn't need to be a part of a React component. By placing it directly within the `index.html` file, you ensure that it's readily available when the page loads without the need for React to render it.

This approach helps maintain clarity and simplicity within your React components by separating content that doesn't require dynamic rendering from those components that do.

## Closer Look: `public/` vs `assets/` for Image Storage

### The `public/` Folder

While practicing the previous concepts in [tic-tac-toe](projects/02-tic-tac-toe-project/) project, images that serve as the static content was kept in the `public/` folder and then directly reference them from inside your `index.html` or `index.css` files.

The reason for that is that images (or, in general: files) stored in `public/` are made publicly available by the underlying project development server & build process. Just like `index.html`, those files can directly be visited from inside the browser and can therefore also be requested by other files.

If you try loading `localhost:5173/some-image.jpg`, you'll be able to see that image (if it exists in the `public/` folder, of course).

### The `src/assets/` Folder

You can also store images in the `src/assets/` folder (or, actually, anywhere in the `src` folder).

**So what's the difference compared to `public/`?**

Any files (of any format) stored in `src` (or subfolder like `src/assets/`) are **not made available to the public**. They can't be accessed by website visitors. If you try loading `localhost:5173/src/assets/some-image.jpg`, you'll get an error.

Instead, files stored in `src/` (and subfolder) can be used in your code files. Images imported into code files are then picked up by the underlying build process, potentially optimized, and kind of "injected" into the `public/` folder right before serving the website. Links to those images are automatically generated and used in the places where you referenced the imported images.

### Which Folder Should You Use?

You should use the `public/` folder for any images that should not be handled by the build process and that should be generally available. Good candidates are images used directly in the `index.html` file or favicons.

On the other hand, images that are used inside of components should typically be stored in the `src/` folder (e.g., in `src/assets/`).

***

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React Essentials - Components, JSX, Props, State & More](../002-react-essentials/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[WIP... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
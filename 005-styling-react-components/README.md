# Styling React Components

| Contents                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------- |
| [Splitting CSS Code Across Multiple Files](#splitting-css-code-across-multiple-files)                                |
| [Styling React Apps with Vanilla CSS - Pros & Cons](#styling-react-apps-with-vanilla-css---pros--cons)               |
| [Vanilla CSS styles are not Scoped to Components!](#vanilla-css-styles-are-not-scoped-to-components)                 |
| [Styling React Apps with Inline Styles](#styling-react-apps-with-inline-styles)                                      |
| [Dynamic & Conditional Styling with CSS Files and Classes](#dynamic--conditional-styling-with-css-files-and-classes) |
| [Scoping CSS Rules with CSS Modules](#scoping-css-rules-with-css-modules)                                            |
| [Introducing "Styled Components" (Third Party Package)](#introducing-styled-components-third-party-package)          |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Splitting CSS Code Across Multiple Files

Splitting CSS code across multiple files in React involves organizing and managing your styles by breaking them into smaller, more focused CSS files corresponding to specific components or sections of your application. This approach allows for better maintainability and readability of your styles.

Let's consider a basic example:

Suppose you have a React application with a header component (`Header.jsx`) and other components. Initially, all your CSS rules are defined in a single `index.css` file.

### Before Splitting:

```javascript
/* index.jsx */

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

```javascript
/* App.jsx */

import React from "react";
import Header from "./Header.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      {/* Other components */}
    </div>
  );
}

export default App;
```

```javascript
/* Header.jsx */

import React from "react";

function Header() {
  return (
    <header className="header">
      <h1>Welcome to My App</h1>
      {/* Other header content */}
    </header>
  );
}

export default Header;
```

```CSS
/* index.css */

/* Styles for header */
.header {
  background-color: #333;
  color: white;
  /* Other header styles */
}

/* Other styles for the entire app */
/* ... */
```

Now, you want to split the header-specific styles into a separate CSS file (`header.css`).

### After Splitting:

```javascript
/* Header.jsx */

import React from "react";
import "./header.css"; // Importing the header-specific CSS file

function Header() {
  return (
    <header className="header">
      <h1>Welcome to My App</h1>
      {/* Other header content */}
    </header>
  );
}

export default Header;
```

```CSS
/* header.css */

/* Header-specific styles */
.header {
  background-color: #333;
  color: white;
  /* Other header styles */
}
```

Now, your `header.css` file contains only styles related to the header component. By importing `header.css` specifically into `Header.jsx`, you've isolated the header styles.

This separation allows for:

- **Modularity:** Each CSS file contains styles relevant to a specific component, making it easier to locate and manage styles.
- **Reduced Complexity:** Smaller, focused CSS files are easier to read and maintain than a single large file.
- **Better Scalability:** As your application grows, organizing styles by component helps in managing a larger codebase.

Remember, you can apply this approach to other components as well, splitting styles across different CSS files based on their specific functionalities or components they are associated with.

## Styling React Apps with Vanilla CSS - Pros & Cons

<img src="https://drive.google.com/uc?export=view&id=19ACRxsQH8yv1fERGNjJk61OBuE-b1q3f"  height="350" width="700" alt="academind slide">

## Vanilla CSS styles are not Scoped to Components!

In vanilla CSS, styles are global and not inherently scoped to individual components. Here's a simple example to illustrate this:

Consider a scenario where you have two components, `Button` and `Card`, and you want to apply different styles to each component.

**Button.jsx**

```javascript
import React from "react";
import "./button.css";

function Button() {
  return <button className="button">Click me</button>;
}

export default Button;
```

**button.css**

```CSS
/* button.css */

/* Styles for the Button component */
.button {
  background-color: blue;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
```

**Card.jsx**

```javascript
import React from "react";
import "./card.css";

function Card() {
  return (
    <div className="card">
      <h2>Card Title</h2>
      <p>This is a card component</p>
    </div>
  );
}

export default Card;
```

**card.css**

```CSS
/* card.css */

/* Styles for the Card component */
.card {
  border: 1px solid black;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  background-color: lightgray;
}
```

In this setup, even though `button.css` and `card.css` contain class names like `.button` and `.card`, respectively, these styles aren't scoped solely to their respective components.

For instance, if you use the `Button` component inside the `Card` component:

**App.jsx**

```javascript
import React from "react";
import Button from "./Button.jsx";
import Card from "./Card.jsx";

function App() {
  return (
    <div className="app">
      <Button />
      <Card>
        <Button /> {/* Using Button component inside Card */}
      </Card>
    </div>
  );
}

export default App;
```

Both instances of the `Button` component will inherit the styles defined in `button.css`, regardless of their location within different components. This lack of encapsulation means that the styles defined in `button.css` can affect all elements with the class name `.button` throughout the application, not just the intended button components.

## Styling React Apps with Inline Styles

Using inline styles in React provides a way to style components directly within your JSX code.

**Key Points:**

- **Applying Styles Directly in JSX:** Inline styles let you apply CSS styles directly within JSX elements, rather than using separate CSS files.

- **Using the `style` Prop:** Add a `style` prop to JSX elements and pass an object containing style properties and their values:
  ```javascript
  <p style={{ color: "red", textAlign: "left" }}>
    This paragraph is red and aligned to the left.
  </p>
  ```
- **Camel Case for Property Names:** Use camel case for CSS property names (e.g., `textAlign` instead of `text-align`).
- **Dynamic Styling:** Inline styles can be dynamically calculated based on component state or props, enabling conditional styling.

<img src="https://drive.google.com/uc?export=view&id=1bkRHhIfx4JEdL46hr6ABGUq2fU5rIs1x"  height="350" width="700" alt="academind slide">

**Advantages:**

- **Scope to Individual Elements:** Inline styles only affect the specific element they're applied to, preventing unintended style conflicts.
- **Dynamic Styling Capabilities:** Well-suited for conditional or dynamic styling based on component state or user interactions.

**Disadvantages:**

- **Redundancy:** Can lead to code repetition if multiple elements need the same styles.
- **Separation of Concerns:** Mixes styling and structure within JSX, potentially affecting code readability and maintainability.
- **Maintenance Challenges:** Updating styles for multiple elements requires changes in multiple places.

**Example:**

```javascript
function MyComponent() {
  const isHovered = false; // Example state variable

  return (
    <div>
      <h1 style={{ color: "blue" }}>Hello, world!</h1>
      <p style={{ color: isHovered ? "red" : "black" }}>
        This paragraph changes color on hover.
      </p>
    </div>
  );
}
```

## Dynamic & Conditional Styling with CSS Files and Classes

When working with React, dynamic and conditional styling can also be achieved using CSS files and classes, allowing you to apply styles based on certain conditions.

- **Conditional Class Application:** Use ternary expressions within the className prop to apply classes conditionally based on state or props:
  ```javascript
  <div className={isHovered ? "hovered-class" : undefined}>Hover over me</div>
  ```
- **Merging Multiple Classes:** Combine static and conditional classes using template literals and string interpolation:
  ```javascript
  <label className=`label ${isEmailValid ? '' : 'invalid'}`>Email</label>
  ```
- **Dynamic Class Updates:** Trigger class changes based on user interactions or data changes to achieve interactive styling effects.

**Example**

```javascript
function MyComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  return (
    <div>
      <div
        className={isHovered ? "highlighted" : ""}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Hover over me
      </div>
      <label className={`label ${isEmailValid ? "" : "invalid"}`}>Email</label>
    </div>
  );
}
```

Dynamic and conditional styling with CSS classes allows you to create flexible and interactive React components while maintaining a clear separation of concerns between styling and component logic.

## Scoping CSS Rules with CSS Modules

CSS modules are a powerful tool for styling components in React applications. They provide a way to create modular and scoped CSS styles, eliminating the risk of class name clashes and allowing for easy reuse of styles across components.

**_CSS Modules is not an official spec or an implementation in the browser but rather a process in a build step (with the help of Webpack or Browserify or Vite etc) that changes class names and selectors to be scoped (i.e. kinda like namespaced)._**

Let's say you have a scenario where your CSS rules unintentionally affect components outside their intended scope. For instance, you have a rule that centers all paragraphs, affecting labels inside some paragraphs, which isn't desired.

```css
/* Header.module.css */

.paragraph {
  text-align: center;
}
```

To enable CSS Modules, rename your CSS file to follow the naming convention with a `.module.css` extension, like `Header.module.css`. This naming convention signals the build tool to process the file differently.

Now, when importing this CSS file into your component:

```javascript
// Header.jsx

import React from "react";
import styles from "./Header.module.css"; // Importing CSS module
// while importing, any name can be given. Currently, `styles` is assigned

const Header = () => {
  return (
    <header>
      <p className={styles.paragraph}>Hello</p>
    </header>
  );
};

export default Header;
```

Notice the import statement: `import styles from './Header.module.css';`. _This import generates a JavaScript object (in this case, object named `styles`) containing unique identifiers for the classes defined in the CSS file._

In the JSX, instead of using regular class names, you use the scoped classes from the imported styles object:

```javascript
<p className={styles.paragraph}>Hello</p>
```

When this code compiles, the generated class names will look something like `Header_paragraph__[random characters]`. These unique class names ensure that the defined styles only apply to the components importing those classes.

The build tool automatically transforms the class names in the CSS Modules to unique, scoped names. This ensures that your CSS rules are contained within the specific component file, preventing them from affecting other components unintentionally.

<img src="https://drive.google.com/uc?export=view&id=18D72ttrjjQdlluoddTdRdLfVC4kUwJcE"  height="350" width="700" alt="academind slide">

Readings:

- [What are CSS Modules and why do we need them?](https://css-tricks.com/css-modules-part-1-need/)
- [Using CSS modules in React](https://bootcamp.uxdesign.cc/using-css-modules-in-react-cc17f7c81247)

## Introducing "Styled Components" (Third Party Package)

Styled Components is a library that allows you to write CSS directly inside your React components, keeping styles scoped and directly associated with the components they style.

1. To start using Styled Components, you'll first need to install the library:

   ```bash
   npm install styled-components
   ```

2. **Importing `styled`:**

   In the `styled-components` library, `styled` is a function. You first import the `styled` function from the `styled-components` library:

   ```javascript
   import styled from "styled-components";
   ```

3. **Creating Styled Components:**

   To create a styled component, you call the `styled` function with the following arguments:

   - **Base Component:** The HTML tag or React component you want to style (e.g., `button`, `div`, or a custom component).

   - **Template Literal:** Contains the CSS styles to be applied, written within backticks (\`).

   ```javascript
   const StyledButton = styled.button`
     /* CSS styles go here */
   `;
   ```

   Or

   ```javascript
   const StyledCustomComponent = styled(CustomComponent)`
     /* CSS styles go here */
   `;
   ```

4. **Functionality:**

- When you call `styled.tag`, it doesn't create a styled component directly.
- Instead, it returns a function that accepts a template literal containing the CSS styles.
- This function, when invoked, generates a new React component with the specified styles.

Let's understand with an example:

```javascript
// StyledComponentExample.jsx

import React from "react";
import styled from "styled-components";

// Creating a styled component
const StyledParagraph = styled.p`
  color: blue;
  font-size: 16px;
  font-weight: bold;
`;

const StyledComponentExample = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <StyledParagraph>This is a styled paragraph.</StyledParagraph>
    </div>
  );
};

export default StyledComponentExample;
```

In this example, the `styled` function from `styled-components` is used to create a `StyledParagraph` component. The CSS rules specified inside the backticks (\`\`), using the [Tagged Template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) concept, are applied to the `p` element rendered by `StyledParagraph`.

You can then use `StyledParagraph` in your JSX just like any other React component and it can also wrapped around the content which will be captured by special `children` prop.

```javascript
<StyledParagraph>This is a styled paragraph.</StyledParagraph>
```

Behind the scenes, Styled Components generates unique class names for your styles and attaches them to the appropriate elements. This keeps your styles encapsulated within the component, preventing global style conflicts and making your code more maintainable.

Readings:

- [How styled-components works: A deep dive under the hood
  ](https://medium.com/styled-components/how-styled-components-works-618a69970421)

- [How to Use Styled Components in Your React Apps](https://www.freecodecamp.org/news/styled-components-in-react/)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React Essentials - Practice Projects](../004-react-essentials-practice-project/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

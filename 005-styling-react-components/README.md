# Styling React Components

| Contents                                                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Splitting CSS Code Across Multiple Files](#splitting-css-code-across-multiple-files)                                                                             |
| [Styling React Apps with Vanilla CSS - Pros & Cons](#styling-react-apps-with-vanilla-css---pros--cons)                                                            |
| [Vanilla CSS styles are not Scoped to Components!](#vanilla-css-styles-are-not-scoped-to-components)                                                              |
| [Styling React Apps with Inline Styles](#styling-react-apps-with-inline-styles)                                                                                   |
| [Dynamic & Conditional Styling with CSS Files and Classes](#dynamic--conditional-styling-with-css-files-and-classes)                                              |
| [Scoping CSS Rules with CSS Modules](#scoping-css-rules-with-css-modules)                                                                                         |
| [Introducing "Styled Components" (Third Party Package)](#introducing-styled-components-third-party-package)                                                       |
| [Creating Flexible Components with Styled Components](#creating-flexible-components-with-styled-components)                                                       |
| [Dynamic & Conditional Styling with Styled Components](#dynamic--conditional-styling-with-styled-components)                                                      |
| [Handling Pseudo Selectors, Nested Rules, and Media Queries in Styled Components](#handling-pseudo-selectors-nested-rules-and-media-queries-in-styled-components) |
| [Creating Reusable Components & Component Combinations](#creating-reusable-components--component-combinations)                                                    |

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

## Creating Flexible Components with Styled Components

Creating flexible components with Styled Components involves leveraging the capabilities of styled components to encapsulate styles and behaviors while retaining flexibility with props.

Styled components efficiently pass props set on the styled component to the underlying HTML element (e.g., forwarding a `className` prop to a built-in `label`). This enables seamless migration and use of various props like event listeners (`onChange`) and HTML attributes (`type` for `input` elements). This ensures that the components not only look visually appealing but also retain their original behavior.

**Example:**

```javascript
// Import necessary packages
import React from "react";
import styled from "styled-components";

// Create a styled button component
const StyledButton = styled.button`
  /* Define styles using template literals */
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  /* Add hover effect */
  &:hover {
    background-color: #2980b9;
  }
`;

// Define a functional component using the styled button
const CustomContainer = () => {
  return (
    <div>
      <h2>Styled Button</h2>
      {/* Styled component allows the addition of props, such as `onClick`, seamlessly.  */}
      <StyledButton onClick={() => console.log("Clicked!")}>
        Click me too!
      </StyledButton>
    </div>
  );
};

export default CustomContainer;
```

## Dynamic & Conditional Styling with Styled Components

Dynamic and conditional styling with Styled Components involves using props to alter the styles of components based on certain conditions or dynamic values. Let's break it down into a basic example:

Consider a scenario where you want to style a button component based on its state, let's say 'disabled'. We'll use Styled Components to achieve this.

First, let's create a Button component:

```javascript
import React from "react";
import styled from "styled-components";

// Create a styled button component
const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? "#CCCCCC" : "#3498db")};
  color: ${(props) => (props.disabled ? "#888888" : "#ffffff")};
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
`;

// Define a functional component using the styled button
const Button = ({ disabled, onClick, children }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
```

**Explanation:**

- `StyledButton` is a styled component created using `styled.button`.
- It uses props to conditionally alter styles based on the `disabled` prop.
- When `disabled` is true, it changes background color, text color, cursor, and opacity to represent a disabled state.

Now, use this `Button` component in your app:

```javascript
import React from "react";
import Button from "./Button"; // Import the Button component

const App = () => {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      {/* A normal button */}
      <Button onClick={handleButtonClick}>Click me!</Button>

      {/* A disabled button */}
      <Button disabled onClick={handleButtonClick}>
        Disabled Button
      </Button>
    </div>
  );
};

export default App;
```

**Explanation:**

- The `Button` component is used twice, once as a regular button and once as a `disabled` button.
- The `disabled` prop is passed to the second button to apply conditional styles.

### Prop Name Clash with HTML Attribute Names

When using Styled Components, if the props you pass to your styled component clash with existing HTML attribute names, you can encounter issues or warnings (we will see the warnings in previous given example as well). To handle this and avoid conflicts:

1. **Prefix Props:** Prefix your custom props with a symbol or unique string like a dollar sign (`$`) to differentiate them from standard HTML attributes. For instance, if you have a prop named `disabled`, which clashes with the HTML `disabled` attribute, rename it to `$disabled` within your styled component to prevent conflicts.

2. **Modify in Styled Component Definition:** Within your styled component definition, ensure to destructure or rename props to avoid clashes. For example:

   ```javascript
   const StyledComponent = styled.div`
     color: ${(props) => (props.$customProp ? "red" : "blue")};
   `;
   ```

   Here, `$customProp` is used instead of `customProp` to avoid conflicts with HTML attributes.

3. **Forwarding Props Carefully:** When using props to style elements or modify their behavior, ensure that only intended props are forwarded to the underlying HTML elements. You can use techniques like object destructuring or filtering to selectively forward props.

By applying these practices, you can prevent naming clashes between your custom props and standard HTML attributes, ensuring a smoother integration of Styled Components within your React application.

## Handling Pseudo Selectors, Nested Rules, and Media Queries in Styled Components

- **Ampersand (`&`) Symbol:** Used to reference the styled component itself within its styles, enabling nested rules and pseudo selectors.
- **Nested Rules:** Target child elements by using `&` followed by a space and the child selector (e.g., `& image`, `& h1`).
- **Media Queries:** Apply styles based on screen size or other conditions using standard CSS media query syntax within the styled component (e.g., `@media (max-width: 600px) { ... }`).
- **Pseudo Selectors:** Apply styles based on element states like hover, focus, etc., using `&:` followed by the selector (e.g., `&:hover`).

**Example:**

1. Handling Nested Rules and Media Queries in a Header:

   ```javascript
   import styled from "styled-components";

   const StyledHeader = styled.header`
     /* Base styles for the header */
     display: flex;
     align-items: center;
     justify-content: center;
     /* ... */

     /* Styles for nested elements */
     & img {
       width: 100px;
       height: auto;
     }

     & h1 {
       margin-left: 10px;
     }

     /* Media query for larger screens */
     @media (min-width: 768px) {
       margin-bottom: 4rem;

       & h1 {
         font-size: 2rem;
       }
     }
   `;
   ```

2. Handling Pseudo Selectors in a Button:

   ```javascript
   const Button = styled.button`
     /* Base button styles */
     background-color: blue;
     color: white;
     padding: 10px 20px;

     /* Hover styles */
     &:hover {
       background-color: tomato;
     }
   `;
   ```

**Remember:**

- Styled components generate unique class names, preventing style conflicts.
- You can create complex and dynamic styles using these features, enhancing UI responsiveness and interactivity.

## Creating Reusable Components & Component Combinations

**Reusable Styled Components:**

- Move styled components that are likely to be used in multiple parts of the application into separate files for better organization and reusability.
- Example: Creating a `Button.jsx` file to house a reusable Button styled component.

  ```javascript
  /* Button.jsx */
  import styled from "styled-components";

  const Button = styled.button`
    /* Button styles */
  `;

  export default Button;

  /* AuthInputs.jsx */
  import Button from "./Button.jsx";

  // Use the Button component
  export default function AuthInput(){
  	return(
  		// Some other components
  		 <Button>Click me</Button>;
  	);
  }
  ```

**Combining Components:**

- For common combinations of elements (e.g., `label` and `input`), create composite components that encapsulate their styling and structure.
- This improves reusability and code maintainability.
- Example: Creating a `CustomInput` component that combines a styled `label` and styled `input`.

  ```javascript
  /* CustomInput.jsx */
  import styled from "styled-components";

  const StyledLabel = styled.label`
    /* Label styles */
  `;

  const StyledInput = styled.input`
    /* Input styles */
  `;

  export default function CustomInput({ label, invalid, ...props }) {
    return (
      <p>
        <StyledLabel $invalid={invalid}>{label}</StyledLabel>
        <StyledInput $invalid={invalid} {...props} />
      </p>
    );
  }

  /* AuthInputs.jsx */
  import CustomInput from "./CustomInput.jsx";

  // Use the combined input component
  <CustomInput
    label="Email"
    invalid={isInvalidEmail}
    value={email}
    onChange={handleEmailChange}
  />;
  ```

### Pros & Cons of Styled Components

<img src="https://drive.google.com/uc?export=view&id=1D-rogUW1pvpHJ2QjfO3Dg7aP-Xnt7TQN"  height="350" width="700" alt="academind slide">

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React Essentials - Practice Projects](../004-react-essentials-practice-project/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

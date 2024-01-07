# Styling React Components

| Contents                                                                                               |
| :----------------------------------------------------------------------------------------------------- |
| [Splitting CSS Code Across Multiple Files](#splitting-css-code-across-multiple-files)                  |
| [Styling React Apps with Vanilla CSS - Pros & Cons](#styling-react-apps-with-vanilla-css---pros--cons) |
| [Vanilla CSS styles are not Scoped to Components!](#vanilla-css-styles-are-not-scoped-to-components)   |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React Essentials - Practice Projects](../004-react-essentials-practice-project/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

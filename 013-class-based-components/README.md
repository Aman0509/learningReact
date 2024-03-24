# Class Based Components (An Alternate Way of Building Components)

| Contents                                                                                                      |
| :------------------------------------------------------------------------------------------------------------ |
| [What are Class based Components & Why is it Required?](#what-are-class-based-components--why-is-it-required) |
| [Working with State and Events](#working-with-state-and-events)                                               |
| [Component Lifecycle in Class-Based Components](#component-lifecycle-in-class-based-components)               |
| [Class Based Components and Context](#class-based-components-and-context)                                     |
| [Introducing Error Boundaries](#introducing-error-boundaries)                                                 |

## What are Class based Components & Why is it Required?

<img src="https://drive.google.com/uc?export=view&id=109Ml6GZGtFjtejoqCXeu45HBav3QVx16" height="350" width="700" alt="academind slide">

In the early days of React (up to React 16.8), class-based components were the fundamental building blocks for creating reusable UI elements. They provided a way to encapsulate state, define lifecycle methods, and manage event handling within your React application.

**Key Characteristics:**

- **Inheriting from React.Component:** Class-based components extend the built-in `React.Component` class, gaining access to React's features and lifecycle methods.
  State Management: They use the constructor method to define the component's initial state using the `this.state` property. State updates are triggered by calling `this.setState()`.
- **Lifecycle Methods:** Class-based components have built-in lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` that allow you to perform actions at specific points in the component's lifecycle (e.g., fetching data after mounting, handling side effects on updates, cleaning up resources on unmount).
- **JSX Syntax:** You can use JSX syntax within the `render` method to define the component's UI structure.

Before React 16.8, making changes to state and handling side effects in functional components was not possible. However, with the introduction of React Hooks in version 16.8, this limitation was overcome. React Hooks, such as `useState` and `useEffect`, provide functionality previously exclusive to class-based components, but they are designed specifically for use in functional components. It's important to note that class-based components cannot utilize React Hooks. In the upcoming modules, we'll explore how to convert functional components to class-based components, manage state within them, and translate `useEffect`, `useContext`, and `useReducer` functionalities for use in class-based components.

With the introduction of hooks in React, functional components have become the preferred way of writing components due to their simplicity, reusability, and better support for modern JavaScript features. Functional components, especially when combined with hooks, offer a more concise and readable way to manage component logic.

While hooks are recommended, React still fully supports class-based components. Existing codebase may still use them, and you might encounter them in learning materials or legacy projects.

**_Note: While you can mix class-based and functional components within your React application (no errors will occur), it's generally recommended to choose one approach for consistency and maintainability. Functional components with hooks are the current best practice._**

Readings:

- [Understanding Functional Components and Class-Based Components](https://betterprogramming.pub/understanding-functional-components-895321b1af84)
- [Functional Components vs Class Components in React](https://www.freecodecamp.org/news/functional-components-vs-class-components-in-react/)
- [Introduction to Class Component in React](https://www.scaler.com/topics/react/class-component-in-react/)

## Working with State and Events

In a class-based approach, defining and managing state is slightly different from the functional-based approach. Here's how you do it:

### Defining State

- **Class-based components:**

  - Use the `constructor` function to initialize state.
  - Set `this.state` equal to an object containing your state properties (e.g., `this.state = { showUsers: true }`). Remember, it also has to be a property named `state`. This name is not up to you, so, it will always be `this.state`.
  - _State is always an object in class components, even if it holds a single value._

- **Functional components (using hooks):**
  - Use the `useState` hook to define state (e.g., `const [showUsers, setShowUsers] = useState(true)`).
  - State can be any data type (boolean, string, number, object, etc.).

### Accessing and Setting State

- **Class-based components:**

  - Access state using `this.state.<property_name>` (e.g., `this.state.showUsers`).
  - Update state using the `setState` method:
    - Pass an object containing the new state values (e.g., `this.setState({ showUsers: false })`).
    - `setState` merges the new object with the existing state, not overriding it completely.

- **Functional components (using hooks):**
  - Access state directly using the variable assigned by `useState` (e.g., `showUsers`).
  - Update state directly using the setter function returned by `useState` (e.g., `setShowUsers(false)`).
  - Setting state directly overrides the previous value.

### Updating State Based on Previous Value

- **Class-based components:**

  - When updating state that depends on the previous value, pass a function to `setState`:
    ```javascript
    this.setState((prevState) => ({
      showUsers: !prevState.showUsers,
    }));
    ```
  - The function receives the current state as an argument (`prevState`) and should return a new object with the updated values.

- **Functional components (using hooks):**
  - No special handling needed. The setter function from useState already receives the previous state implicitly.

**Example: Toggling a User List using Class-based component**

```javascript
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showUsers: true };
  }

  toggleUsersHandler = () => {
    this.setState((prevState) => ({
      showUsers: !prevState.showUsers,
    }));
  };

  render() {
    const usersList = [...]; // Your users list logic

    return (
      <div>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide Users' : 'Show Users'}
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}
```

- The constructor initializes the `showUsers` state to `true`.
- The `toggleUsersHandler` function updates the `showUsers` state based on its previous value using `setState` with a function.
- The `render` method displays a button that calls `toggleUsersHandler` and conditionally renders the user list based on `showUsers`.
- Note the use of `bind(this)` to ensure `this` refers to the component instance within the event handler.

Another important point is that class components require extra care to ensure `this` refers to the component within event handlers.

Readings:

- [How To Manage State on React Class Components](https://www.digitalocean.com/community/tutorials/how-to-manage-state-on-react-class-components)

## Component Lifecycle in Class-Based Components

Now that we understand the basics of constructing class-based components and managing state and event handling, what about handling side effects? As previously mentioned, React hooks cannot be utilized in class-based components, meaning `useEffect` is not an option. However, class-based components introduce the concept of the component lifecycle.

Every component inherently undergoes a lifecycle, being rendered to and removed from the DOM. However, class-based components offer specific methods that allow you to execute code at various stages of this lifecycle. One of the most fundamental lifecycle methods available for class-based components is `componentDidMount()`. Similar to the `render()` method, `componentDidMount()` is a built-in method provided by React, which you can implement as soon as you extend the built-in Component class imported from React. React automatically invokes this method when the component has just been mounted.

Additionally, other lifecycle methods that can be implemented include `componentDidUpdate()`, `componentWillUnmount()` and few more.

**Lifecycle Methods:**

- **constructor(props):** This is called when the component is first created and is a good place to initialize state using `this.state`.
- **componentDidMount():** This is called after the component is mounted (inserted) into the DOM. It's a good time to fetch data from an API, set up subscriptions, or perform actions that rely on the DOM being available.
- **componentDidUpdate(prevProps, prevState):** This is called after the component updates. It receives the previous props and state as arguments, allowing you to compare them and perform actions based on changes. You should typically avoid making state changes directly inside this method to prevent infinite loops.
- **componentWillUnmount():** This is called before the component is removed from the DOM. It's a good place to clean up any resources, subscriptions, or timers to avoid memory leaks or unexpected behavior.

<img src="https://drive.google.com/uc?export=view&id=1M55YwKlRYfUA_CRM2QnDHCkfgQMxu2lu" height="350" width="700" alt="academind slide">

**Example:**

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log("Component mounted!"); // Log when the component is inserted into the DOM
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

- The `constructor` initializes the `count` state to 0.
- `componentDidMount` logs a message to the console when the component is mounted.
- `handleClick` increments the count state by 1 when the button is clicked.
- The `render` method displays the current count and a button that triggers the `handleClick` function.

**Key Points:**

- Each lifecycle method serves a specific purpose.
- Using these methods effectively helps manage component behavior throughout its lifecycle.
- Be mindful of potential issues like infinite loops when using `componentDidUpdate`.

**Additional Lifecycle Methods:**

- `shouldComponentUpdate(nextProps, nextState)`: This is an optional method that allows you to control whether a component should update based on changes in props or state.

- `getDerivedStateFromProps(nextProps, prevState)`: This is another optional method that allows you to derive state based on changes in props before the component updates.

## Class Based Components and Context

While React Hooks offer a more straightforward approach to context with `useContext`, class-based components can also leverage context. Here's how it works:

**Concepts:**

- **Context API:** A mechanism for passing data (props) through the component tree without explicitly passing it down through every level.
- **Provider:** A component that establishes a context by wrapping components that need to access the context data.
- **Consumer:** A component that can access the context data provided by a higher-level provider component.

**Explanation:**

1. **Create the Context:**

   Use `React.createContext(defaultValue)` to create a context object. This defines the type and default value of the context data.

2. **Provider Component:**

   - Create a class-based component that wraps the child components that need access to the context.
   - In the constructor, set the context value using `this.context = MyContext.Provider`.
   - In the render method, return the child components wrapped within the `MyContext.Provider` component, passing the context value as a prop (usually named `value`).

3. **Consumer Component:**

   There are two approaches:

   - Static `contextType`:
     - Define a static property `contextType` on the consumer component and set it to the created context object (e.g., `MyContext`).
     - Access the context data using `this.context` within the component.
     - A limitation of the `static contextType` approach is that a component can only connect to one context at a time. This means if you need a component to access data from two separate contexts, using `static contextType` won't work.
     - However, if you still want to attach multiple context, you can use alternative which is, wrap the component in another component that acts as a provider for both contexts. However, this can add some nesting to your component tree.
   - Consumer Component (deprecated):
     - Use the `MyContext.Consumer` component.
     - Render the child content within the `Consumer` component, passing a function that receives the context value as an argument.

**Example**

1. Create the Context

   ```javascript
   const ThemeContext = React.createContext("light"); // Default theme
   ```

2. Provider Component

   ```javascript
   class ThemeProvider extends React.Component {
     constructor(props) {
       super(props);
       this.state = { theme: "light" };
     }

     toggleTheme = () => {
       this.setState({
         theme: this.state.theme === "light" ? "dark" : "light",
       });
     };

     render() {
       return (
         <ThemeContext.Provider
           value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
         >
           {this.props.children}
         </ThemeContext.Provider>
       );
     }
   }
   ```

3. Consumer Component (Static `contextType`):

   ```javascript
   class MyComponent extends React.Component {
     static contextType = ThemeContext;

     render() {
       const { theme, toggleTheme } = this.context;
       return (
         <div
           style={{ backgroundColor: theme === "light" ? "white" : "black" }}
         >
           <p>Current theme: {theme}</p>
           <button onClick={toggleTheme}>Toggle Theme</button>
         </div>
       );
     }
   }
   ```

**Usage:**

Wrap your app with the `ThemeProvider` and place the `MyComponent` anywhere within the provider tree:

```javascript
<ThemeProvider>
  <App>
    <MyComponent />
  </App>
</ThemeProvider>
```

Key Points:

- Class-based components access context using `this.context` (static contextType approach) or within `MyContext.Consumer`.
- The provider component establishes the context by wrapping child components.
- Context allows for efficient data sharing across a component tree without prop drilling.

## Introducing Error Boundaries

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire component tree.

They allow developers to handle errors gracefully and provide a fallback UI when an error occurs.

**Creating an Error Boundary Component:**

- In class-based components, error boundaries are implemented using special lifecycle methods. The `componentDidCatch()` lifecycle method is used to catch errors within a component and its children.
- This method is automatically invoked when an error is thrown in any of its descendant components.
- The `componentDidCatch` method receives two parameters: `error` and `info`, providing information about the error that occurred.
- Inside the `componentDidCatch` method, developers can handle the error and update the component's state accordingly.

**Implementing the Error Boundary Component:**

- The error boundary component typically sets its state to indicate that an error has occurred.
- It can render a fallback UI to inform users about the error.
- Optionally, the error boundary component can log the error for debugging purposes or send it to a server for analytics.

**Wrapping Components with Error Boundaries:**

- To utilize an error boundary, wrap the component(s) that might throw errors with the error boundary component.
- This allows the error boundary to catch errors occurring within its child components.

**Handling Errors in Production:**

- In production, the error boundary's fallback UI is displayed to users when an error occurs, preventing them from seeing the raw error message.
- This helps maintain a better user experience by gracefully handling errors without crashing the entire application.

**Example:**

```javascript
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Log the error to a server for analytics
    console.error("Error occurred:", error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

class MyComponent extends Component {
  render() {
    // Simulate an error
    if (this.props.shouldError) {
      throw new Error("Error occurred in MyComponent");
    }
    return <div>{this.props.content}</div>;
  }
}

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <MyComponent content="Hello World!" shouldError={false} />
        <MyComponent content="Goodbye World!" shouldError={true} />
      </ErrorBoundary>
    );
  }
}

export default App;
```

In this example, `ErrorBoundary` is an error boundary component that catches errors thrown by its child components (`MyComponent`). If an error occurs in `MyComponent`, the error boundary displays a fallback UI instead of crashing the entire application. This ensures a smoother user experience by handling errors gracefully.

**_Note: Error Boundaries are only created from class components because they implement the `componentDidCatch` lifecycle method. There is no way to implement `componentDidCatch` lifecycle method in functional components for now._**

Readings:

- [React error handling with react-error-boundary](https://blog.logrocket.com/react-error-handling-with-react-error-boundary/)
- [Error Handling in React With Error Boundary: A Tutorial](https://builtin.com/software-engineering-perspectives/react-error-boundary)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Behind the Scenes of React & Optimization Techniques](../012-bts-of-react-and-optimization-techniques/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

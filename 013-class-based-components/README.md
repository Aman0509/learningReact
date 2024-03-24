# Class Based Components (An Alternate Way of Building Components)

| Contents                                                                                                      |
| :------------------------------------------------------------------------------------------------------------ |
| [What are Class based Components & Why is it Required?](#what-are-class-based-components--why-is-it-required) |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Behind the Scenes of React & Optimization Techniques](../012-bts-of-react-and-optimization-techniques/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

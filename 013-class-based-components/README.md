# Class Based Components (An Alternate Way of Building Components)

| Contents                                                                                                      |
| :------------------------------------------------------------------------------------------------------------ |
| [What are Class based Components & Why is it Required?](#what-are-class-based-components--why-is-it-required) |
| [Working with State and Events](#working-with-state-and-events)                                               |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Behind the Scenes of React & Optimization Techniques](../012-bts-of-react-and-optimization-techniques/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

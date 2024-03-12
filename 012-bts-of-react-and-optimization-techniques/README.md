# Behind the Scenes of React & Optimization Techniques

| Contents                                                                |
| :---------------------------------------------------------------------- |
| [How React Works Behind the Scenes](#how-react-works-behind-the-scenes) |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## How React Works Behind the Scenes

Behind the scenes, React works by executing component functions to generate a virtual representation of the user interface, known as the virtual DOM. This process involves several steps:

1. **Component Rendering:** React starts by executing the top-level component function, typically the root component of the application. This function contains JSX code that represents the UI structure.

2. **Execution Flow:** As React executes the component function, it traverses through the JSX code, executing each statement sequentially. This includes registering state variables, creating functions, and evaluating JSX expressions.

3. **Component Tree Construction:** During execution, React constructs a component tree by adding components to the tree in the order they are referenced in the JSX code. Each component may have child components, forming a hierarchical structure.

4. **Custom and Built-in Components:** React handles both custom and built-in components in a similar manner. When encountering a custom component, React executes its corresponding function and adds it to the component tree. Built-in HTML elements like div, span, and h2 are also treated as components.

5. **Prop Passing:** Components can receive data through props. React forwards props to child components during execution, allowing components to communicate and share data.

6. **Rendering to Virtual DOM:** As components are executed, React generates a virtual representation of the UI, known as the virtual DOM. This virtual DOM mirrors the structure of the actual DOM but exists purely in memory.

7. **Updating State:** When state variables change, React triggers a re-rendering process. It re-executes the affected component functions and updates the virtual DOM accordingly.

8. **Reconciliation:** React performs a process called reconciliation to efficiently update the actual DOM. It compares the new virtual DOM with the previous one, identifies the differences, and applies minimal updates to the actual DOM to reflect the changes.

9. **Event Handling and User Interaction:** React handles user interactions, such as clicks or keyboard input, by attaching event listeners to elements in the virtual DOM. When events occur, React triggers corresponding event handlers to update state or perform other actions.

10. **Efficient Rendering:** React optimizes rendering performance by minimizing DOM updates. It uses techniques like memoization, batching updates, and virtual DOM diffing to ensure efficient rendering and smooth user experience.

Readings:

- [How React works behind the Scene, a detailed explanation of loading a UI on screen by React.](https://medium.com/@navnit0707/how-react-works-behind-the-scene-a-detailed-explanation-of-loading-a-ui-on-screen-by-react-ccd62e27f631)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Quiz App](../011-quiz-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

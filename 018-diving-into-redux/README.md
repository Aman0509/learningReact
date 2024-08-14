# Diving into Redux (An Alternative to Context API)

| Contents                                                                    |
| :-------------------------------------------------------------------------- |
| [Another Look at State in React Apps](#another-look-at-state-in-react-apps) |

## Another Look at State in React Apps

Redux is a state management system designed to handle cross-component or application-wide state. It helps manage data that changes and impacts the application and what is displayed on the screen, across multiple components or even the entire app.

To clarify, we've already used state extensively in this course through the `useState` hook and `useReducer`. These hooks are essential for managing data that changes, for example, when a user clicks a button, leading to an updated UI. React’s state management hooks like `useState` allow us to inform React when data has changed so that it can update the UI accordingly. This is what we've been doing throughout the course, which is central to understanding what state is.

We can categorize state into three main types: **_local state_**, **_cross-component state_**, and **_app-wide state_**. These are not strict definitions but are commonly used terms, and quite helpful.

<img src="https://drive.google.com/uc?export=view&id=1OIIBu3ddPPUowTGWbBsxjp0S_30s9fHD" height="350" width="700" alt="academind slide">

**Local State**: Local state refers to data that changes and impacts the UI of a single component. For instance, when we listen to user input and store that input in a state variable with `useState`, or when a button toggles a detail view. Typically, local state is managed within a component using `useState`, or if the state is more complex, with `useReducer`.

**Cross-Component State:** Cross-component state affects multiple components. For example, consider a button that opens or closes a modal overlay. The modal component might interact with several other components, and the trigger to open the modal usually exists outside the modal itself. Conversely, the modal might be closed by a button inside it. In such cases, multiple components work together to manage this state. This can be implemented using `useState` or `useReducer`, but it often requires passing props and functions across components, a process known as prop drilling. While this approach works, it is more complex than managing local state.

**App-Wide State**: Sometimes, state affects not just multiple components but the entire application. This is referred to as app-wide state. A common example is user authentication: when a user logs in, it might change the navigation bar and impact other components that display more or less data based on the user’s status. App-wide state can also be managed with `useState` or `useReducer`, along with prop drilling, but this approach can become cumbersome.

To simplify managing cross-component and app-wide state, we previously learned about React Context, a built-in React feature that makes it easier to handle such state. Redux addresses the same issue. Both React Context and Redux are tools for managing cross-component and app-wide state, which leads to an important question: if we already have React Context, why do we need Redux?

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Food Order App](../017-food-order-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

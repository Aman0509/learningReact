# Diving into Redux (An Alternative to Context API)

| Contents                                                                    |
| :-------------------------------------------------------------------------- |
| [Another Look at State in React Apps](#another-look-at-state-in-react-apps) |
| [Redux vs React Context](#redux-vs-react-context)                           |
| [How Redux Works](#how-redux-works)                                         |
| [Exploring the Core Redux Concepts](#exploring-the-core-redux-concepts)     |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Another Look at State in React Apps

Redux is a state management system designed to handle cross-component or application-wide state. It helps manage data that changes and impacts the application and what is displayed on the screen, across multiple components or even the entire app.

To clarify, we've already used state extensively in this course through the `useState` hook and `useReducer`. These hooks are essential for managing data that changes, for example, when a user clicks a button, leading to an updated UI. React’s state management hooks like `useState` allow us to inform React when data has changed so that it can update the UI accordingly. This is what we've been doing throughout the course, which is central to understanding what state is.

We can categorize state into three main types: **_local state_**, **_cross-component state_**, and **_app-wide state_**. These are not strict definitions but are commonly used terms, and quite helpful.

<img src="https://drive.google.com/uc?export=view&id=1OIIBu3ddPPUowTGWbBsxjp0S_30s9fHD" height="350" width="700" alt="academind slide">

**Local State**: Local state refers to data that changes and impacts the UI of a single component. For instance, when we listen to user input and store that input in a state variable with `useState`, or when a button toggles a detail view. Typically, local state is managed within a component using `useState`, or if the state is more complex, with `useReducer`.

**Cross-Component State:** Cross-component state affects multiple components. For example, consider a button that opens or closes a modal overlay. The modal component might interact with several other components, and the trigger to open the modal usually exists outside the modal itself. Conversely, the modal might be closed by a button inside it. In such cases, multiple components work together to manage this state. This can be implemented using `useState` or `useReducer`, but it often requires passing props and functions across components, a process known as prop drilling. While this approach works, it is more complex than managing local state.

**App-Wide State**: Sometimes, state affects not just multiple components but the entire application. This is referred to as app-wide state. A common example is user authentication: when a user logs in, it might change the navigation bar and impact other components that display more or less data based on the user’s status. App-wide state can also be managed with `useState` or `useReducer`, along with prop drilling, but this approach can become cumbersome.

To simplify managing cross-component and app-wide state, we previously learned about React Context, a built-in React feature that makes it easier to handle such state. Redux addresses the same issue. Both React Context and Redux are tools for managing cross-component and app-wide state, which leads to an important question: if we already have React Context, why do we need Redux?

## Redux vs React Context

### State Management Scope

- **Redux**: A comprehensive state management system designed specifically for handling cross-component or application-wide state. It centralizes the state management, making it easier to manage and scale as your application grows.

- **React Context**: A built-in feature in React that allows for managing state across multiple components, avoiding the need for prop drilling. It's ideal for simpler or smaller applications but can become unwieldy as the application complexity increases.

### Complexity of Setup

- **Redux**: While Redux adds a layer of complexity with its setup, it offers a clear and consistent pattern for state management, which can be beneficial for larger or enterprise-level applications.

- **React Context:** React Context can lead to a complex setup in large applications, especially when managing multiple contexts. This can result in deeply nested JSX code and multiple Context Providers, making the codebase harder to maintain. Alternatively, using a single, large Context Provider can also become difficult to manage due to its broad scope.

  |                                                                                                                                         |                                                                                                                                         |
  | :-------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
  | <img src="https://drive.google.com/uc?export=view&id=1Vbqu6z3mYL-DwhQ3JTooIvAjbL-M06WQ" height="350" width="700" alt="academind slide"> | <img src="https://drive.google.com/uc?export=view&id=1O4sKMxdiuga0GksU-QisrDLp7GhR3q0s" height="350" width="700" alt="academind slide"> |

### Performance

- **Redux**: Optimized for high-frequency state changes, making it suitable for applications where state updates occur frequently.

- **React Context**: Best suited for low-frequency updates, such as theme changes or authentication state. For high-frequency updates, React Context can lead to performance issues, as it is not as efficient in handling frequent state changes compared to Redux.

### Flexibility

- **Redux**: Primarily used for application-wide state management, but can also be combined with React Context for more granular state management in specific parts of an application.

- **React Context**: More flexible in smaller applications, allowing for easier and more intuitive state management. However, its limitations become apparent in larger applications with complex state needs.

### When to Use:

- **Redux**: Ideal for large, complex, or enterprise-level applications where state management needs to be highly organized and scalable.
- **React Context**: Suitable for small to medium-sized applications where the complexity of state management is lower, and the performance demands are not as high.

While both Redux and React Context are powerful tools for managing state in React applications, they serve different purposes and are suited to different types of projects. Redux excels in larger applications with complex state needs and high-frequency updates, while React Context is more appropriate for simpler applications where these challenges are not as prominent. Depending on the specific needs of your project, you might use one or the other, or even both in conjunction.

## How Redux Works

Redux is a state management library that centralizes the state of an application into a single, central store. Here’s how it works:

<img src="https://drive.google.com/uc?export=view&id=1yIGopbarGA-xAYIVz29wCDKHVSP7VV3L" height="350" width="700" alt="academind slide">

1. **Central Data Store**

   - **One Store**: Redux provides a single store where all the application state is kept. This store contains all the global state like authentication status, theme settings, user inputs, etc. This approach ensures that the state is consistent and easily manageable across the entire application.

2. **Components Subscribing to the Store**

   - **Data Access**: Components in the application subscribe to this central store to access the state they need. For example, if a component needs to know whether a user is authenticated, it can subscribe to the authentication state in the store.

   - **Reacting to State Changes**: Whenever the state in the store changes, the components that subscribe to it are notified so they can update their UI accordingly.

3. **Changing the State**

   <img src="https://drive.google.com/uc?export=view&id=1QUrYFxiph-NmtmUPWAOnu-qgvWwRAkcH" height="350" width="700" alt="academind slide">

   - **Reducers**: Components in the application do not directly modify the state in the store. Instead, they use reducers, which are special functions responsible for updating the state in the store.

   - **What are Reducers?**: A reducer is a function that takes the current state and an action, and then returns a new state. The term "reducer" comes from the concept of reducing multiple inputs into a single output. In Redux, reducers take the current state and an action, and return a new state that will replace the old state in the store.

4. **Dispatching Actions**

   - **Actions**: When a component needs to trigger a state change (for example, in response to a user clicking a button), it dispatches an action. An action is a plain JavaScript object that describes the type of operation to be performed on the state.

   - **Action Flow**: The action is sent to the reducer, which interprets the action and decides how to modify the state based on the action's description. The reducer then returns the new state, which replaces the old state in the store.

5. **Updating the UI**

   - **Notification to Components**: Once the state is updated in the store, any components that are subscribed to that part of the state are automatically notified. They can then retrieve the updated state and re-render the UI as needed.

This is the basic flow of how Redux works: a single store holds the state, components subscribe to the store to access state, and actions are dispatched to reducers to update the state, which then updates the subscribing components.

## Exploring the Core Redux Concepts

To begin exploring the basics of Redux, setup a brand-new project. Please note it's not a React project rather we will use node and work with Redux library.

1.  For that, create an empty folder and inside it, create a new JavaScript file, and feel free to name it anything you like, let's say, `redux-demo.js`. We will run this file using Node.js since it allows us to execute JavaScript outside of a browser environment.

2.  At this folder level, open a terminal or command prompt and initialize the project by running `npm init`. To skip the prompts, you can use `npm init -y`, which automatically answers all questions with the default settings. This creates a `package.json` file, although not particularly interesting for now, it’s necessary for installing third-party packages.

3.  Next, we install Redux by running `npm install redux`. Now, we’re ready to start using Redux.

4.  In the `redux-demo.js` file, we need to import Redux. Since we’ll run the file with Node.js, the import syntax will look a little different than what you might be used to. We import Redux like this:

    ```js
    const redux = require("redux");
    ```

5.  With Redux imported, we need to do a few things:

    - Create a reducer function — responsible for changing the store’s state.
    - Create the store — the central piece of Redux.
    - Set up a subscription to the store.
    - Dispatching actions

      ```js
      const redux = require("redux");
      const initialState = { counter: 0 };

      const counterReducer = (state = initialState, action) => {
        switch (action.type) {
          case "INCREMENT":
            return { ...state, counter: state.counter + 1 };
          default:
            return state;
        }
      };

      const store = createStore(counterReducer);

      store.subscribe(() => console.log(store.getState()));

      store.dispatch({ type: "INCREMENT" });
      ```

      [Here's another example for reference](projects/redux-basics/redux-demo.js)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Food Order App](../017-food-order-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

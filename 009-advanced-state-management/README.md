# React's Context API & `useReducer` - Advanced State Management

| Contents                                                                                                 |
| :------------------------------------------------------------------------------------------------------- |
| [Prop Drilling: Component Composition as a Solution](#prop-drilling-component-composition-as-a-solution) |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Prop Drilling: Component Composition as a Solution

Prop drilling occurs when you need to pass data through several layers of components that don't directly use the data themselves. They simply act as "pass-through" points to get the data down to the component that actually needs it.

**Example: Classic Prop Drilling**

```javascript
function GrandparentComponent() {
  const [username, setUsername] = useState("Alice");

  return <ParentComponent username={username} />;
}

function ParentComponent({ username }) {
  return <ChildComponent username={username} />;
}

function ChildComponent({ username }) {
  return <div>Hello, {username}!</div>;
}
```

In this scenario, the `username` prop is passed down from `GrandparentComponent` through `ParentComponent` and finally into `ChildComponent`. The intermediate `ParentComponent` doesn't need the `username` itself; it's merely a conduit.

### Why is Prop Drilling an Issue?

- **Code Readability:** It makes the flow of data harder to follow and reason about.
- **Maintenance:** Changing the structure of your components or the shape of the data requires updates in multiple places.
- **Testability:** Intermediate components become more difficult to test in isolation, as they inherit unnecessary dependencies.

### Component Composition: The Solution

Component composition involves creating smaller, more focused components and nesting them to pass data directly where needed. This is often done using React's `children` prop.

**Example: Solving Prop Drilling with Composition**

```javascript
function GrandparentComponent() {
  const [username, setUsername] = useState("Alice");

  return (
    <ProfileSection>
      <UsernameDisplay username={username} />
    </ProfileSection>
  );
}

function ProfileSection({ children }) {
  return <div className="profile">{children}</div>;
}

function UsernameDisplay({ username }) {
  return <div>Hello, {username}!</div>;
}
```

- **ProfileSection:** This component now acts as a structural wrapper and uses `children` to render whatever is passed into it.
- **Direct Delivery:** The `UsernameDisplay` component is nested directly inside `ProfileSection`, making the data flow more streamlined.

**_We've solved part of the problem with prop drilling, which is good. But the downside is that we shouldn't use this solution for all our components. If we do, all our components will end up inside the main app component, making it very big and messy._**

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Project Management App](../008-project-management-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

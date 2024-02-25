# Working with Refs & Portals

| Contents                                                                                                                |
| :---------------------------------------------------------------------------------------------------------------------- |
| [Introducing Refs](#introducing-refs)                                                                                   |
| [Manipulating the DOM via Refs](#manipulating-the-dom-via-refs)                                                         |
| [Refs vs State Values](#refs-vs-state-values)                                                                           |
| [Using Refs for more than "DOM Element Connections"](#using-refs-for-more-than-dom-element-connections)                 |
| [Forwarding Refs to Custom Components](#forwarding-refs-to-custom-components)                                           |
| [Exposing Component APIs via the `useImperativeHandle` hook](#exposing-component-apis-via-the-useimperativehandle-hook) |
| [Introducing & Understanding Portals](#introducing--understanding-portals)                                              |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Introducing Refs

Refs in React are short for references. As the name suggests, they allow you to reference and interact with DOM nodes or React components directly. Refs come in handy when you need to reference some information in a component, but you don’t want that information to trigger new renders.

**What Refs Are:**

- **Special Values:** Refs are special values in React that allow you to directly access DOM elements or React components.

- **Created with [`useRef`](https://react.dev/reference/react/useRef) Hook:** You create a ref using the `useRef` hook, which returns a mutable ref object:

  ```javascript
  const inputRef = useRef(null);
  ```

- `current` Property: The value of a ref is always an object with a `current` property holding the actual element or component instance. You can access the current value of that ref through the `inputRef.current` property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track.

- **Attached to Elements with `ref` Prop:** You attach a ref to a JSX element using the `ref` prop:

  ```javascript
  <input type="text" ref={inputRef} />
  ```

- **Not for State Management:** Refs should primarily be used for direct DOM manipulation or integrating with third-party libraries. Use state for data that drives UI updates.

Here's a basic example illustrating how refs work in React:

```javascript
import React, { useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);
  const [displayText, setDisplayText] = useState("");

  const handleButtonClick = () => {
    setDisplayText(inputRef.current.value);
  };

  return (
    <div>
      <h1>Display Text Example</h1>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={handleButtonClick}>Display Text</button>
      {displayText && <h2>Text entered: {displayText}</h2>}
    </div>
  );
}

export default App;
```

In this example:

- We have an input field that captures user input.
- When the button is clicked (`handleButtonClick`), it sets the `displayText` state to the value entered in the input field (`inputRef.current.value`).
- The `displayText` is displayed in an `<h2>` element if it exists (i.e., if there is text entered in the input field).

Readings:

- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [React Refs – A Complete Guide](https://codedamn.com/news/reactjs/react-refs-a-complete-guide)

## Manipulating the DOM via Refs

- **Direct DOM Manipulation:** Refs allow you to directly interact with DOM elements outside React's typical declarative paradigm.
- **Trade-offs:** While refs can be useful for specific tasks, it's essential to balance their benefits with potential drawbacks.
- **Declarative vs. Imperative:** React generally promotes a declarative approach, where you describe the desired UI state, and React handles updates. Refs introduce imperative code, where you directly control DOM elements.
- **Judicious Use:** Use refs sparingly and for appropriate use cases to avoid overstepping React's control and potentially hindering its optimizations.

**Example: Clearing an Input**

1. Create a ref:

   ```javascript
   const inputRef = useRef(null);
   ```

2. Attach it to the input:

   ```javascript
   <input type="text" ref={inputRef} />
   ```

3. Clear the input on a button click:

   ```javascript
   function handleClick() {
     inputRef.current.value = ""; // Clear input value - Imperative Approach
   }
   ```

In above example, we're just clearing the input which is not really connected to any other state. Writing this way in imperative approach can be considered in scenario like this since it allows to save writing lot of code.

But you should definitely be careful that you don't start using refs to read and manipulate all kinds of values on your page because that's really not the idea behind React.

## Refs vs State Values

<img src="https://drive.google.com/uc?export=view&id=1cU34tuzbmTo2Pj7FeXkU3SKxnGpCxgpj"  height="350" width="700" alt="academind slide">

Here's a breakdown of the differences between Refs and State in React:

<table>
  <thead>
		<tr>
			<th>Basis</th>
			<th>State</th>
			<th>Refs</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Purpose</th>
			<td>
				Manages data that drives UI updates and re-renders. Changes to state trigger re-rendering of the component and its children.
			</td>
			<td>
				Provide direct access to DOM elements or component instances, primarily for:
					<ul>
						<li>
							Direct DOM manipulation (e.g., focusing elements, measuring dimensions)
						</li>
						<li>
							Integrating third-party libraries that require DOM access
						</li>
					</ul>
			</td>
		</tr>
		<tr>
			<th>Creation</th>
			<td>
				Use the <code>useState</code> hook to create state variables:
				<pre>
					const [count, setCount] = useState(0);
				</pre>
			</td>
			<td>
				Use the <code>useRef</code> hook to create refs:
				<pre>const inputRef = useRef(null);</pre>
			</td>
		</tr>
		<tr>
			<th>Attachment</th>
			<td>
				Pass state values to elements using props:
				<pre>&lt;p&gt;You clicked {count} times&lt;/p&gt;</pre> 
			</td>
			<td>
				Attach refs to elements using the <code>refs</code> prop: <pre>&lt;input type="text" ref={inputRef} /&gt;</pre>
			</td>
		</tr>
		<tr>
			<th>Accessing Values</th>
			<td>
				Access state values directly:
				<pre>const doubleCount = count * 2;</pre>
			</td>
			<td>
				Access the referenced element or component instance through the <code>current</code> property:
				<pre>inputRef.current.focus();</pre>
			</td>
		</tr>
		<tr>
			<th>Triggering Re-renders</th>
			<td>
				Updating state values triggers a re-render of the component and its children, reflecting changes in the UI.
				<pre>
					setCount(count + 1);
				</pre>
			</td>
			<td>
				Updating a ref's value does not trigger a re-render.
			</td>
		</tr>
		<tr>
			<th>Example</th>
			<td>
				Counting clicks:
				<pre>
					function Counter() {
    				const [count, setCount] = useState(0);
						const handleClick = () => {
								setCount(count + 1);
						};
					return (
        		&lt;div&gt;
            	&lt;p&gt;You clicked {count} times&lt;/p&gt;
            	&lt;button onClick={handleClick}>Click me&lt;/button&gt;
        		&lt;/div&gt;
    				);
					}
				</pre>
			</td>
			<td>
				Focusing an Input:
				<pre>
					function MyComponent() {
    				const inputRef = useRef(null);
						const handleClick = () => {
        			inputRef.current.focus();
    				};
    				return (
						&lt;div&gt;
								&lt;input type="text" ref={inputRef} /&gt;
								&lt;button onClick={handleClick}>Focus input&lt;/button&gt;
						&lt;/div&gt;
    				);
					}
				</pre>
			</td>
		</tr>
	</tbody>
</table>

## Using Refs for more than "DOM Element Connections"

- **Refs for Non-DOM Values:** While refs are often used to access DOM elements, they can also store any kind of mutable value that needs to persist across renders without triggering re-renders.
- **Persistence Across Renders:** React maintains ref values even when a component re-renders, ensuring data isn't lost.
- **Instance-Specific Values:** Refs defined within a component function are unique to each component instance, allowing independent values for multiple instances.

Checkout the [starter-project](./projects/01-starting-project/) to understand this concept.

## Forwarding Refs to Custom Components

In React, forwarding refs is a technique that allows a parent component to pass its ref to a child component. This is particularly useful when you want to access or manipulate the child component's DOM element from the parent component. Forwarding refs is commonly used when you are working with custom components or higher-order components.

**How Forwarding Works:**

1. **Attach Ref to Custom Component:**

   - Attach a ref to the custom component using the `ref` prop.
   - React passes this ref as a special prop ([`forwardedRef`](https://react.dev/reference/react/forwardRef)) to the custom component.

2. **Forward Ref to Child:**

   - Within the custom component, use `React.forwardRef` to "forward" the ref to a specific child element or component.
   - This connects the ref to the desired element or component instance.

**Example:**

```javascript
// Custom input component with ref forwarding
const CustomInput = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} {...props} />;
});

// Using the custom component and accessing its input element
function MyComponent() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

**Key Points:**

- **`React.forwardRef:`** This function creates a component that can accept a ref and forward it to a child.
- **Ref as Prop:** React passes the ref as a prop (forwardedRef) to the custom component.
- **`ref` Argument:** The forwardRef function's second argument (ref) receives the forwarded ref.
- **Accessing Child Elements:** You can now access the child element's methods and properties using the ref attached to the custom component.

Readings:

- [Forwarding Refs](https://legacy.reactjs.org/docs/forwarding-refs.html)
- [Forwarding refs to components](https://medium.com/@mariokandut/forwarding-refs-to-components-85e4fd315ab9)
- [How to use forwardRef in React](https://blog.logrocket.com/use-forwardref-react/#:~:text=Forwarding%20refs%20in%20React%20using%20forwardRef,-When%20a%20child&text=The%20technique%20is%20called%20ref,ref%20to%20a%20child%20component.)

## Exposing Component APIs via the [`useImperativeHandle`](https://react.dev/reference/react/useImperativeHandle) hook

The purpose of exposing a component API is to provide a clear and stable interface for interacting with a component from the outside, without exposing the internal implementation details. This practice enhances the encapsulation of a component, allowing developers to interact with it through a well-defined set of methods or properties.

**Key Points:**

- **Purpose:** To expose specific properties or methods of a component to be accessed and called imperatively from outside the component using a ref.

- **Usage:** Often used for:

  - Creating custom components with imperative actions (e.g., opening a modal dialog).
  - Interacting with third-party libraries that require direct DOM access.

- **Relationship with `forwardRef`:** Frequently used together to forward a ref to a component while also defining an API for external interaction.

**Example:**

```javascript
// ResultModal component (using forwardRef and useImperativeHandle)
const ResultModal = React.forwardRef((props, ref) => {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  return <dialog ref={dialogRef}>{/* Modal content */}</dialog>;
});

// TimerChallenge component (using the ref)
const TimerChallenge = () => {
  const dialogRef = useRef(null);

  const handleStart = () => {
    // ...
    dialogRef.current.open(); // Call the exposed 'open' method
  };

  return (
    <div>
      {/* ... */}
      <ResultModal ref={dialogRef} />
      <button onClick={handleStart}>Start</button>
    </div>
  );
};
```

1. **Forward Ref to Component:** Use `React.forwardRef` to create the `ResultModal` component, accepting a ref.

2. **Use `useImperativeHandle`:** Inside `ResultModal`, call `useImperativeHandle` with two arguments:

   - The forwarded ref received from `forwardRef`.
   - A function that returns an object containing the exposed API.

3. **Expose Methods and Properties:**

   - In the object returned by the function, define the methods or properties to be exposed (e.g., `open`).
   - These methods can access and manipulate the component's internal state or DOM elements.

4. **Attach Ref and Call Exposed Methods:**
   - In the parent component (`TimerChallenge`), attach a ref to the `ResultModal` component.
   - Use the ref's current property to access the exposed methods and call them (e.g., `dialog.current.open()`).

**Benefits:**

- **Encapsulation:** Controls how a component is interacted with from outside, promoting better organization and maintainability.
- **Flexibility:** Allows for more imperative interactions with components when necessary, without relying solely on declarative data flow.
- **Reusability:** Components can be reused in different contexts while maintaining a consistent API for interaction.

Readings:

- [Understanding useImperativeHandle: A Powerful Hook for React Development](https://medium.com/@nadeem.ahmad.na/understanding-useimperativehandle-a-powerful-hook-for-react-development-46063e44e52a)
- [React Hooks Explained: useImperativeHandle](https://dev.to/anikcreative/react-hooks-explained-useimperativehandle-5g44)

## Introducing & Understanding Portals

- Portals are a feature of React that allow you to render components outside the normal DOM hierarchy of the parent component.

- This means you can place components anywhere in the DOM, regardless of their location in your JSX code.

**Why use Portals?**

- **Modals and Overlays:** Portals can be useful for rendering components that need to break out of the component’s container, such as modals, tooltips, or popups.

- **Accessibility & Styling:** They are particularly useful for scenarios where rendering content in its original position might lead to styling or accessibility issues.

**How to use Portals?**

- To use portals, you need to import the [`createPortal`](https://react.dev/reference/react-dom/createPortal) function from `react-dom`. This function allows you to create a portal and specify the target element in the HTML where the content should be rendered.

  ```javascript
  import { createPortal } from "react-dom";
  ```

- Create the JSX code for the component's content.

- Use `createPortal` to wrap the JSX code and specify the target element using `document.getElementById`.

**Example:**

Consider a scenario where a modal component is visually placed next to a section in the UI, but for better organization and accessibility, it would be more logical to render the modal at a higher level in the HTML structure, such as directly inside the `<body>` or a specific container `<div>`.

```javascript
import { createPortal } from "react-dom";

const ResultModal = () => {
  // JSX code for the modal content

  return createPortal(
    // JSX code to be teleported
    <dialog>{/* Modal content */}</dialog>,
    // Target element where the content should be rendered
    document.getElementById("modal")
  );
};
```

In the example, a `<div>` with the ID of `modal` is added to serve as the target element.

```HTML
<!-- In the index.html file -->
<div id="modal"></div>
```

Readings:

- [A Guide to React Portals](https://semaphoreci.com/blog/react-portals)
- [Learn React Portals by example](https://blog.logrocket.com/learn-react-portals-example/)
- [Digging Deeper Into React Portals With Examples](https://betterprogramming.pub/digging-deeper-into-react-portals-with-examples-937f925edfa4)
- [Portals in React: Creating Powerful UI Overlays and Modal Dialogs](https://medium.com/@greennolgaa/portals-in-react-creating-powerful-ui-overlays-and-modal-dialogs-d75b42606edd)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Debugging React Apps](../006-debugging-react-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Practice Project: Project Management App <img align="center" src="../images/right_arrow.png" height="20" width="20"/>](../008-project-management-app/README.md)

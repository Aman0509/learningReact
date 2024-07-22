# Working with Forms & User Input

| Contents                                                                                                                |
| :---------------------------------------------------------------------------------------------------------------------- |
| [What are Forms and What's tricky about them ?](#what-are-forms-and-whats-tricky-about-them-)                           |
| [Handling Form Submission](#handling-form-submission)                                                                   |
| [Managing & Getting User Input via State & Generic Handlers](#managing--getting-user-input-via-state--generic-handlers) |
| [Getting User Input via Refs](#getting-user-input-via-refs)                                                             |
| [Getting Values via `FormData` & Native Browser APIs](#getting-values-via-formdata--native-browser-apis)                |
| [Resetting Forms](#resetting-forms)                                                                                     |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## What are Forms and What's tricky about them ?

<img src="https://drive.google.com/uc?export=view&id=1m0hyZPGLxWLsvoMdPU2mykSzELxbqkwf" height="350" width="700" alt="academind slide">

Forms are crucial in web development but can be challenging due to two main tasks: handling submission and validating user input. A form consists of input fields and labels wrapped by the HTML form element. Handling submission and extracting user data can be done via state management, refs, or browser features like the form data object.

The tricky part is validation, aiming to provide a good user experience. Validation can occur on every keystroke, when an input field loses focus, or upon form submission. Each approach has drawbacks, such as showing errors too early, too late, or for too long. This course section will explore these approaches and their combinations to help you choose and implement the best validation strategy for your app and users.

## Handling Form Submission

This section covers how to handle form submissions in React, specifically preventing the default behavior and extracting user-entered data.

- **Special Props:**

  - Use `htmlFor` instead of `for` for label elements in React. It is similar to the case where we use `className` instead of `class` for CSS classes due to JavaScript reserved names.

- **Handle Form Submission:**

  - Buttons in forms element by default submit the form (HTTP request sent to the server on which website is hosted), causing a page reload.

    <img src="https://drive.google.com/uc?export=view&id=1q9lzPlhFmWmsNELmPAameNnFsmsf-VA1" height="350" width="700" alt="academind slide">

  - This might not be desirable in React apps as the server might not be prepared to handle the request.

    ```jsx
    function handleSubmit() {
      console.log("Submitted");
    }
    <button onClick={handleSubmit}>Login</button>;
    ```

  - Page reloads upon form submission.

- **Prevent Default Behavior:**

  - Option 1: Set `type="button"` on the submit button to prevent form submission.

    ```jsx
    <button type="button" onClick={handleSubmit}>
      Login
    </button>
    ```

  - Option 2: Use the form's `onSubmit` event handler.

    ```jsx
    function handleSubmit(event) {
      event.preventDefault();
      console.log("Submitted");
    }
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>;
    ```

After handling form submission, the next step involves extracting user input values for validation or packaging them into HTTP requests to send to a backend. This pattern is common in React apps for handling and processing form data.

<img src="https://drive.google.com/uc?export=view&id=1fdSfeB1VkfkjkS_AqR7JpxwzGr9FBsqk" height="350" width="700" alt="academind slide">

Readings:

- [How to handle forms in React ?](https://www.geeksforgeeks.org/how-to-handle-forms-in-react/)
- [React Basics: React Forms Examples](https://www.telerik.com/blogs/react-basics-react-forms-examples)

## Managing & Getting User Input via State & Generic Handlers

Managing and getting user input via state and generic handlers in React involves using the `useState` hook to maintain the input values and a generic event handler to update these values. This approach makes your code more reusable and easier to manage, especially when dealing with multiple input fields.

Here's a step-by-step explanation with an example:

1. **Set up the component and state:**

   - Use the `useState` hook to create state variables for each input field.
   - Initialize the state with an object where the keys correspond to the input field names.

2. **Create a generic handler function:**

   - The generic handler function will be used for all input fields.
   - It will update the state based on the input field's name and value.

3. **Bind the handler to the input fields:**

   - Use the `onChange` event to call the generic handler function whenever the input value changes.

4. **Extract and use the input values:**

   - Use the state variables to access the input values as needed (e.g., on form submission).

**Example:**

```jsx
import React, { useState } from "react";

function LoginForm() {
  // Step 1: Set up the component and state
  // Initializes the state with empty strings for username and password.
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Step 2: Create a generic handler function
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from the event target (input field).
    setFormData({
      ...formData, // Updates the state using the spread operator to maintain existing state values and update only the changed field.
      [name]: value,
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior.
    console.log("Form submitted:", formData);
    // You can send formData to a backend or perform other actions here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Step 4: Bind the handler to the input fields */}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

This approach makes it easy to manage and retrieve user input in React applications, keeping the code clean and maintainable.

## Getting User Input via Refs

Refs are a mechanism in React that allows you to directly access DOM elements created by JSX components. Therefore, using refs to get user input involves creating a reference to an input element and accessing its value directly. This approach can be useful in certain situations but also comes with some drawbacks.

### Using Refs to Get User Input

1. **Set up the ref:** Use the `useRef` hook to create a reference to the input element.
2. **Attach the ref to the input element:** Use the `ref` attribute to attach the created reference to the input element.
3. **Access the ref value:** Use the reference to access the input value when needed, such as during form submission.

**Example:**

```jsx
import { useRef } from "react";

function LoginForm() {
  // Step 1: Set up the ref
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Step 3: Access the ref value during form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log("Form submitted:", { username, password });
    // You can send the input values to a backend or perform other actions here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Step 2: Attach the ref to the input elements */}
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameRef} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

### Pros and Cons of Using Refs

**Pros**

- **Direct Access:** Provides direct access to the DOM element, which can be useful for tasks like focusing an input or interacting with third-party libraries.
- **No State Management:** Avoids the need to manage input state, which can simplify the component in some cases.
- **Simplicity:** In scenarios where you need to quickly grab a value without involving state, refs can be simpler.

**Cons**

- **Less React-ish:** Contrary to the React philosophy of declarative programming and state management, it essentially involves manual DOM manipulation, which increases the likelihood of errors.
- **Re-renders:** Changes to the input value do not trigger component re-renders, making it harder to keep the UI in sync with the state.
- **Limited Usefulness:** Not suitable for complex forms or cases where you need to react to input changes dynamically.
- **Potential for Side Effects:** Updating the DOM directly using Refs can introduce side effects that might not be easily tracked or managed in a React component's lifecycle.

### When to Use Refs

- **Focus Management:** When you need to programmatically focus an input field (e.g., when a form loads).

```jsx
import React, { useRef, useEffect } from "react";

function LoginForm() {
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameRef} />
      </div>
    </form>
  );
}

export default LoginForm;
```

- **Interacting with Third-Party Libraries**: When a third-party library requires direct DOM access.
- **Simple Forms:** When dealing with very simple forms where state management is unnecessary.

## Getting Values via `FormData` & Native Browser APIs

Using [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and native browser APIs provides a convenient way to extract user input values, especially in complex forms. This method leverages the browser's built-in functionality to handle form data efficiently.

### Example: Using `FormData` in a React Component

Let's consider sign up (`SignUp.jsx`) form example.

1. **Form Structure:** Ensure each input element defined in `form` element must have `name` attribute. This is crucial for `FormData` to extract values correctly.

2. **Form Submission Handling:**

   - Use an `onSubmit` event handler to handle form submission.
   - Prevent the default form submission behavior to manage the data within React.

3. **Using `FormData` to Extract Values:**

   - Create a `FormData` object from the form element.
   - Use `FormData` methods to extract values.

```jsx
// SignUp.jsx

function SignUp() {
  // Step 2: Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target); // Create a FormData object from the form

    // Step 3: Extract values
    const data = Object.fromEntries(formData.entries()); // Convert FormData entries to an object
    // Check out other methods as well

    // Handle multi-value input fields (e.g., checkboxes)
    const acquisitionChannel = formData.getAll("acquisition");
    data.acquisition = acquisitionChannel; // Add multi-value input to data object

    console.log("Form submitted:", data);
    // You can send the form data to a backend or perform other actions here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Step 1: Form structure with name attributes */}
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <label>How did you find us?</label>
        <div>
          <label>
            <input type="checkbox" name="acquisition" value="friends" /> Friends
          </label>
          <label>
            <input type="checkbox" name="acquisition" value="search" /> Search
            Engine
          </label>
          <label>
            <input type="checkbox" name="acquisition" value="ads" />{" "}
            Advertisements
          </label>
        </div>
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUp;
```

## Resetting Forms

Resetting a form is a common requirement in web applications, and there are several ways to achieve this in React. Let's explore the various methods, along with simple examples for each approach.

### 1. Using the Reset Button with `type="reset"`

The simplest way to reset a form is by using a button with the type attribute set to reset. This is a built-in HTML feature that automatically clears the form inputs when clicked.

```jsx
import React from "react";

function SimpleResetForm() {
  return (
    <form>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="reset">Reset</button>
    </form>
  );
}

export default SimpleResetForm;
```

### 2. Resetting Form State Programmatically

When managing form inputs with state, you can reset the form by setting the state values back to their initial state. This method is suitable when you need more control over the form's data.

```jsx
import React, { useState } from "react";

function StateResetForm() {
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <form>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default StateResetForm;
```

### 3. Resetting Inputs Using Refs

When using refs to manage input values, you can reset the form by setting the input elements' `value` property to empty strings. However, this is less recommended because it involves manual DOM manipulation, which goes against React's declarative approach.

```jsx
import React, { useRef } from "react";

function RefResetForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleReset = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <form>
      <input type="email" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default RefResetForm;
```

### 4. Using the Form `reset` Method with `FormData`

Another approach is to use the form's built-in `reset` method, which can be called programmatically. This method is often used in conjunction with event handling in React, providing a clean and less code-intensive way to reset the form.

```jsx
import React from "react";

function FormDataResetForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    // Process formData here
    form.reset(); // Reset the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" />
      <input type="text" name="lastName" />
      <input type="email" name="email" />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}

export default FormDataResetForm;
```

### Summary

- **Reset Button (`type="reset"`)**: Simplest method, automatically resets form inputs.
- **State Management**: Resets form by resetting state values, provides more control.
- **Refs**: Directly manipulates the DOM to reset inputs, less recommended.
- **Form `reset` Method**: Clean and concise, leverages native browser APIs to reset the form.

Each method has its use cases, and the choice of which to use depends on the specific requirements of your application and the level of control you need over the form's behavior.

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Building Custom React Hooks](../015-custom-react-hooks/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

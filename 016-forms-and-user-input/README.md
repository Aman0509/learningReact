# Working with Forms & User Input

| Contents                                                                                      |
| :-------------------------------------------------------------------------------------------- |
| [What are Forms and What's tricky about them ?](#what-are-forms-and-whats-tricky-about-them-) |
| [Handling Form Submission](#handling-form-submission)                                         |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Building Custom React Hooks](../015-custom-react-hooks/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

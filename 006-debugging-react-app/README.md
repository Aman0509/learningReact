# Debugging React Apps

| Contents                                                                       |
| :----------------------------------------------------------------------------- |
| [Understanding React Error Message](#understanding-react-error-message)        |
| [Using the Browser Debugger & Breakpoints](#understanding-react-error-message) |
| [Understanding React's "Strict Mode"](#understanding-reacts-strict-mode)       |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Understanding React Error Message

When you encounter an error message in React, the approach you take to understand and resolve it can significantly impact your debugging process. Here's a step-by-step guide on how to approach React error messages:

1. **Stay Calm and Focus:**

- React error messages can sometimes appear daunting, but staying calm and focused is crucial. Don't panic; instead, approach the error systematically.

2. **Read the Error Message Thoroughly:**

- Start by carefully reading the error message displayed in your console or development environment.
- Focus on understanding the type of error reported (e.g., syntax error, component error, prop-related error, etc.).

3. **Identify the Point of Failure:**

- Note the specific file and line number where the error occurred. This information helps pinpoint the exact location in your codebase where the issue arises.

4. **Understand the Context:**

- Consider the circumstances leading to the error. Was it triggered by a specific action, a component mounting, or a state change?

5. **Look for Clues in the Stack Trace:**

- Trace the stack trace backward to understand the sequence of function calls that led to the error. This sequence might contain references to your code, React internals, and third-party libraries.

6. **Pay Attention to Component Names:**

- If your error message references specific components or functions, pay close attention to them. Review their implementation and the data flow within these components.

7. **Check Props and State:**

- If the error involves components or their rendering, review the props and state being passed. Ensure they are correctly defined and used within the component.

8. **Consult Documentation and Resources:**

- Refer to React's official documentation for information about the reported error type.
- Search online forums, communities, or relevant documentation to find solutions others might have used for similar issues.

9. **Use Debugging Tools and Techniques:**

- Leverage browser developer tools to inspect the component tree, monitor state changes, and examine network requests.
- Introduce console logs or breakpoints strategically within your code to track the flow of data and identify potential issues.

10. **Implement Trial and Error:**

- If you have hypotheses about what might be causing the error, make small changes in your code based on these assumptions. Test and observe the impact to validate or invalidate your hypotheses.

11. **Implement Error Boundaries:**

- Use error boundaries in your application to catch errors and prevent the entire app from crashing due to a single component failure.

12. **Persist and Iterate:**

- Don't give up easily. Debugging can involve a series of steps, so persist in your troubleshooting efforts. Iterate through different approaches until you identify and resolve the issue.

13. **Learn from the Experience:**

- Each error presents an opportunity to learn. Reflect on how you resolved the issue and what you learned in the process. It'll help you tackle similar issues more effectively in the future.

## Using the Browser Debugger & Breakpoints

Please refer below readings to understand about the working of browser developer tools.

Readings:

- [A Beginner’s Guide to JavaScript Debugging in Chrome](https://coderpad.io/blog/development/javascript-debugging-in-chrome/)
- [Debugging in the browser](https://javascript.info/debugging-chrome)
- [Pause your code with breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints)

## Understanding React's "Strict Mode"

StrictMode is a development-only tool in React that helps identify potential problems in your code before they cause issues in production. Here's a summary of its key features:

**Purpose:**

- **Catches potential bugs early:** It reveals issues that might not be immediately apparent otherwise, leading to a more robust application.
- **Promotes best practices:** It encourages the use of modern React patterns and discourages outdated or unsafe practices.
- **Improves code quality:** By identifying potential problems early, it helps you write cleaner and more predictable React code.

**How It Works:**

- **Wrapping Components:** You typically wrap the root component of your application in `<StrictMode>` tags in your `index.jsx` file, but you can also use it selectively for specific components.

```javascript
<StrictMode>
  <YourApp />
</StrictMode>
```

- **Double Rendering:** During development, StrictMode triggers two renders for every component function it wraps. This double rendering can expose potential issues.

- **Additional Checks:** It performs other checks, such as:
  - Warning about legacy lifecycle methods that might be unsafe.
  - Detecting usage of deprecated features.
  - Encouraging reusable state.

**Development-Only:**

- **No Production Impact:** StrictMode only runs in development mode and doesn't affect the production build of your app. It's designed to help you write better code during development, not to add overhead in production.

Readings:

- [What is Strict Mode in React?](https://dev.to/codeofrelevancy/what-is-strict-mode-in-react-3p5b)
- [What is StrictMode in React? - StackOverflow](https://stackoverflow.com/questions/53183362/what-is-strictmode-in-react)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Styling React Components](../005-styling-react-components/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

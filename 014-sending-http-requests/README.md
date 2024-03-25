# Sending HTTP Requests

| Contents                                                                  |
| :------------------------------------------------------------------------ |
| [Sending HTTP Request to Fetch Data](#sending-http-request-to-fetch-data) |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Sending HTTP Request to Fetch Data

- React applications rely on data to render dynamic content. This data can come from various sources, including backend services (APIs).
- Fetching data from backend APIs allows your React components to display up-to-date and user-specific information.

When attempting to fetch data within a component, it's important to employ `useEffect` to prevent any unintended side effects. This includes avoiding scenarios such as sending infinite requests to the endpoint.

When using `useEffect` in React to fetch data from a backend service, there are two common approaches: **_using Promises and using async/await._**

**Using Promises with `useEffect`:**

With this approach, you can use the fetch API or a library like Axios to make HTTP requests inside the `useEffect` hook. You attach a `.then()` method to the fetch call to handle the response asynchronously.

```javascript
import { useState, useEffect } from "react";

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <div>{/* Render data */}</div>;
}
```

**Using async/await with `useEffect`:**

This method provides a cleaner syntax by using the `async` keyword before the `useEffect` callback function and `await` before the fetch call. It enhances readability by handling asynchronous code in a synchronous manner.

```javascript
import { useState, useEffect } from "react";

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // you need to call it immediately
  }, []);

  return <div>{/* Render data */}</div>;
}
```

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Class Based Components (An Alternate Way of Building Components)](../013-class-based-components/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

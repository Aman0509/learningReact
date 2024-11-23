# Building a Multi-Page SPA with React Router

| Contents                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- |
| [Different Types of React Applications](#different-types-of-react-applications)                            |
| [Routing: Multiple Pages in Single-Page Applications](#routing-multiple-pages-in-single-page-applications) |
| [Defining Routes](#defining-routes)                                                                        |
| [Exploring an Alternative Way of Defining Routes](#exploring-an-alternative-way-of-defining-routes)        |
| [Navigating Between Pages with `Link`](#navigating-between-pages-with-link)                                |
| [Layouts & Nested Routes in React Router](#layouts--nested-routes-in-react-router)                         |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Different Types of React Applications

React offers flexibility for building various types of web applications, depending on the desired user experience, performance, and structure. Here are the primary types:

1. **Single Page Application (SPA)**

   - A traditional approach in React, where the application loads a single HTML page, and JavaScript handles content updates dynamically.
   - **How it Works**: The SPA doesn’t reload the page on each interaction; instead, it updates the view by changing components or sections, using client-side routing (like React Router).
   - **Benefits**: Faster navigation and more interactive experiences, as most resources are loaded once.
   - **Challenges**: SEO(Search Engine Optimization) can be limited because all content is loaded via JavaScript, though it can be mitigated with server-side rendering (SSR) or pre-rendering.

2. **Multi-Page Application (MPA)**

   - MPAs are traditional web applications where each page is a separate HTML document, ideal for larger sites with multiple unique pages.
   - **How it Works**: Every page load triggers a full request to the server for a new HTML document, making each page standalone.
   - **Benefits**:
     - SEO-friendly as search engines can easily index each page.
     - Faster initial load for individual pages.
   - **Challenges**:
     - Slower navigation due to full page reloads.
     - Higher server load and more complex maintenance for multiple pages.

3. **Server-Side Rendered (SSR) Apps**

   - Also called Universal or Isomorphic Apps, SSR applications render pages on the server instead of the client, allowing faster first-page loads and better SEO.
   - **How it Works**: Pages are rendered on the server based on requests, and the server sends a fully populated HTML page to the client.
   - **Benefits**: Better SEO and faster initial load time, especially for larger, content-heavy applications.
   - **Challenges**: Increased server load, and more complex setup. React frameworks like Next.js provide built-in SSR support.

4. **Static Site Generation (SSG)**

   - React apps are pre-rendered as static HTML files at build time, which are served directly to users.
   - **How it Works**: During the build, the application generates HTML files for each route, which are cached and served to users as static pages.
   - **Benefits**: Excellent SEO and lightning-fast loading times as pages are served as static HTML.
   - **Challenges**: Content is fixed at build time, so frequent data updates require regenerating the static pages. Next.js supports SSG with features for revalidation and incremental static regeneration.

5. **Progressive Web Applications (PWA)**

   - These are SPAs with added features that make them behave like native mobile apps, such as offline support and push notifications.
   - **How it Works**: PWAs use service workers, manifest files, and caching to deliver a reliable offline experience and enable installation on mobile devices.
   - **Benefits**: Offline functionality, push notifications, and a more app-like experience on mobile devices.
   - **Challenges**: Limited access to some device-specific APIs and features, though these limitations are narrowing as browsers improve PWA support.

6. **Hybrid (or Mixed) Apps**

   - A combination of SPA, SSR, and SSG, often used in large applications where different routes may benefit from different rendering techniques.
   - **How it Works**: Using frameworks like Next.js, some pages are server-rendered for SEO, some are pre-rendered for speed, and some are dynamically loaded as SPA.
   - **Benefits**: Flexibility to choose rendering based on route needs (e.g., blog pages can be statically generated, while dynamic user profiles use client-side rendering).
   - **Challenges**: Increased complexity in application architecture and dependency on frameworks that support mixed modes.

7. **Mobile Apps with React Native**

   - Using React Native, developers can build fully native mobile applications for iOS and Android with a shared React-based codebase.
   - **How it Works**: React Native uses native components rather than HTML, giving it better performance on mobile. React code can be shared across web and mobile versions using libraries like Expo.
   - **Benefits**: Native app performance and access to mobile device features, along with code reuse for both web and mobile platforms.
   - **Challenges**: Requires familiarity with mobile development and some platform-specific adaptations.

## Routing: Multiple Pages in Single-Page Applications

Routing in single-page applications (SPAs) refers to the ability to navigate between different "pages" or views within a SPA without requiring a full page reload. In a traditional multi-page application, each page is a separate HTML file that is loaded by the browser when the URL changes. In contrast, a SPA loads a single HTML file initially, and then uses JavaScript to dynamically update the content on the page as the user navigates.

|                                                                                                                                         |                                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=10JTI0k5ol0uZjuyIyFF6StHcMvLpCD3F" height="350" width="700" alt="academind slide"> | <img src="https://drive.google.com/uc?export=view&id=1RSXLq_k4yrqGCKOVF4Ao1ZeBGG7bdXOZ" height="350" width="700" alt="academind slide"> |

The key points about routing in SPAs are:

- **URL Changes**: In a SPA, the URL can change (e.g., the URL path changes) without causing a full page reload. This gives the illusion of navigating between different pages, even though the underlying HTML content is being updated dynamically.

- **Client-side Routing**: Routing in a SPA is handled on the client-side by JavaScript code, rather than by the server. When the URL changes, the client-side JavaScript code detects the change and updates the content accordingly, without triggering a full page reload.

- **Improved User Experience**: By avoiding full page reloads, client-side routing in SPAs can provide a more seamless and responsive user experience, as the user doesn't have to wait for a new page to load.

- **Single Initial Load**: In a SPA, the entire application is loaded initially, including the JavaScript code responsible for routing. Subsequent "page" changes only require updating the content, not loading new HTML files.

## Defining Routes

Defining routes means setting up specific paths for your react application and deciding which components should be displayed for each path.

To add routing to an application, follow these steps:

- **Define Routes**: Specify the URLs (paths) to support and map them to the components to load for each path.
- **Activate the Router**: Enable routing and load the defined routes into the application.
- **Ensure Navigation**: Provide the required components and implement navigation mechanisms to allow users to move seamlessly between pages.

This is done using the [react-router-dom](https://reactrouter.com/en/main) library.

- Make sure `react-router-dom` is installed:

  ```bash
  npm install react-router-dom
  ```

- Create components for each page in your app. For example:

  **Home.js**

  ```jsx
  const Home = () => <h1>Welcome to the Home Page</h1>;
  export default Home;
  ```

  **Product.js**

  ```jsx
  const Products = () => <h1>Products Page</h1>;
  export default Products;
  ```

- Use the [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router) function to define paths and associate them with components:

  ```jsx
  import { createBrowserRouter } from "react-router-dom";
  import Home from "./pages/Home";
  import Products from "./pages/Products";

  const router = createBrowserRouter([
    { path: "/", element: <Home /> }, // Root path loads Home component
    { path: "/products", element: <Products /> }, // '/products' loads Products component
  ]);
  ```

- Use the [`RouterProvider`](https://reactrouter.com/en/main/routers/router-provider) to activate and render the router:

  ```jsx
  import { RouterProvider } from "react-router-dom";
  import router from "./router";

  function App() {
    return <RouterProvider router={router} />;
  }

  export default App;
  ```

- Visiting `/` (e.g., `http://localhost:3000/`) displays the Home page.
- Visiting `/products` (e.g., `http://localhost:3000/products`) displays the Products page.

## Exploring an Alternative Way of Defining Routes

In React Router, there’s an alternative way to define routes using JSX code instead of an array of objects. This approach might feel familiar if you’ve worked with older versions of React Router.

Instead of defining routes as an array of objects, you can use the [`createRoutesFromElements`](https://reactrouter.com/en/main/utils/create-routes-from-elements) function along with the [`<Route>`](https://reactrouter.com/en/main/route/route) component. This allows you to write routes directly in JSX.

### Example

- **Create Pages**: Create your page components:

  **Home.js**

  ```jsx
  const Home = () => <h1>Welcome to the Home Page</h1>;
  export default Home;
  ```

  **Product.js**

  ```jsx
  const Products = () => <h1>Products Page</h1>;
  export default Products;
  ```

- **Define Routes Using JSX**: Use `createRoutesFromElements` to define routes with `<Route>` components:

  ```jsx
  import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import Home from "./pages/Home";
  import Products from "./pages/Products";

  const routes = createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </>
  );

  const router = createBrowserRouter(routes);
  ```

  - The `<Route>` component defines each route with two props:
  - path: The URL path (e.g., `/` or `/products`).
  - element: The React component to render for that path.
  - Routes are grouped using `<>` (React fragments) for cleaner JSX structure.
  - `createRoutesFromElements` converts the JSX into route definitions compatible with the router.

- **Activate the Router**: Use the `RouterProvider` to activate and render the router:

  ```jsx
  import { RouterProvider } from "react-router-dom";

  function App() {
    return <RouterProvider router={router} />;
  }

  export default App;
  ```

### Comparison with Object-Based Approach:

- **Object-Based**: Routes are defined as an array of objects, which might feel more structured.
- **JSX-Based**: Routes are defined using JSX, which may feel more natural if you prefer a component-like syntax.

Both approaches work identically in React Router, so you can choose the one that suits your coding style!

## Navigating Between Pages with [`Link`](https://api.reactrouter.com/v7/functions/react_router.Link.html)

In Single Page Applications (SPAs) using React, navigating between pages typically involves changing the URL and rendering the correct content without refreshing the entire page. React Router provides the `Link` component to handle this efficiently.

**Problem with Standard `<a>` Tag**

Using a regular HTML `<a>` tag:

```html
<a href="/products">Go to Products</a>
```

- Clicking this link sends a new HTTP request to the server.
- The entire app is reloaded, including all JavaScript and React state.
- This disrupts performance and negates the benefits of an SPA.

**Solution: Using `Link` from `react-router-dom`**

The Link component avoids the issues above by:

- Updating the browser's URL without sending a new HTTP request.
- Informing React Router to load the relevant content dynamically.
- Preserving the app's state and improving performance.

Here’s how to use it:

**Example**

**App Component (Main Layout)**: This sets up routes for your pages.

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

**HomePage Component**: Add a link to navigate to the Products page

```jsx
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>
        Go to <Link to="/products">Products</Link>
      </p>
    </div>
  );
}

export default HomePage;
```

**ProductsPage Component**: A simple page to display when navigated:

```jsx
function ProductsPage() {
  return (
    <div>
      <h1>Products Page</h1>
      <p>Here is a list of our products!</p>
    </div>
  );
}

export default ProductsPage;
```

**How It Works**

1. `Link` Component Behavior:

   - Renders an anchor (`<a>`) tag under the hood.
   - Prevents the default browser behavior of sending a request.
   - Changes the URL dynamically.
   - Triggers React Router to render the appropriate content.

2. User Interaction:
   - When the user clicks Go to Products, the URL changes to `/products`.
   - React Router dynamically displays the `ProductsPage` component without refreshing the page.

**Advantages**

- **Better Performance**: No unnecessary reloading of the app.
- **State Preservation**: The app's context or global state remains intact.
- **Seamless Navigation**: Provides a smooth user experience typical of SPAs.

This approach ensures your React app is efficient and follows modern best practices for navigation.

## Layouts & Nested Routes in React Router

In React Router, layouts are essentially wrapper components that provide a consistent structure to multiple pages. They can contain elements like headers, footers, navigation bars, and sidebars that are common across different pages.

Nested routes allow you to create hierarchical relationships between routes, where one route can have child routes. This is crucial for implementing layouts, as the layout component becomes the parent route, and the individual page components become its child routes.

### Example

**1. Add a main navigation bar visible on all pages**

This component provides navigation links for all pages.

```jsx
// src/components/MainNavigation.js
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
```

**2. Create a root layout to avoid repeating common components across pages**

The root layout acts as a wrapper for all pages, ensuring shared components (like the navigation bar) are displayed across all routes.

```jsx
// src/pages/Root.js
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from "./Root.module.css";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
```

**[`Outlet`](https://api.reactrouter.com/v7/functions/react_router.Outlet.html) Component**: Marks the location where child route components (e.g., `HomePage`, `ProductsPage`) will render.

**3. Use nested routes to structure the app efficiently**

The `RootLayout` wraps child routes, ensuring shared components and layouts apply consistently.

```jsx
// App.js
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

**Parent Route (`RootLayout`)**:

- Acts as a wrapper for all child routes (`HomePage` and `ProductsPage`).
- Provides a consistent layout, including the navigation bar.

**Child Routes**:

- Defined inside the `children` property of the parent route.
- Rendered dynamically within the `Outlet` component of `RootLayout`.

**4. `HomePage` and `ProductsPage` Components**

```jsx
// src/pages/HomePage.js
function HomePage() {
	return <h1>Welcome to the Home Page</h1>;
}

export default HomePage;

// src/pages/ProductsPage.js
function ProductsPage() {
	return <h1>Explore Our Products</h1>;
}

export default ProductsPage;
```

### How It Works

1. **Root Layout as Wrapper**:

   - `RootLayout` ensures common components (like MainNavigation) are displayed across all pages.
   - The `Outlet` component dynamically loads the content of the child routes.

2. **Dynamic Navigation**:

   - The navigation links (`<Link> `components) in `MainNavigation` allow users to switch between pages without refreshing the browser.

3. **Nested Routes**:

   - Child routes (`HomePage` and `ProductsPage`) are defined within the parent route (`RootLayout`).

### Advantages

- **Reusability**: Common components like navigation are defined once and reused across all pages.
- **Scalability**: Easily extendable to include more pages or different layouts (e.g., an admin layout).
- **Maintainability**: Centralized styling and layout logic.

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Advanced Redux](../019-advanced-redux/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

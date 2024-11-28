# Building a Multi-Page SPA with React Router

| Contents                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- |
| [Different Types of React Applications](#different-types-of-react-applications)                            |
| [Routing: Multiple Pages in Single-Page Applications](#routing-multiple-pages-in-single-page-applications) |
| [Defining Routes](#defining-routes)                                                                        |
| [Exploring an Alternative Way of Defining Routes](#exploring-an-alternative-way-of-defining-routes)        |
| [Navigating Between Pages with `Link`](#navigating-between-pages-with-link)                                |
| [Layouts & Nested Routes in React Router](#layouts--nested-routes-in-react-router)                         |
| [Showing Error Pages with `errorElement`](#showing-error-pages-with-errorelement)                          |
| [Working with Navigation Links (`NavLink`)](#working-with-navigation-links-navlink)                        |
| [Navigate Programmatically](#navigate-programmatically)                                                    |
| [Defining & Using Dynamic Routes](#defining--using-dynamic-routes)                                         |
| [Adding Links for Dynamic Routes](#adding-links-for-dynamic-routes)                                        |
| [Understanding Absolute and Related Paths](#understanding-absolute-and-related-paths)                      |
| [Working with Index Routes](#working-with-index-routes)                                                    |
| [Data Fetching with a `loader()`](#data-fetching-with-a-loader)                                            |
| [More `loader()` Data Usage](#more-loader-data-usage)                                                      |
| [Where Should `loader()` Code be Stored?](#where-should-loader-code-be-stored)                             |
| [When are `loader()` Functions Executed?](#when-are-loader-functions-executed)                             |
| [Reflecting the Current Navigation State in the UI](#reflecting-the-current-navigation-state-in-the-ui)    |

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

## Showing Error Pages with [`errorElement`](https://api.reactrouter.com/v7/interfaces/react_router.NonIndexRouteObject.html#errorElement)

In React Router, the `errorElement` prop allows you to specify a component that should be rendered when an error occurs within a particular route or its child routes. This is useful for providing custom error pages that offer a better user experience than the default error messages.

### Example

**1. Display a custom error page when users access a non-existent or unsupported route**

```jsx
// pages/Error.js
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
}

export default ErrorPage;
```

**2. Add `errorElement` to Routes**

Use the `errorElement` property to associate the custom error page with specific routes or a parent route.

```jsx
// App.js
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // Root level error handling
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/products",
        element: <ProductsPage />,
        // errorElement: <ProductErrorPage />  // In this way, route-specific error can be handled
      },
    ],
  },
]);
```

### How It Works

1. **Error Handling for Routes**:

   React Router automatically triggers the errorElement when:

   - Users access an undefined route (e.g., `/nonexistent`).
   - A route component throws an error (in advanced cases, e.g., fetching data failure).

2. **Default Behavior**:

   - If no `errorElement` is specified, React Router displays its default error message.
   - By adding `errorElement`, you provide a customized fallback for errors.

3. **Nested Error Handling**:

   - If a child route causes an error, the error bubbles up to the nearest parent with an `errorElement`.

### Advantages of Using `errorElement`

- **Enhanced User Experience**: Avoids showing default error messages.
- **Consistency**: Includes shared components (e.g., navigation bar).
- **Flexibility**: Customize error handling for specific routes or globally.

## Working with Navigation Links ([`NavLink`](https://api.reactrouter.com/v7/functions/react_router.NavLink.html))

In React Router, the `NavLink` component is a specialized version of the Link component that provides additional features for styling active links. It allows you to create visually distinct navigation links, making it easier for users to understand the current page and navigate through your application.

**Key Features of `NavLink`**:

- **Active Class**: The `NavLink` component automatically adds a specified CSS class to the active link.
- **Custom Styling**: You can customize the appearance of active and inactive links using CSS.
- **Conditional Rendering**: The `NavLink` component provides a mechanism to conditionally render content based on the active state.

### Example

**1. Create the navigation styles**

```css
/* MainNavigation.module.css */
.header {
  /* Your header styles */
}

.list {
  /* Your list styles */
}

/* Styles for both hover and active states */
.list a:hover,
.list a.active {
  color: var(--color-primary-800);
  text-decoration: underline;
}
```

**2. Create the `MainNavigation` component using `NavLink`**

```jsx
// components/MainNavigation.js
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end // Important for root path
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
```

In `NavLink` (from React Router), the `className` prop behaves differently compared to regular HTML elements or React components. Here's how it works:

- **Regular `className` in HTML and React**

  Normally, the `className` prop expects a string that specifies one or more CSS classes to apply to an element. For example:

  ```HTML
  <a className="active">Home</a>
  ```

- **Special `className` Behavior in `NavLink`**

  In `NavLink`, the `className` prop accepts a function instead of a string. This function determines which CSS class should be applied to the link based on whether it is active.

  - **Input**: React Router automatically provides an object to this function.
  - **Key Property**: The object includes a property called `isActive`, which is a boolean:
    - `true`: The link is currently active (i.e., matches the current route).
    - `false`: The link is not active.
  - **Output**: The function returns a class name string based on the `isActive` value.

**3. Prevent Incorrect Active States**

The `end` prop in `NavLink` is used to control how React Router determines whether a link is active. By default, `NavLink` considers a link active if the current route starts with the path specified in the `to` prop. This behavior works well for nested routes but can cause issues with simple root-level routes. Here's a clean explanation:

- **Default Behavior of `NavLink`**

  Without the `end` prop, `NavLink` checks if the current route starts with the `to` path. For example:

  ```jsx
  <NavLink to="/">Home</NavLink>
  <NavLink to="/products">Products</NavLink>
  ```

  **Scenarios**:

  - If the current route is `/products`, both links are considered active:
    - `/` is part of `/products` (the path starts with `/`), so **_Home is active_**.
    - `/products` exactly matches the second link, so **_Products is active_**.

  This default behavior is helpful for routes with child pages but problematic for the root `/` because all routes start with `/`.

- **What the `end` Prop does?**

  The `end` prop ensures that a link is considered active only if the current route exactly matches the `to` path.

  ```jsx
  <NavLink to="/" end>Home</NavLink>
  <NavLink to="/products">Products</NavLink>
  ```

  With `end`:

  - The Home link is active only when the route is exactly `/`.
  - When the route is `/products`, the Products link is active, but Home is not.

**4. Inline Styles (Optional)**

You can also apply styles inline instead of using classes.

```jsx
<NavLink
  to="/"
  style={({ isActive }) =>
    isActive
      ? { color: "#ff9800", textDecoration: "underline" }
      : { color: "white" }
  }
  end
>
  Home
</NavLink>
```

Therefore, by effectively using the NavLink component and CSS styling, you can create intuitive and visually appealing navigation experiences in your React Router applications.

## Navigate Programmatically

While the standard way to navigate in React Router is through declarative links (`<Link />`), there are times when you might want to trigger navigation programmatically from within your component's logic. This is where the [`useNavigate`](https://api.reactrouter.com/v7/functions/react_router.useNavigate.html) hook comes in handy.

### Steps to Implement

- **import `useNavigate`**

  ```jsx
  import { useNavigate } from "react-router-dom";
  ```

- **Get the `navigate` Function**

  ```jsx
  const navigate = useNavigate();
  ```

- **Define a Handler Function**

  Use the navigate function inside a custom handler to programmatically move to another route

  ```jsx
  const navigateHandler = () => {
    navigate("/products"); // Navigate to the "/products" route
  };
  ```

- **Trigger Navigation**

  ```html
  <button onClick="{navigateHandler}">Go to Products</button>
  ```

  **_Note: Here, `button` is only shown for example purposes to showcase trigger navigation (programmatically), however, in reality, use case of this kind of navigation are, 'trigger action after form submission', 'redirecting after a timer or event', 'conditional navigation based on application logic', etc._**

### Practical Use Case

Suppose you have a login form. After successful login, you want to redirect the user to a dashboard:

```jsx
const LoginPage = () => {
  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();
    // Assume login logic here
    navigate("/dashboard");
  };

  return (
    <form onSubmit={loginHandler}>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};
```

Programmatic navigation with `useNavigate` is a powerful tool for scenarios where user actions or application logic trigger route changes.

## Defining & Using Dynamic Routes

In React Router, dynamic routes allow you to create flexible URL patterns that can handle different values within a specific segment of the URL. This is particularly useful for scenarios where you want to display different content based on the dynamic part of the URL, such as product details pages, user profiles, or blog posts.

1. **Defining a Dynamic Route**: A route can include a placeholder for dynamic segments, written with a `:` followed by an identifier (e.g., `:productId`). This makes the segment dynamic.

   ```jsx
   // App.js
   import { createBrowserRouter } from "react-router-dom";
   import RootLayout from "./pages/Root";
   import ErrorPage from "./pages/Error";
   import HomePage from "./pages/Home";
   import ProductsPage from "./pages/Products";
   import ProductDetailPage from "./pages/ProductDetailPage";

   const router = createBrowserRouter([
   	{
   		path: "/",
   		element: <RootLayout />,
   		errorElement: <ErrorPage />,
   		children: [
   			{ path: "", element: <HomePage /> },
   			{
   				path: "/products",
   				element: <ProductsPage />,
   			},
   			{
   				path: "/products/:productId", element: <ProductDetailPage>
   			}
   		],
   	},
   ]);
   ```

   The `:productId` is a dynamic segment. It means the route will match `/products/anything`, and "anything" becomes the `productId` parameter.

2. **Accessing Dynamic Route Parameters**: Create the `ProductDetailPage` component to display details based on the `productId`.

   ```jsx
   import { useParams } from "react-router-dom";

   function ProductDetailPage() {
     const { productId } = useParams();

     return (
       <div>
         <h1>Product Details</h1>
         <p>Current Product ID: {productId}</p>
       </div>
     );
   }
   ```

   The [`useParams`](https://api.reactrouter.com/v7/functions/react_router.useParams.html) hook allows you to access the values of dynamic segments within the current route. In this case, `productId` will contain the value of the `:productId` segment from the URL.

## Adding Links for Dynamic Routes

Adding links for dynamic routes in React Router allows users to navigate to specific pages based on the dynamic parameter value. This is crucial for functionalities like product details, user profiles, or any content that requires a unique identifier in the URL.

Here's a breakdown using the provided content:

1. **Regular `Link` Component**: We use the `Link` component from react-router-dom (not `NavLink`) because we don't want to highlight these links as active when clicked.

2. **Dynamic `to` Prop**: The `to` prop in the `Link` component defines the target route. To create links for dynamic routes, we use template literals (backticks) to inject the dynamic value into the path.

**Example**

```jsx
// Product.js
import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product One" },
  { id: "p2", title: "Product Two" },
  { id: "p3", title: "Product Three" },
];

function Products() {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <Link to={`/products/${prod.id}`}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
```

## Understanding Absolute and Related Paths

In React Router, understanding absolute paths and relative paths is key to building a robust routing structure, especially for nested routes and navigation links.

**Absolute Paths**

- An absolute path starts with a forward slash (`/`). It specifies a route that's directly accessible from the root domain.
- Do not depend on the current active route or any parent route.
- Example: `/products`, `/about`, `/contact`

**Relative Paths**

- A relative path doesn't start with a forward slash. It's defined relative to the parent route's path.
- Adjust based on the routing context, making them flexible and reusable.
- Example: `products`, `about`, `contact`

### Example

Imagine an e-commerce application with the following structure:

- `/` (Home page)
- `/shop` (Shop page with product listings)
- `/shop/cart` (Shopping Cart)
- `/shop/products/:id` (Product Details page)

```jsx
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", // Absolute path
    element: <Home />,
  },
  {
    path: "shop", // Relative path
    element: <ShopLayout />,
    children: [
      { path: "cart", element: <Cart /> }, // Relative path
      { path: "products/:id", element: <ProductDetails /> }, // Relative path
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// Home Page
function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        {/* Absolute Path */}
        <Link to="/shop">Go to Shop</Link>
      </nav>
    </div>
  );
}

// Shop Layout with Nested Routes
function ShopLayout() {
  return (
    <div>
      <h1>Shop</h1>
      <nav>
        {/* Relative Paths */}
        <Link to="cart">Go to Cart</Link>
        <Link to="products/1">View Product 1</Link>
      </nav>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
}

// Cart Page
function Cart() {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <Link to="/">Back to Home</Link> {/* Absolute Path */}
    </div>
  );
}

// Product Details Page
function ProductDetails() {
  return (
    <div>
      <h3>Product Details</h3>
      <Link to=".." relative="path">
        Back to Shop
      </Link> {/* Relative Path */}
      <Link to="/shop/cart">Go to Cart</Link> {/* Absolute Path */}
    </div>
  );
}
```

**Explanation**

**_Absolute Paths_**

- **Definition**: Start with `/` and are resolved from the root of the domain.
- **Use Case**: For links that are independent of the current route.
- **Examples in the Code**:
  1.  `<Link to="/shop">Go to Shop</Link>`: Always navigates to `/shop`, no matter where the user currently is.
  2.  `<Link to="/">Back to Home</Link>`: Always navigates to `/`.

**_Relative Paths_**

- **Definition**: Do not start with / and are resolved relative to the current route or the parent route.
- **Use Case**: For nested routes or context-sensitive links.
- **Examples in the Code:**
  1.  `<Link to="cart">Go to Cart</Link>`: Navigates to `/shop/cart` because it appends cart to the parent route (`/shop`).
  2.  `<Link to="products/1">View Product 1</Link>`: Navigates to `/shop/products/1`.

### Understanding the `relative` Prop

In the Product Details Page:

```jsx
<Link to=".." relative="path">
  Back
</Link>
```

The `relative` prop in the `<Link>` component controls how relative paths are resolved. It takes two possible values:

1. `relative="path"`:
   - Resolves the path based on the _current URL path_.
   - Example:
     - If the current URL is `/shop/products/1`, `..` removes the last segment (`1`) and navigates to `/shop/products`.
2. `relative="route"` (default):
   - Resolves the path based on the _route hierarchy_.
   - Example:
     - Given the route hierarchy:
       ```bash
       /shop (parent)
       ├── /cart
       ├── /products/:id
       ```
     - `..` navigates to `/shop`, as it moves up one level in the route hierarchy.

## Working with Index Routes

In React Router, an index route is used to define a default route that renders when a parent route is active but no specific child route is matched. Index routes provide an elegant solution for cases where the parent route itself doesn't render content but acts as a container for its child routes.

**Key Points**

- **Purpose**: An index route defines the default content to display for a parent route's path.
- **Behavior**: It is rendered only when the parent route's path is matched, and no other child route is matched.
- **Syntax**: Instead of using an empty `path`, you set the `index` property to `true`.

### Example

```jsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/shop",
    element: <ShopLayout />,
    children: [
      { index: true, element: <Welcome /> }, // Index Route
      { path: "products", element: <ProductList /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// Shop Layout (Parent Route)
function ShopLayout() {
  return (
    <div>
      <h1>Shop</h1>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
}

// Index Route Component
function Welcome() {
  return <p>Welcome to our Shop! Explore products or check your cart.</p>;
}

// Other Child Routes
function ProductList() {
  return <p>Here is a list of products.</p>;
}

function Cart() {
  return <p>Your cart is empty.</p>;
}
```

### Why Use Index Routes?

**Alternative: Empty `path`**

You could achieve similar functionality by using an empty `path`:

```jsx
{ path: "", element: <Welcome /> }
```

However:

- Using `index: true` explicitly communicates that this route is the default.
- It improves readability and clarity in larger route configurations.

## Data Fetching with a loader()

React Router v6 introduced the `loader()` function, which simplifies data fetching for components by integrating it into the routing process. This approach reduces boilerplate code and ensures the component has the necessary data before rendering.

### Why use `loader()`?

1. **Fetch Before Render**: Unlike using `useEffect`, where the component is rendered first and data is fetched afterward, `loader()` fetches the data before rendering the route.

2. **Centralized Data Fetching**: Moves data-fetching logic from components to routes, making components cleaner and more reusable.

3. **Automatic Data Passing**: The data fetched by the `loader()` is automatically passed to the route component or its children.

### How `loader()` Works?

- A `loader()` is a function added to the loader property of a route in your Routes definition.
- This function:
  - Is executed before the route is rendered.
  - Can use asynchronous operations (like fetching data from an API).
  - Returns the data, which React Router then makes available to the component.

### Example: Using `loader()` in React Router

**Step 1: Create the loader function**

Move the data-fetching logic to a separate loader function. This function fetches data from an API and returns the result.

```jsx
import { json } from "react-router-dom";

export async function eventsLoader() {
  const response = await fetch("https://dummy-api-url.com/events");

  // Handle errors
  if (!response.ok) {
    throw json(
      { message: "Failed to fetch events" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return data.events; // Return the events array
}
```

**Step 2: Add the loader to the route definition**

Use the loader function in your route configuration.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsPage from "./pages/Events";

const router = createBrowserRouter([
  {
    path: "/events",
    element: <EventsPage />,
    loader: eventsLoader, // Attach the loader function
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

**Step 3: Access the data in the component**

The data returned by the `loader()` can be accessed using the [`useLoaderData`](https://api.reactrouter.com/v7/functions/react_router.useLoaderData.html) hook in the corresponding component.

**_Note: When you use a `loader` function, React Router automatically handles promises for you. If the `loader` function returns a promise (which is typical when fetching data), React Router waits for the promise to resolve before rendering the route component. The resolved data is then passed to the component via the `useLoaderData` hook._**

```jsx
import { useLoaderData } from "react-router-dom";

function EventsPage() {
  const events = useLoaderData(); // Fetches the data returned by the loader

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
```

## More `loader()` Data Usage

The `useLoaderData` hook, paired with `loader()` in React Router, offers flexibility for fetching and using data. While the most common use case is accessing loader data in the route component (e.g., a page component), it can also be utilized in nested or lower-level components. However, there are some important considerations and limitations to keep in mind.

### Key Points on Using `useLoaderData`

1. **In Page Components**:

   - This is the standard use case where the useLoaderData hook is used to access data fetched by the loader() associated with a route.
   - Data is seamlessly available to the page component and any of its nested components.

2. **In Nested Components**:

   - The `useLoaderData` hook can also be used in child components of the route component. This is because these components are part of the same rendering hierarchy.
   - Example: A child component like `EventsList` can directly call `useLoaderData` instead of relying on data passed as props.

3. **Limitations**:

   - _You cannot access loader data in components of higher-level routes_. Loader data is scoped to the route on which it is defined and any nested or child routes/components.
   - Trying to call `useLoaderData` in a higher-level route or layout will result in `undefined`.

### Example

**Setup: Define the loader function and route**

Define a `loader()` to fetch events data and attach it to a route.

```jsx
import { json } from "react-router-dom";

export async function eventsLoader() {
  const response = await fetch("https://dummy-api-url.com/events");

  if (!response.ok) {
    throw json(
      { message: "Failed to fetch events" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return data.events;
}
```

Configure the route to use the loader:

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root"
import EventsPage from "./pages/Events";

const router = createBrowserRouter([
	{
		path: "/root",
		element: <Root/>
		children: [
			{
				path: "/events",
				element: <EventsPage />,
				loader: eventsLoader,
			},
		]
	}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

**Approach 1: Using useLoaderData in the Page Component**

The typical way to use loader data is in the main page component:

```jsx
import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData(); // Access loader data here

  return (
    <div>
      <h1>Events</h1>
      <EventsList events={events} /> {/* Pass data as props */}
    </div>
  );
}

export default EventsPage;
```

**Approach 2: Using `useLoaderData` in a Nested Component**

Instead of passing data as props, the nested `EventsList` component can directly call `useLoaderData`.

```jsx
import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData(); // Access loader data here

  return (
    <div>
      <h1>Events</h1>
      <EventsList events={events} /> {/* Pass data as props */}
    </div>
  );
}

export default EventsPage;
```

_This works because `EventsList` is rendered as part of the same route where the loader was defined._

Now, if you try to access the events data in a root layout (a parent route of `/events`), it will return `undefined`. This is because loader data is scoped to the route where it is defined.

## Where Should `loader()` Code be Stored?

The `loader()` function should ideally be stored in the same file as the page/component that uses it. This keeps the data-fetching logic close to the component where it’s applied, making it easier to understand, maintain, and debug.

Instead of placing all loaders in a centralized file like `app.js` (which can become bloated and hard to manage), you export the `loader()` function from the relevant component file and import it in `app.js` or wherever routes are defined.

### Example

1. **Component File (e.g., `EventsPage.js` in the `pages` folder):**

```jsx
// Import necessary dependencies
import React from "react";

// Define and export the loader function
export async function eventsLoader() {
  const response = await fetch("https://api.example.com/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const data = await response.json();
  return data; // Return the data for use in the component
}

// Page Component
const EventsPage = () => {
  return (
    <div>
      <h1>Events Page</h1>
      {/* The loader's fetched data will be available to this component */}
    </div>
  );
};

export default EventsPage;
```

2. **Main Routing File (e.g., `App.js`):**

```jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsPage, { eventsLoader } from "./pages/EventsPage";

const router = createBrowserRouter([
  {
    path: "/events",
    element: <EventsPage />,
    loader: eventsLoader, // Import and use the loader function
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

- Each component or page manages its own loader logic, keeping the app modular and clean.
- Data-fetching logic is placed close to the component it serves, reducing the cognitive load when maintaining or debugging the app.
- When you add more routes and loaders, you won't clutter your central routing file (`app.js`). Instead, each route's loader is managed in its corresponding file.
- As your app grows, this structure prevents your routing file from becoming overloaded with logic.

## When are `loader()` Functions Executed?

The `loader()` function in React Router is executed before navigating to a page. Specifically, it is triggered as soon as the route transition starts, even before the page component tied to that route is rendered. This ensures that the required data is fetched and ready for the component by the time it is rendered.

- The loader function is executed during the route transition but before the component tied to the route is rendered.
- This means the data is guaranteed to be available when the component is displayed, preventing the need to handle loading states directly in the component.
- React Router waits for the loader function to complete its data-fetching process before rendering the page.
- For example, if the loader introduces a delay (e.g., due to a slow API), the user will experience a pause before the new page appears.

### Demonstration with Delayed Backend Response

1. **Adding a Delay in the Backend Response**: A timeout is added in the backend to simulate a delayed response (e.g., 1.5 seconds).

   ```jsx
   const events = [{ id: 1, name: "React Conference" }];
   setTimeout(() => {
     res.json(events); // Response sent after 1.5 seconds
   }, 1500);
   ```

2. **Frontend Behavior**

- When the user clicks on a link to navigate to the `Events` page, the loader function is triggered.
- React Router waits for the loader to fetch the data. During this waiting period, the new page is not rendered yet.
- Once the loader completes, the `Events` page is displayed with the fetched data.

3. **User Observation**

- The user experiences a delay during navigation where "nothing happens" because the page waits for the data.
- After 1.5 seconds (or when the loader completes), the new page appears with the data.
- This can be addressed by showing feedback (e.g., a loading spinner), which React Router provides tools for (e.g., `useNavigation()` or `Suspense`).

## Reflecting the Current Navigation State in the UI

In React Router, you can reflect the current navigation state in the UI to provide feedback to the user during route transitions. This is particularly useful for improving user experience when loading data or submitting forms. React Router's [`useNavigation()`](https://api.reactrouter.com/v7/functions/react_router.useNavigation.html) hook allows you to track the navigation state and conditionally display elements like loading indicators.

- `useNavigation()` Hook:

  - Provided by React Router to track the navigation state.
  - Returns a `navigation` object with a `state` property.

- `state` Property:

  - Can have the following values:
    - `idle`: No active navigation or data loading.
    - `loading`: Data is being fetched during a route transition.
    - `submitting`: Data is being submitted (e.g., a form submission).

- Add a loading indicator in a component that remains visible during the transition (e.g., a root layout or a header).
- The loading indicator won't appear on the new page being navigated to.
- Instead, it appears on the current visible page or component during the transition.

### Example: Reflecting Navigation State

**Root Layout Component**

```jsx
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

const RootLayout = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <div>
      <header>
        <h1>My App</h1>
        {/* Show a loading message if navigation is in 'loading' state */}
        {navigation.state === "loading" && (
          <p className="loading">Loading...</p>
        )}
      </header>
      <main>
        {/* Render child routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
```

**Styling the Loading Indicator**

```jsx
/* Example CSS for loading text */
.loading {
  color: blue;
  font-weight: bold;
  text-align: center;
}
```

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Advanced Redux](../019-advanced-redux/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

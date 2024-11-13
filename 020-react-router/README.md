# Building a Multi-Page SPA with React Router

| Contents                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- |
| [Different Types of React Applications](#different-types-of-react-applications)                            |
| [Routing: Multiple Pages in Single-Page Applications](#routing-multiple-pages-in-single-page-applications) |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Advanced Redux](../019-advanced-redux/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()

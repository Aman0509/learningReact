# Introduction

| Contents |
| :--- |
| [What is React.js? And why would you use it?](#what-is-reactjs-and-why-would-you-use-it) |
| [Create React Projects](#create-react-projects) |
| [Why do we need a special project setup?](#why-do-we-need-a-special-project-setup) |

## What is React.js? And why would you use it?

***React.js, commonly known as React, is an open-source JavaScript library primarily used for building user interfaces (UI) and handling the view layer for web and mobile applications. Developed by Facebook, React allows developers to create interactive, reusable UI components. Its key feature is the ability to efficiently update and render components when the underlying data changes, thanks to its virtual DOM (Document Object Model) implementation. React follows a declarative and component-based approach, enabling developers to create complex UIs by composing small, isolated components. This library is widely favored for its performance optimizations, maintainability, and its capability to create dynamic, fast, and responsive user interfaces.***

When you explore the official webpage, [react.dev](https://react.dev/), the essence becomes clear. React serves as a library designed for crafting user interfaces, both for web and native platforms. In simpler terms, it streamlines the creation of user interfaces.

It's primarily a JavaScript library tailored for this purpose, emphasizing the seamless development of interfaces. However, this explanation leaves another question unanswered: why opt for React? The answer unravels when you visit a React-powered webpage like Netflix.

When navigating such sites, the transitions are incredibly smooth, almost instantaneous, devoid of the usual delay associated with loading new pages. This creates an experience akin to using a mobile app, where immediate responses and fluid transitions are the norm. React and similar libraries facilitate the construction of such user experiences for the web.

How does React achieve this? By leveraging JavaScript within the browser, it dynamically updates the visible interface without requiring a page reload. JavaScript's ability to manipulate a webpage after it loads is key. For instance, when clicking the movies tab, JavaScript can discreetly fetch movie data in the background, seamlessly updating the screen with this data, thus ensuring smooth transitions between pages.

Now, you might wonder why we need React when JavaScript appears capable on its own. While using pure JavaScript is an option, it's laborious, error-prone, and especially challenging for complex user interfaces and applications like the Netflix web app. Without a library like React, relying solely on vanilla JavaScript becomes impractical and immensely burdensome.

- Writing complex JavaScript code quickly becomes cumbersome.
- Complex JavaScript code quickly becomes error-prone.
- Complex JavaScript code often is hard to maintain or edit.
- React offers a simpler mental model.

<img src="https://drive.google.com/uc?export=view&id=12jTx4LJ0lKnIX9qlHOOICMHQL-IjbAET" height="350" width="700" alt="academind slide">

## Create React Projects

### Using React Sandbox

One of the speediest ways to initiate React coding is by typing [react.new](https://codesandbox.io/p/sandbox/react-new?file=%2Fsrc%2Findex.js&utm_source=dotnew) in your browser's URL bar. Upon hitting Enter, CodeSandbox, a website, swiftly generates a fresh React project workspace for you. This platform offers an in-browser development space, enabling file manipulation, code writing, and live previews of your website—all without local installations.

This approach is particularly advantageous for rapid starts and ideal if local software installation isn't feasible, perhaps due to restricted permissions on a company-issued computer.

### Local Setup

Creating a React project from scratch involves several steps and it can be quite tedious since it requires manual installation and configuration of all the dependencies ([manual installation example](https://www.freecodecamp.org/news/how-to-build-a-react-app-different-ways/#how-to-build-a-react-app)). Keep in mind this is a rare approach to use at the moment, since most apps are created through scripts that quickly take care of all this boilerplate. Some of the commonly use scripts are [create-react-app](https://github.com/facebook/create-react-app) and [Vite](https://vitejs.dev/guide/). Here are the installation steps:

**Setting up a React project with Create React App:**

<ins>*Step 1: Install Node.js and npm (Node Package Manager)*</ins>

Ensure you have Node.js installed on your system as it includes npm, which is necessary for managing React projects. You can download and install Node.js from its [official website](https://nodejs.org/en/download).

<ins>*Step 2: Install create-react-app (if not already installed)*</ins>

Open your terminal or command prompt and run the following command to install [create-react-app](https://github.com/facebook/create-react-app) globally:

```
npm install -g create-react-app
```

<ins>*Step 3: Create a React project*</ins>

Once installed, navigate to the directory where you want to create your React project using the terminal or command prompt. Run the following command:

```
npx create-react-app my-react-app
```

Replace `my-react-app` with your preferred project name.

<ins>*Step 4: Navigate to the project*</ins>

Enter the directory of your newly created React project:

```
cd my-react-app
```

<ins>*Step 5: Start the development server*</ins>

```
npm start
```

This command initiates a local development server and opens your default web browser to display the React app. Any changes made to the code will automatically update the browser.

<ins>*Step 6: Begin coding*</ins>

You can start editing the React project by modifying files within the `src` directory. The main file is usually `App.js`, and other components are created and imported into this file.

**Setting up a React project with Vite:**

<ins>*Step 1: Install Node.js and npm (Node Package Manager)*</ins>

<ins>*Step 2: Install Vite (if not already installed)*</ins>

Run the following command to install Vite globally:

```
npm install -g create-vite
```

<ins>*Step 3: Create a new React project with Vite*</ins>

Navigate to the directory where you want to create your project and execute the following command:

```
npm create-vite@latest my-react-app --template react
```

Replace `my-react-app` with your preferred project name.

<ins>*Step 4: Navigate to Project Directory*</ins>

```
cd my-react-app
```

<ins>*Step 5: Install Dependencies*</ins>

Run the following command to install project dependencies:

```
npm install
```

<ins>*Step 6: Start the Development Server*</ins>

Initiate the development server with the command:

```
npm run dev
```

Readings:

- [Start a New React Project](https://react.dev/learn/start-a-new-react-project)

- [How to Build a React Project with Create React App in 10 Steps](https://www.freecodecamp.org/news/how-to-build-a-react-project-with-create-react-app-in-10-steps/)

- [Create react projects - Hitesh Choudhary](https://www.youtube.com/watch?v=lf8giXzuxVE)

## Why do we need a special project setup?

Why not just create an HTML file and a JavaScript file, referencing the script file within the HTML, and then insert our React code there? Why isn't this a viable option?

Well, it's not really feasible because when working with React, we rely on a unique feature called [JSX](https://react.dev/learn/writing-markup-with-jsx). We'll learn more about it later sections.

The catch with this special syntax, which becomes an integral part of React coding, is that unfortunately, it doesn't function directly in the browser. This poses a significant hurdle.

As a result, the code we write needs transformation into executable code for the browser. Additionally, for optimal performance, we aim to optimize this code by shortening variable and function names, removing excess whitespace, essentially making it as compact as possible for efficient website performance.

Hence, the necessity to create React projects using supplementary tools like Vite. These tools come into play, ultimately transforming our code into an efficient, browser-compatible format.

This clarifies why creating a basic HTML and script file doesn't suffice; instead, these additional tools are required.

<img src="https://drive.google.com/uc?export=view&id=1HtUgR0wcwx2oCzUf2OjbkMIHo7ERFMin" height="350" width="700" alt="academind slide">

***

[<img align="center" src="../images/home.png" height="20" width="20"/> Index](../README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[React Essentials - Components, JSX, Props, State & More <img align="center" src="../images/right_arrow.png" height="20" width="20"/>](../002-react-essentials/README.md)
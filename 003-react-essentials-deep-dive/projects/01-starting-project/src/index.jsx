import React from 'react';
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);

// Example - If there is a need to replace JSX
// ReactDOM.createRoot(entrypoint).render(React.createElement(App));

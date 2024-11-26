import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from "./pages/ProductDetailPage";

// define routes: Object based
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> }, // change to relative path
      { path: "products", element: <ProductPage /> }, // change to relative path
      { path: "products/:productId", element: <ProductDetailPage /> }, // change to relative path
    ],
  },
]);

// define route: JSX based
// const routerDef = createRoutesFromElements(
//   <>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductPage />} />
//   </>
// );
// const router = createBrowserRouter(routerDef);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

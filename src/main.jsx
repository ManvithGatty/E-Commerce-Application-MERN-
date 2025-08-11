import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./utils/styles.css";

// components
import App from "./App.jsx";
import ProductList from "./components/ProductList.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

const ProductDetail = lazy(()=>import('./components/ProductDetails.jsx'));
const CartList = lazy(()=>import('./components/Cart.jsx'));
const NotFound = lazy(()=>import('./components/Error.jsx'));
const Register = lazy(()=>import('./components/Register.jsx'));
const Login = lazy(()=>import('./components/Login.jsx'));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductList /> },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CartList />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Register />
          </Suspense>
        )
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Login />
          </Suspense>
        )
      }
    ],
    errorElement: (
      <Suspense fallback={<LoadingScreen />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);

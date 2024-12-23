import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthProvider from "./context/AuthProvider";
import AllBooks from "./components/AllBooks/AllBooks";
import PrivateRouter from "./Router/PrivateRouter/PrivateRouter";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/home",
        element: <Home></Home>
      },
      {
        path : "/login",
        element: <Login></Login>
      },
      {
        path : "/register",
        element: <Register></Register>
      },
      {
        path : "/books",
        element: <PrivateRouter><AllBooks></AllBooks></PrivateRouter>
      }
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
    
  </StrictMode>
);

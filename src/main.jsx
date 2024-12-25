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
import AddBook from "./components/AddBook/AddBook";
import UpdateBook from "./components/UpdateBook/UpdateBook";
import Category from "./components/Category/Category";
import ViewDetails from "./components/ViewDetails/ViewDetails";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
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
      },
      {
        path : "/add-book",
        element: <PrivateRouter><AddBook></AddBook></PrivateRouter>
      },
      {
        path : "/UpdateBook",
        element: <PrivateRouter><UpdateBook></UpdateBook></PrivateRouter>
      },
      {
        path:"/category",
        element: <PrivateRouter><Category></Category></PrivateRouter>
      },
      {
        path:"/ViewDetails",
        element: <PrivateRouter><ViewDetails></ViewDetails></PrivateRouter>
      }
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
    
  </StrictMode>
);

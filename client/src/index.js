import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/signUp";
import DispalyCourse from "./Pages/DispalyCourse";

import { Provider } from "react-redux";
import { storeApp } from "./Store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:courseId",
    element: <DispalyCourse />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeApp}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

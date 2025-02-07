import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import { storeApp } from "./Store";

import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/signUp";
import DispalyCourse from "./Pages/DispalyCourse";
import CourseLectures from "./Pages/CourseLectures";
import MyCourses from "./Pages/myCourses";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import AboutMe from "./Components/Profile/aboutMe";
import EditProfile from "./Components/Profile/editProfile";
import EditProfileImage from "./Components/Profile/editProfileImage";
import AddNewCourse from "./Components/Profile/addNewCourse";
import MyCoursesDashboard from "./Components/Profile/myCoursesDashboard";
import EditCourse from "./Components/Profile/editCourse";
import AddLecture from "./Components/Profile/addLecture";
import EditLecture from "./Components/Profile/editLecture";
import EditCourseImage from "./Components/Profile/editCourseImage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses/:categorie",
    element: <Courses />,
  },
  {
    path: "/courses/:courseId",
    element: <DispalyCourse />,
  },
  {
    path: "/course/:courseId/lecture/:lectureNumber",
    element: <CourseLectures />,
  },
  {
    path: "/myCourses",
    element: <MyCourses />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
    children: [
      {
        path: "/profile/:userId",
        element: <AboutMe />,
      },
      {
        path: "/profile/:userId/editProfile",
        element: <EditProfile />,
      },
      {
        path: "/profile/:userId/editProfileImage",
        element: <EditProfileImage />,
      },
      {
        path: "/profile/:userId/addNewCourse",
        element: <AddNewCourse />,
      },
      {
        path: "/profile/:userId/myCoursesDashboard",
        element: <MyCoursesDashboard />,
      },
      {
        path: "/profile/:userId/editCourse/:courseId",
        element: <EditCourse />,
      },
      {
        path: "/profile/:userId/addLecture/:courseId",
        element: <AddLecture />,
      },
      {
        path: "/profile/:userId/editLecture/:courseId/:lectureNumber",
        element: <EditLecture />,
      },
      {
        path: "/profile/:userId/editCourseImage/:courseId",
        element: <EditCourseImage />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  // Fallback route for unmatched paths
  {
    path: "*",
    element: <div>Page not found</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={storeApp}>
      <RouterProvider router={router} />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

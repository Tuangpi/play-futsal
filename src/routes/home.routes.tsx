import GuestLayout from "@/layouts/GuestLayout/GuestLayout";
import Competitions from "@/pages/guest/Competitions";
import Courts from "@/pages/guest/Courts";
import Home from "@/pages/guest/Home";
import Login from "@/pages/guest/Login";
import SignUp from "@/pages/guest/Signup";
import type { RouteObject } from "react-router";

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "courts", element: <Courts /> },
      { path: "competitions", element: <Competitions /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

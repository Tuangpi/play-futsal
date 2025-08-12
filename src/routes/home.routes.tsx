import GuestLayout from "@/layouts/GuestLayout/GuestLayout";
import Home from "@/pages/guest/Home";
import Login from "@/pages/guest/Login";
import SignUp from "@/pages/guest/Signup";
import type { RouteObject } from "react-router";

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <GuestLayout />,
    children: [{ index: true, element: <Home /> }],
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

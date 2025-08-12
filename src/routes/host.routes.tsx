import ProtectedRoute from "@/components/auth/ProtectedRoute";
import type { RouteObject } from "react-router";
import HostLayout from "@/layouts/HostLayout/HostLayout";
import Dashboard from "@/pages/hoster/Dashboard";
import Competitions from "@/pages/hoster/Competitions";
import Profile from "@/pages/hoster/Profile";

export const hostRoutes: RouteObject[] = [
  {
    path: "/host",
    element: (
      <ProtectedRoute allowedRole="HOST">
        <HostLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "competitions",
        element: <Competitions />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

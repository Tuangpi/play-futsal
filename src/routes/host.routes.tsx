import ProtectedRoute from "@/components/auth/ProtectedRoute";
import type { RouteObject } from "react-router";
import HostLayout from "@/layouts/HostLayout/HostLayout";
import Dashboard from "@/pages/hoster/Dashboard";
import Competitions from "@/pages/hoster/Competitions/Competitions";
import Profile from "@/pages/hoster/Profile";
import RootLayout from "@/layouts/RootLayout";
import Create from "@/pages/hoster/Competitions/Create";

export const hostRoutes: RouteObject[] = [
  {
    path: "/host",
    element: (
      <ProtectedRoute allowedRole="HOST">
        <RootLayout>
          <HostLayout />
        </RootLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "competitions", element: <Competitions /> },
      { path: "competitions/add", element: <Create /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

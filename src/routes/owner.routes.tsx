import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CourtOwnerLayout from "@/layouts/CourtOwnerLayout/CourtOwnerLayout";
import Bookings from "@/pages/owner/Bookings";
import Dashboard from "@/pages/owner/Dashboard";
import MyCourts from "@/pages/owner/MyCourts";
import Profile from "@/pages/owner/Profile";
import type { RouteObject } from "react-router";

export const ownerRoutes: RouteObject[] = [
  {
    path: "/owner",
    element: (
      <ProtectedRoute allowedRole="OWNER">
        <CourtOwnerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "my-courts",
        element: <MyCourts />,
      },
      {
        path: "my-bookings",
        element: <Bookings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

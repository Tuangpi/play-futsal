import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CourtOwnerLayout from "@/layouts/CourtOwnerLayout/CourtOwnerLayout";
import RootLayout from "@/layouts/RootLayout";
import Bookings from "@/pages/owner/Bookings";
import Dashboard from "@/pages/owner/Dashboard";
import AddCourt from "@/pages/owner/Mycourts/AddCourt";
import MyCourts from "@/pages/owner/Mycourts/MyCourts";
import Profile from "@/pages/owner/Profile";
import type { RouteObject } from "react-router";

export const ownerRoutes: RouteObject[] = [
  {
    path: "/owner",
    element: (
      <ProtectedRoute allowedRole="OWNER">
        <RootLayout>
          <CourtOwnerLayout />
        </RootLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "my-courts", element: <MyCourts /> },
      { path: "my-courts/add", element: <AddCourt /> },
      { path: "my-bookings", element: <Bookings /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

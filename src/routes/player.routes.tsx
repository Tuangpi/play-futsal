import PlayerLayout from "@/layouts/PlayerLayout/PlayerLayout";
import Dashboard from "@/pages/player/Dashboard";
import Profile from "@/pages/player/Profile";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import type { RouteObject } from "react-router";
import Competitions from "@/pages/player/Competitions";
import MyTeam from "@/pages/player/MyTeam";
import MyStats from "@/pages/player/MyStats";

export const playerRoutes: RouteObject[] = [
  {
    path: "/player",
    element: (
      <ProtectedRoute allowedRole="PLAYER">
        <PlayerLayout />
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
        path: "my-team",
        element: <MyTeam />,
      },
      {
        path: "my-stats",
        element: <MyStats />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

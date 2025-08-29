import PlayerLayout from "@/layouts/PlayerLayout/PlayerLayout";
import Dashboard from "@/pages/player/Dashboard";
import Profile from "@/pages/player/Profile";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import type { RouteObject } from "react-router";
import Competitions from "@/pages/player/Competitions";
import MyTeam from "@/pages/player/MyTeam/MyTeam";
import MyStats from "@/pages/player/MyStats";
import RootLayout from "@/layouts/RootLayout";
import CreateTeam from "@/pages/player/MyTeam/CreateTeam";
import TeamDetail from "@/pages/player/MyTeam/TeamDetail";

export const playerRoutes: RouteObject[] = [
  {
    path: "/player",
    element: (
      <ProtectedRoute allowedRole="PLAYER">
        <RootLayout>
          <PlayerLayout />
        </RootLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "competitions", element: <Competitions /> },
      { path: "my-team", element: <MyTeam /> },
      { path: "my-team/create", element: <CreateTeam /> },
      { path: "my-team/:id", element: <TeamDetail /> },
      { path: "my-stats", element: <MyStats /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

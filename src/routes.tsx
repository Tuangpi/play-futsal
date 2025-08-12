import { createBrowserRouter } from "react-router";
import { homeRoutes } from "./routes/home.routes";
import { playerRoutes } from "./routes/player.routes";
import { ownerRoutes } from "./routes/owner.routes";
import { hostRoutes } from "./routes/host.routes";

export const router = createBrowserRouter([
  ...homeRoutes,
  ...ownerRoutes,
  ...playerRoutes,
  ...hostRoutes,
]);

import { ownerNavItems } from "@/constants/Navbars";
import { Link, NavLink, Outlet } from "react-router";

const CourtOwnerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Navbar */}
      <header className="bg-gray-900 px-6 py-4 flex justify-between items-center shadow-md">
        <Link to="/owner" className="text-xl font-bold text-sky-500">
          FutsalPro
        </Link>
        <nav className="space-x-6">
          {ownerNavItems.map(({ to, label, exactPath }) => (
            <NavLink
              key={to}
              end={exactPath}
              to={to}
              className={({ isActive }) =>
                `${isActive ? "text-red-400" : "text-blue-400"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-center text-gray-400 py-4">
        &copy; {new Date().getFullYear()} FutsalPro. All rights reserved.
      </footer>
    </div>
  );
};

export default CourtOwnerLayout;

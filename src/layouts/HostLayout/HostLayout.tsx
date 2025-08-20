import { hostNavItems } from "@/constants/Navbars";
import { Link, NavLink, Outlet } from "react-router";

const HostLayout = () => {
  return (
    <>
      <header className="bg-bg-muted text-text-muted px-6 py-4 flex justify-between items-center shadow-md sticky top-0 left-0">
        <Link to="/host" className="text-xl font-bold text-sky-500 block">
          Logo
        </Link>
        <nav className="space-x-6">
          {hostNavItems.map(({ to, label, exactPath }) => (
            <NavLink
              key={to}
              end={exactPath}
              to={to}
              className={({ isActive }) =>
                `${isActive ? "text-primary" : "text-text-muted"}`
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
    </>
  );
};

export default HostLayout;

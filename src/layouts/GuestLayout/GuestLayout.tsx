import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { NavLink, Outlet } from "react-router";
import DarkModeToggle from "@/components/DarkModeToggle";
import ScrollToTop from "@/components/ScrollToTop";

const GuestLayout = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-bg-muted text-text flex flex-col">
        <header className="bg-bg text-text-muted font-medium shadow sticky top-0 left-0">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="text-xl font-bold">FutsalPro</div>

            <nav>
              <ul className="flex gap-6 items-center">
                <li>
                  <NavLink
                    to="/"
                    end
                    aria-label="Home"
                    className={({ isActive }) =>
                      `${isActive ? "text-primary" : "text-text"}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/competitions"
                    aria-label="Competitions"
                    className={({ isActive }) =>
                      `${isActive ? "text-primary" : "text-text"}`
                    }
                  >
                    Competitions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/courts"
                    aria-label="Courts"
                    className={({ isActive }) =>
                      `${isActive ? "text-primary" : "text-text"}`
                    }
                  >
                    Courts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    aria-label="Login"
                    className={({ isActive }) =>
                      `${isActive ? "text-primary" : "text-text"}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className={clsx(
                  "text-sm p-1 rounded cursor-pointer",
                  currentLang === "en" ? "text-primary" : "text-text-muted"
                )}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage("my")}
                className={clsx(
                  "text-sm p-1 rounded cursor-pointer",
                  currentLang === "my" ? "text-primary" : "text-text-muted"
                )}
                aria-label="Switch to Burmese"
              >
                မြန်မာ
              </button>
              <DarkModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default GuestLayout;

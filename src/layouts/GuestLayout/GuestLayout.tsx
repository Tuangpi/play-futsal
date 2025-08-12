import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { NavLink, Outlet } from "react-router";

const GuestLayout = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 shadow">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-xl font-bold">FutsalPro</div>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-6 items-center">
              <li>
                <NavLink to="/" aria-label="Home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/competitions" aria-label="Competitions">
                  Competitions
                </NavLink>
              </li>
              <li>
                <NavLink to="/courts" aria-label="Courts">
                  Courts
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" aria-label="Login">
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Language Switcher */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => i18n.changeLanguage("en")}
              className={clsx(
                "text-sm px-2 py-1 rounded",
                currentLang === "en"
                  ? "bg-blue-500 text-white"
                  : "text-blue-400"
              )}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => i18n.changeLanguage("my")}
              className={clsx(
                "text-sm px-2 py-1 rounded",
                currentLang === "my"
                  ? "bg-blue-500 text-white"
                  : "text-blue-400"
              )}
              aria-label="Switch to Burmese"
            >
              မြန်မာ
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;

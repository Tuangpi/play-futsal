import clsx from "clsx";
import { useTranslation } from "react-i18next";

const I18nChange = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="flex gap-1.5 items-center">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={clsx(
          "text-sm p-1 rounded cursor-pointer block",
          currentLang === "en" ? "text-primary" : "text-text-muted"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("my")}
        className={clsx(
          "text-sm p-1 rounded cursor-pointer block",
          currentLang === "my" ? "text-primary" : "text-text-muted"
        )}
        aria-label="Switch to Burmese"
      >
        မြန်မာ
      </button>
    </div>
  );
};
export default I18nChange;

import clsx from "clsx";
import type { InputHTMLAttributes, FC } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "bg-bg-muted scheme-light dark:scheme-dark text-text placeholder:text-text-muted border border-border rounded-sm py-2 px-3 w-full focus:outline-none transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
};

export default Input;

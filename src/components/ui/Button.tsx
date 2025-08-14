import clsx from "clsx";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-primary text-text hover:bg-primary-hover py-2 w-full cursor-pointer inline-flex items-center justify-center font-medium rounded-sm focus:outline-none transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

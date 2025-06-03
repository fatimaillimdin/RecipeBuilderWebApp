/** @format */

import { forwardRef } from "react";
import { Link } from "react-router";

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

export const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      href,
      to,
      isLoading,
      loadingText = "Loading...",
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseClassName = `${variants[variant]} ${sizes[size]} ${className} ${
      isLoading ? "opacity-70 cursor-not-allowed" : ""
    }`;

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {isLoading ? loadingText : children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <a href={href} ref={ref} className={baseClassName} {...props}>
          {content}
        </a>
      );
    }

    if (to) {
      return (
        <Link to={to} ref={ref} className={baseClassName} {...props}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseClassName} disabled={isLoading} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

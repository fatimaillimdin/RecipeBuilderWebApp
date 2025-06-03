/** @format */

import { forwardRef } from "react";

const sizes = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2 text-base",
  xl: "px-6 py-3 text-lg",
};

export const Input = forwardRef(
  (
    {
      size = "md",
      className = "",
      label,
      error,
      helperText,
      leftElement,
      rightElement,
      isRequired,
      isDisabled,
      isReadOnly,
      ...props
    },
    ref
  ) => {
    const inputClassName = `
      input
      ${sizes[size]}
      ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
      ${isDisabled ? "opacity-50 cursor-not-allowed bg-neutral-50" : ""}
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            className={inputClassName}
            disabled={isDisabled}
            readOnly={isReadOnly}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightElement}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? "text-red-500" : "text-neutral-500"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/** @format */

import { forwardRef } from "react";

const variants = {
  elevated: "shadow-lg hover:shadow-xl",
  outlined: "border border-neutral-200 hover:border-neutral-300",
  filled: "bg-neutral-50 hover:bg-neutral-100",
  ghost: "hover:bg-neutral-50",
};

export const Card = forwardRef(
  ({ variant = "elevated", className = "", children, onClick, isHoverable = true, ...props }, ref) => {
    const baseClassName = `
      card
      ${variants[variant]}
      ${isHoverable ? "transition-all duration-200" : ""}
      ${onClick ? "cursor-pointer" : ""}
      ${className}
    `;

    return (
      <div ref={ref} className={baseClassName} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`px-6 py-4 border-b border-neutral-100 ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ className = "", children, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = "", children, ...props }) => (
  <div className={`px-6 py-4 border-t border-neutral-100 ${className}`} {...props}>
    {children}
  </div>
);

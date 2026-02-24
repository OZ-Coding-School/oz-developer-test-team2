import React from "react";
import "./badge.css";

function Badge({
  label,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <span
      className={`badge badge--${variant} badge--${size} ${className}`}
      {...props}
    >
      #{label}
    </span>
  );
}

export default Badge;
import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/* =========================
   Variant Styles
========================= */

const VARIANT = {
  primary: `
    bg-primary
    text-white
    hover:bg-primary-hover
    shadow-[0_10px_18px_rgba(239,109,138,0.22)]
  `,
  secondary: `
    bg-bg-default
    text-primary
    hover:brightness-[0.98]
  `,
  option: `
    bg-bg-default
    text-description
    text-[12px]
    shadow-[0_2px_8px_rgba(30,41,57,0.06)]
    hover:brightness-[0.98]
    w-full
  `,
};

/* =========================
   Size Styles
========================= */

const SIZE = {
  sm: 'h-[48px] w-[262px] px-5 text-[14px]',
  md: 'h-[48px] w-[384px] px-7 text-[15px]',
};

function Button({
  children,
  leftIcon,
  rightIcon,
  variant = 'primary', // primary | secondary | option
  size = 'md', // sm | md
  align = 'center', // center | start
  className = '',
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center rounded-full font-semibold',
        'transition-all duration-150 active:translate-y-[1px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        align === 'start' ? 'justify-start' : 'justify-center',
        SIZE[size],
        VARIANT[variant],
        className
      )}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

export default Button;

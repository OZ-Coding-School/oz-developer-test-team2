import React from 'react';

const SIZE = {
  sm: 'px-2.5 py-1 text-xs font-semibold',
  md: 'px-3 py-1.5 text-sm font-semibold',
  lg: 'px-4 py-2 text-base font-semibold',
};

const VARIANT = {
  primary: 'bg-[var(--color-bg-default)] text-[var(--color-primary)]',
};

function Badge({
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-full leading-none font-medium',
        SIZE[size] ?? SIZE.md,
        VARIANT[variant] ?? VARIANT.primary,
        className,
      ].join(' ')}
      {...props}
    >
      #{label}
    </span>
  );
}

export default Badge;

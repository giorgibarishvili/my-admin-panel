import React from "react";

const ButtonSmall = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={
        `inline-block rounded px-4 py-2 text-xs font-medium text-white me-2 ` +
        className
      }
    >
      {children}
    </button>
  );
});
ButtonSmall.displayName = "ButtonSmall";

export { ButtonSmall };

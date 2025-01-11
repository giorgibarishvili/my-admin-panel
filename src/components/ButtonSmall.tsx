import React from "react";

const ButtonSmall = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, color, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={
        `inline-block rounded bg-${color}-500 px-4 py-2 text-xs font-medium text-white hover:bg-${color}-600 mx-2 ` +
        className
      }
    >
      {children}
    </button>
  );
});
ButtonSmall.displayName = "ButtonSmall";

export { ButtonSmall };

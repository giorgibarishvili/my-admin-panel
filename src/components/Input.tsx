import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, id, placeholder, ...props }, ref) => {
  return (
    <label
      htmlFor={id}
      className={
        `relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ` +
        className
      }
    >
      <input
        ref={ref}
        {...props}
        type={type}
        id={id}
        placeholder={placeholder}
        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      />

      <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
        {placeholder}
      </span>
    </label>
  );
});
Input.displayName = "Input";

export { Input };

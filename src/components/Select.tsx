import React from "react";
import { SelectProps } from "../models/SelectModels";
const Select = ({
  className,
  id,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) => {
  return (
    <label
      htmlFor={id}
      className={
        `relative block overflow-hidden rounded-md border border-gray-400 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-text ` +
        className
      }
    >
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
        {placeholder}
      </span>
    </label>
  );
};

export { Select };

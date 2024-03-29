import { MouseEventHandler } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import className from "@libs/client/createClassName";

interface InputProps {
  placeholder?: string;
  label?: { top?: string; right?: string; left?: string };
  buttonText?: string;
  submitText?: string;
  type: "text" | "email" | "number" | "password";
  isBox?: boolean;
  required?: boolean;
  registerProps?: UseFormRegisterReturn;
}

const Input = ({
  placeholder,
  label,
  buttonText,
  submitText,
  type,
  isBox,
  required,
  registerProps,
}: InputProps) => {
  return (
    <div className="space-y-1 mt-2">
      {label?.top && (
        <label className="text-sm font-medium text-gray-500">{label.top}</label>
      )}
      <div className="flex">
        {label?.left && (
          <span className="flex items-center text-sm text-gray-400 px-3 border border-gray-300 border-r-0 rounded-l-md bg-gray-50">
            {label.left}
          </span>
        )}
        {isBox ? (
          <textarea
            {...registerProps}
            className="h-32 border border-gray-300 rounded-md appearance-none shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm z-10"
          />
        ) : (
          <input
            className={className(
              "appearance-none w-full border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm rounded-md z-10 placeholder-gray-400",
              label?.left ? "rounded-l-none" : "",
              label?.right || buttonText || submitText ? "rounded-r-none" : ""
            )}
            placeholder={placeholder}
            type={type}
            required={required}
            {...registerProps}
          />
        )}

        {label?.right && (
          <span className="flex items-center text-sm text-gray-400 px-3 border border-gray-300 border-l-0 rounded-r-md bg-gray-50">
            {label.right}
          </span>
        )}
        {submitText && (
          <button
            className="px-2 text-sm text-gray-400 bg-white hover:bg-gray-50 border border-gray-300 border-l-0 rounded-r-md focus:outline-none shadow-sm"
            type="submit"
          >
            {submitText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

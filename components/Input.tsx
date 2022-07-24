import { MouseEventHandler } from "react";
import type { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import className from "../libs/client/createClassName";

interface EnterFormValues {
  email?: string;
  phone?: string;
  oneTimePassword?: string;
}

interface InputProps {
  placeholder?: string;
  label?: { top?: string; right?: string; left?: string };
  buttonText?: string;
  submitText?: string;
  type: "text" | "email" | "number" | "password";
  required?: boolean;
  registerProps?: UseFormRegisterReturn;
  onButtonClick?: MouseEventHandler<HTMLSpanElement>;
}

const Input = ({
  placeholder,
  label,
  buttonText,
  submitText,
  type,
  registerProps,
  onButtonClick,
}: InputProps) => {
  return (
    <div className="space-y-1">
      {label?.top && <label className="text-sm text-gray-500">{label.top}</label>}
      <div className="flex">
        {label?.left && (
          <span className="flex items-center text-sm text-gray-400 px-3 border border-gray-300 border-r-0 rounded-l-md bg-gray-50">
            {label.left}
          </span>
        )}
        <input
          className={className(
            "appearance-none w-full border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm rounded-md z-10 placeholder-gray-400",
            label?.left ? "rounded-l-none" : "",
            label?.right || buttonText || submitText ? "rounded-r-none" : ""
          )}
          placeholder={placeholder}
          type={type}
          {...registerProps}
        />
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
        {buttonText && (
          <span
            onClick={onButtonClick}
            className="flex items-center px-3 text-sm text-gray-400 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-50 cursor-pointer"
          >
            {buttonText}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;

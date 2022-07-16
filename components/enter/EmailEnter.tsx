import { useState } from "react";
import className from "../../libs/createClassName";

const EmailEnterForm = () => {
  const [loginLinkSended, setLoginLinkSended] = useState<boolean>(false);
  return (
    <form className="flex flex-col mt-16 max-w-3xl mx-auto">
      <div className="space-y-1">
        <label className="text-sm text-gray-500">Email address</label>
        <div className="flex">
          <input
            className={className(
              "appearance-none w-full border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm",
              loginLinkSended ? "rounded-l-md" : "rounded-md"
            )}
            type="email"
            required
          />
          {loginLinkSended && (
            <span className="flex items-center px-3 text-sm text-gray-400 border border-l-0 border-gray-300 rounded-r-md bg-gray-50">
              Sent
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm px-3 py-3 rounded-md border-transparent focus:outline-none focus:ring-offset-2 focus:ring-orange-500 focus:ring-2 shadow-sm"
      >
        Get Login Link
      </button>
    </form>
  );
};

export default EmailEnterForm;

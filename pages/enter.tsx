import { useState } from "react";
import Layout from "../components/Layout";
import className from "../libs/createClassName";

const Enter = () => {
  const [enterMethod, setEnterMethod] = useState<"email" | "phone">("email");
  const handleEmailButtonClick = () => setEnterMethod("email");
  const handlePhoneButtonClick = () => setEnterMethod("phone");
  return (
    <Layout title="Enter">
      <div className="mt-20 px-5">
        <h3 className="text-3xl font-bold text-center">Enter to Carrot</h3>
        <div className="mt-16 flex flex-row justify-center">
          <button
            className={className(
              "w-56 text-sm font-medium border-b p-2 focus:outline-none",
              enterMethod === "email" ? " border-b border-orange-500 text-orange-500" : ""
            )}
            onClick={handleEmailButtonClick}
          >
            Email
          </button>
          <button
            className={className(
              "w-56 text-sm font-medium border-b p-2 focus:outline-none",
              enterMethod === "phone" ? " border-b border-orange-500 text-orange-500" : ""
            )}
            onClick={handlePhoneButtonClick}
          >
            Phone
          </button>
        </div>
        <form className="flex flex-col mt-16 max-w-3xl m-auto">
          <label className="text-sm text-gray-500">
            {enterMethod === "email" ? "Email address" : "Phone number"}
          </label>
          <div className="mt-1">
            {enterMethod === "email" ? (
              <input
                className="appearance-none w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                type="text"
                required
              />
            ) : (
              <div className="flex flex-row">
                <span className="flex items-center justify-center px-3 shadow-sm rounded-l-md border border-gray-300 border-r-0 bg-gray-50 text-gray-400 text-sm select-none">
                  +82
                </span>
                <input
                  className="appearance-none w-full border border-gray-300 rounded-r-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                  type="number"
                  id="phoneInput"
                  required
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm px-3 py-3 rounded-md border-transparent focus:outline-none focus:ring-offset-2 focus:ring-orange-500 focus:ring-2 shadow-sm"
          >
            {enterMethod === "email" ? "Get Login Link" : "Get One-Time Password"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Enter;

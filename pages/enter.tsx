import { useState } from "react";
import Layout from "../components/Layout";
import PhoneInput from "../components/input/PhoneInput";
import className from "../libs/createClassName";
import EmailEnterForm from "../components/enter/EmailEnter";
import PhoneEnterForm from "../components/enter/PhoneEnter";

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
        {enterMethod === "email" ? <EmailEnterForm /> : <PhoneEnterForm />}
      </div>
    </Layout>
  );
};

export default Enter;

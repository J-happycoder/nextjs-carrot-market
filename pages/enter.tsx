import { useState } from "react";
import Layout from "../components/Layout";
import className from "../libs/createClassName";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import useEnter from "../components/useEnter";

interface EnterFormValues {
  email?: string;
  phone?: string;
}

const Enter = () => {
  const { register, handleSubmit, reset } = useForm<EnterFormValues>();
  const [enterMethod, setEnterMethod] = useState<"email" | "phone">("email");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { enter, data, error, loading } = useEnter();

  const handleEmailButtonClick = () => {
    setErrorMessage("");
    reset();
    setEnterMethod("email");
  };
  const handlePhoneButtonClick = () => {
    setErrorMessage("");
    reset();
    setEnterMethod("phone");
  };

  const onValid = async (data: EnterFormValues) => {
    enter(data);
  };
  const onInvalid: SubmitErrorHandler<EnterFormValues> = (errors) => {
    if (errors.email?.type === "required") {
      setErrorMessage("Email address is required.");
    } else if (errors.phone?.type === "required") {
      setErrorMessage("Phone number is required.");
    }
  };

  return (
    <Layout title="Enter">
      <div className="mt-20 px-5">
        <h3 className="text-3xl font-bold text-center">Enter to Carrot</h3>
        {data?.ok ? (
          <>
            <form className="flex flex-col mt-24 max-w-3xl mx-auto">
              <Input type="text" label={{ top: "Your One-Time Password" }} />
              <Button text="Enter to Carrot" />
            </form>
          </>
        ) : (
          <>
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
            <form
              onSubmit={handleSubmit(onValid, onInvalid)}
              className="flex flex-col mt-16 max-w-3xl mx-auto"
            >
              {enterMethod === "email" && (
                <Input
                  type="email"
                  label={{ top: "Email address" }}
                  registerProps={register("email", { required: true })}
                />
              )}
              {enterMethod === "phone" && (
                <Input
                  registerProps={register("phone", { required: true })}
                  type="number"
                  label={{ top: "Phone number", left: "+82" }}
                />
              )}
              {errorMessage !== "" && (
                <span className="mt-1 mx-auto text-sm font-medium text-orange-600 ">
                  {errorMessage}
                </span>
              )}
              {enterMethod === "email" && <Button text={loading ? "Loading" : "Get Login Link"} />}
              {enterMethod === "phone" && (
                <Button text={loading ? "Loading" : "Get One-Time Password"} />
              )}
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Enter;

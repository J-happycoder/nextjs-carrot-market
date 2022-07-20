import { useState } from "react";
import Layout from "../components/Layout";
import className from "../libs/createClassName";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";

interface EnterFormValues {
  email?: string;
  phone?: string;
  oneTimePassword?: string;
}

const Enter = () => {
  const { register, handleSubmit, setValue } = useForm<EnterFormValues>();
  const [enterMethod, setEnterMethod] = useState<"email" | "phone">("email");
  const [oneTimePasswordSended, setOneTimePasswordSended] = useState<boolean>(false);
  const [loginLinkSended, setLoginLinkSended] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const initPhoneEnter = () => {
    setValue("phone", "");
    setValue("oneTimePassword", "");
  };

  const initEmailEnter = () => setValue("email", "");

  const handleEmailButtonClick = () => {
    setErrorMessage("");
    initPhoneEnter();
    setEnterMethod("email");
  };
  const handlePhoneButtonClick = () => {
    setErrorMessage("");
    initEmailEnter();
    setEnterMethod("phone");
  };

  const resend = () => {
    initPhoneEnter();
    setErrorMessage("");
    setOneTimePasswordSended(false);
  };

  const onValid = async (data: EnterFormValues) => {
    const enterData = data;
    await fetch("/api/enter", {
      method: "POST",
      body: JSON.stringify(enterData),
      headers: { "Content-Type": "application/json" },
    });
  };
  const onInvalid: SubmitErrorHandler<EnterFormValues> = (errors) => {
    if (errors.email?.type === "required") {
      setErrorMessage("Email address is required.");
    } else if (errors.phone?.type === "required") {
      setErrorMessage("Phone number is required.");
    } else if (errors.oneTimePassword?.type === "required") {
      setErrorMessage("One-Time Password is required.");
    }
  };
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
        <form
          onSubmit={handleSubmit(onValid, onInvalid)}
          className="flex flex-col mt-16 max-w-3xl mx-auto"
        >
          {enterMethod === "email" && (
            <Input
              type="email"
              label={{ top: "Email address", ...(loginLinkSended && { right: "Sent" }) }}
              registerProps={register("email", { required: true })}
            />
          )}
          {enterMethod === "phone" &&
            (oneTimePasswordSended ? (
              <Input
                registerProps={register("oneTimePassword", { required: true })}
                type="number"
                label={{ top: "Your One-Time Password" }}
                buttonText="Resend"
                onButtonClick={resend}
              />
            ) : (
              <Input
                registerProps={register("phone", { required: true })}
                type="number"
                label={{ top: "Phone number", left: "+82" }}
              />
            ))}
          {errorMessage !== "" && (
            <span className="mt-1 mx-auto text-sm font-medium text-orange-600 ">
              {errorMessage}
            </span>
          )}
          {enterMethod === "email" && <Button text="Get Login Link" />}
          {enterMethod === "phone" && (
            <Button text={oneTimePasswordSended ? "Enter to Carrot" : "Get One-Time Password"} />
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Enter;

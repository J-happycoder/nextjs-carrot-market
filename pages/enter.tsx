import { useState } from "react";
import Layout from "../components/Layout";
import className from "../libs/client/createClassName";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import useMutation from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

const Enter = () => {
  const { register, handleSubmit, reset, getValues } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: handleTokenSubmit } = useForm<TokenForm>();
  const [enterMethod, setEnterMethod] = useState<"email" | "phone">("email");
  const [enter, { data: enterData, loading: enterLoading, error: enterError }] =
    useMutation<EnterForm>("/api/users/enter");
  const [confirm, { data: confirmData, loading: confirmLoading, error: confirmError }] =
    useMutation<TokenForm & EnterForm>("/api/users/confirm");
  const { user, mutateUser } = useUser({ routeType: "public", redirectTo: "/" });

  const handleEmailButtonClick = () => {
    reset();
    setEnterMethod("email");
  };
  const handlePhoneButtonClick = () => {
    reset();
    setEnterMethod("phone");
  };

  const onValid = (data: EnterForm) => {
    enter(data);
  };

  const onTokenValid = async (data: TokenForm) => {
    const { email, phone } = getValues();
    const { token } = data;
    confirm({ email, phone, token });
    mutateUser();
  };

  return (
    <Layout title="Enter">
      <div className="mt-20 px-5">
        <h3 className="text-3xl font-bold text-center">Enter to Carrot</h3>
        {enterData?.ok ? (
          <>
            <form
              onSubmit={handleTokenSubmit(onTokenValid)}
              className="flex flex-col mt-24 max-w-xl mx-auto"
            >
              <Input
                registerProps={tokenRegister("token")}
                type="text"
                label={{ top: "Your One-Time Password" }}
              />
              <Button text={confirmLoading ? "Loading" : "Confirm Password"} />
            </form>
          </>
        ) : (
          <>
            <div className="mt-16 grid grid-cols-2 justify-center max-w-md mx-auto">
              <button
                className={className(
                  "text-sm font-medium border-b p-3 focus:outline-none",
                  enterMethod === "email" ? " border-b border-orange-500 text-orange-500" : ""
                )}
                onClick={handleEmailButtonClick}
              >
                Email
              </button>
              <button
                className={className(
                  "text-sm font-medium border-b p-3 focus:outline-none",
                  enterMethod === "phone" ? " border-b border-orange-500 text-orange-500" : ""
                )}
                onClick={handlePhoneButtonClick}
              >
                Phone
              </button>
            </div>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-16 max-w-xl mx-auto">
              {enterMethod === "email" && (
                <Input
                  type="email"
                  label={{ top: "Email address" }}
                  registerProps={register("email")}
                />
              )}
              {enterMethod === "phone" && (
                <Input
                  registerProps={register("phone")}
                  type="number"
                  label={{ top: "Phone number", left: "+82" }}
                />
              )}
              <Button text={enterLoading ? "Loading" : "Get One-Time Password"} />
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Enter;

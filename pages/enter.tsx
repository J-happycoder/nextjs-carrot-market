import { useState } from "react";
import Layout from "@components/Layout";
import className from "@libs/client/createClassName";
import { useForm } from "react-hook-form";
import Input from "@components/Input";
import Button from "@components/Button";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

interface EnterResponse {
  ok: boolean;
}

const Enter: NextPage = () => {
  const { register, handleSubmit, reset, getValues } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: handleTokenSubmit } = useForm<TokenForm>();
  const [enterMethod, setEnterMethod] = useState<"email" | "phone">("email");
  const [enter, { data: enterData, loading: enterLoading, error: enterError }] =
    useMutation<EnterResponse>("/api/users/enter");
  const [confirm, { data: confirmData, loading: confirmLoading, error: confirmError }] =
    useMutation<EnterResponse>("/api/users/confirm");
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
    if (enterLoading) return;
    enter({ data });
  };

  const onTokenValid = async (data: TokenForm) => {
    if (confirmLoading) return;
    const { email, phone } = getValues();
    const { token } = data;
    await confirm({
      data: { email, phone, token },
    });
    mutateUser();
  };

  return (
    <Layout title="Enter to Carrot" enter>
      <div className="flex flex-col mt-20">
        <h1 className="text-3xl font-bold text-center">Enter to Carrot</h1>
        {enterData?.ok ? (
          <>
            <form onSubmit={handleTokenSubmit(onTokenValid)} className="flex flex-col mt-24">
              <Input
                registerProps={tokenRegister("token")}
                type="text"
                label={{ top: "Your One-Time Password" }}
              />
              {confirmData && !confirmData.ok && (
                <span className="mx-auto text-sm text-orange-600 mt-1">Your code is wrong.</span>
              )}
              <Button text={confirmLoading ? "Loading" : "Confirm Password"} />
            </form>
          </>
        ) : (
          <>
            <span className="mx-auto text-sm text-gray-400 mt-16">Enter using:</span>
            <div className="grid grid-cols-2 justify-center">
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
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-16">
              {enterMethod === "email" && (
                <Input
                  type="email"
                  required
                  label={{ top: "Email address" }}
                  registerProps={register("email")}
                />
              )}
              {enterMethod === "phone" && (
                <Input
                  registerProps={register("phone")}
                  type="number"
                  required
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

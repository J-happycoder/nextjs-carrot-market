import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "../input/PhoneInput";

interface PhoneEnterFormValues {
  phone: string;
}

interface OneTimePasswordFormValues {
  oneTimePassword: string;
}

const PhoneEnterForm = () => {
  const { register: phoneRegister, handleSubmit: handlePhoneSubmit } =
    useForm<PhoneEnterFormValues>();
  const { register: oneTimePasswordRegister, handleSubmit: handleOneTimePasswordSubmit } =
    useForm<OneTimePasswordFormValues>();
  const [oneTimePasswordSended, setOneTimePasswordSended] = useState<boolean>(true);
  const onPhoneValid = (data: PhoneEnterFormValues) => {
    console.log(data);
  };
  const onOneTimePasswordValid = (data: OneTimePasswordFormValues) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={
        oneTimePasswordSended
          ? handleOneTimePasswordSubmit(onOneTimePasswordValid)
          : handlePhoneSubmit(onPhoneValid)
      }
      className="flex flex-col mt-16 max-w-3xl mx-auto"
    >
      {oneTimePasswordSended ? (
        <>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Your One-Time Password</label>
            <div className="flex">
              <input
                className="appearance-none w-full border border-gray-300 rounded-l-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm z-10"
                type="number"
                required
                {...oneTimePasswordRegister("oneTimePassword")}
              />
              <span className="flex items-center px-3 text-sm text-gray-400 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-50 cursor-pointer">
                Resend
              </span>
            </div>
          </div>
        </>
      ) : (
        <PhoneInput label="Phone number" register={phoneRegister("phone")} />
      )}
      <button
        type="submit"
        className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm px-3 py-3 rounded-md border-transparent focus:outline-none focus:ring-offset-2 focus:ring-orange-500 focus:ring-2 shadow-sm"
      >
        {oneTimePasswordSended ? "Enter to Carrot" : "Get One-Time Password"}
      </button>
    </form>
  );
};

export default PhoneEnterForm;

import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateProfileForm {
  email?: string;
  phone?: string;
  name?: string;
}

const UpdateProfile = () => {
  const { user, mutateUser } = useUser({ routeType: "entered", redirectTo: "/enter" });
  const { register, handleSubmit, setValue } = useForm<UpdateProfileForm>();

  const onValid = (data: UpdateProfileForm) => {
    console.log(data);
  };

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
  }, [user]);

  return (
    <Layout title="Update Profile">
      <div className="mt-20 px-5">
        <h1 className="text-3xl font-bold text-center">Update Profile</h1>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-16 max-w-xl mx-auto">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <label
              htmlFor="image"
              className="text-sm text-gray-400 px-3 py-1.5 cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Change
            </label>
            <input type="file" accept="image/*" className="hidden" id="image" required />
          </div>
          <div className="space-y-1">
            <Input
              registerProps={register("email")}
              type="email"
              label={{ top: "Email address" }}
            />
            <Input
              registerProps={register("phone")}
              type="text"
              label={{ top: "Phone number", left: "+82" }}
            />
            <Input registerProps={register("name")} type="text" label={{ top: "Name" }} />
          </div>
          <Button text="Update Profile" />
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProfile;

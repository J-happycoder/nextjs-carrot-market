import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UpdateProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
}

const UpdateProfile = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser({ routeType: "entered", redirectTo: "/enter" });
  const { register, handleSubmit, setValue } = useForm<UpdateProfileForm>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [updateProfile, { data, loading }] = useMutation<UpdateProfileForm>(`/api/users/update`);

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
  }, [user]);

  useEffect(() => {
    if (data?.ok && user?.id) {
      router.push(`/users/${user.id}`);
    }
  }, [data]);

  const onValid = async (data: UpdateProfileForm) => {
    if (loading) return;
    const { email, phone, name, avatar } = data;
    setErrorMessage("");
    if (!email && !phone) {
      setErrorMessage("Email address OR Phone number is required.");
    } else {
      await updateProfile(data);
      mutateUser();
    }
  };

  return (
    <Layout title="Update Profile">
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-24">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <label
              htmlFor="image"
              className="text-sm text-gray-400 px-2.5 py-1.5 cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Change
            </label>
            <input
              {...register("avatar")}
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
            />
          </div>
          <Input registerProps={register("email")} type="email" label={{ right: "email" }} />
          <Input
            registerProps={register("phone")}
            type="text"
            label={{ right: "phone", left: "+82" }}
          />
          {errorMessage && <span className="mx-auto text-sm text-orange-600">{errorMessage}</span>}
          <Input registerProps={register("name")} type="text" label={{ right: "name" }} required />
        </div>
        <Button text={loading ? "Loading" : "Update Profile"} />
      </form>
    </Layout>
  );
};

export default UpdateProfile;

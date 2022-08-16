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
  avatars?: FileList;
}

interface UpdateResponse {
  ok?: boolean;
  error?: {
    message: string;
  };
}

const UpdateProfile = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser({ routeType: "entered", redirectTo: "/enter" });
  const { register, handleSubmit, setValue, watch } = useForm<UpdateProfileForm>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [updateProfile, { data, loading }] = useMutation<UpdateResponse>(`/api/users/update`);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
    if (user?.avatarId) {
      console.log(`https://imagedelivery.net/NBXXy2GWfraNvFGhspc2LQ/${user.avatarId}/public`);
      setPreview(`https://imagedelivery.net/NBXXy2GWfraNvFGhspc2LQ/${user.avatarId}/public`);
    }
  }, [user]);

  useEffect(() => {
    if (data?.ok && user?.id) {
      router.push("/users/me");
    } else if (data?.error) {
      setErrorMessage(data.error.message);
    }
  }, [data]);

  const onValid = async (data: UpdateProfileForm) => {
    if (loading) return;
    const { email, phone, name, avatars } = data;
    setErrorMessage("");
    if (!email && !phone) {
      return setErrorMessage("Email address OR Phone number is required.");
    }
    await updateProfile({
      data: { email, phone, name },
      ...(avatars && avatars.length > 0 ? { image: avatars[0] } : {}),
    });
    mutateUser();
  };
  const avatars = watch("avatars");
  useEffect(() => {
    if (avatars && avatars.length > 0) setPreview(URL.createObjectURL(avatars[0]));
  }, [avatars]);

  return (
    <Layout title="Update Profile" before="/users/me">
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-16 px-5">
        <div className="flex items-center space-x-3">
          {preview ? (
            <img src={preview} className="w-14 h-14 rounded-full shadow-sm object-cover" />
          ) : (
            <div className="w-14 h-14 bg-gray-300 rounded-full shadow-sm"></div>
          )}
          <label
            htmlFor="image"
            className="text-sm text-gray-400 px-2.5 py-1.5 cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm"
          >
            Change
            <input
              {...register("avatars")}
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
            />
          </label>
        </div>
        <Input registerProps={register("name")} type="text" label={{ top: "Name" }} required />
        <Input registerProps={register("email")} type="email" label={{ top: "Email address" }} />
        <Input
          registerProps={register("phone")}
          type="text"
          label={{ top: "Phone number", left: "+82" }}
        />
        {errorMessage && (
          <span className="mx-auto font-medium mt-2 text-sm text-orange-600">{errorMessage}</span>
        )}
        <Button text={loading ? "Loading" : "Update Profile"} />
      </form>
    </Layout>
  );
};

export default UpdateProfile;

import Layout from "@components/Layout";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "@components/Button";

interface UploadForm {
  thumbnail: FileList;
  name: string;
  price: string;
  description: string;
}

const Upload = () => {
  const router = useRouter();
  const { user } = useUser({ routeType: "entered" });
  const { register, handleSubmit } = useForm<UploadForm>();
  const [uploadItem, { data, loading }] = useMutation<UploadForm>("/api/items/upload");
  useEffect(() => {
    if (data?.itemId) {
      router.push(`/items/${data.itemId}`);
    }
  }, [data]);
  const onValid = (data: UploadForm) => {
    if (loading) return;
    uploadItem(data);
  };
  return (
    <Layout title="Upload">
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-20">
        <div className="space-y-2">
          <div className="flex items-center justify-start space-x-10">
            <label
              htmlFor="image"
              className="text-sm text-gray-400 px-3 py-1.5 cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Change
            </label>
            <div className=""></div>
            <input
              {...register("thumbnail")}
              type="file"
              accept="image/*"
              className="hidden"
              id="image"
            />
          </div>
          <Input
            registerProps={register("name")}
            label={{ top: "Item name" }}
            type="text"
            required
          />
          <Input
            registerProps={register("price")}
            label={{ top: "Price", left: "$", right: "USD" }}
            type="number"
            required
          />
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-500">Description</label>
            <textarea
              {...register("description")}
              className="h-32 border border-gray-300 rounded-md appearance-none shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm z-10"
            />
          </div>
        </div>
        <Button text={loading ? "Loading" : "Upload"} />
      </form>
    </Layout>
  );
};

export default Upload;

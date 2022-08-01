import Layout from "@components/Layout";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "@components/Button";
import { NextPage } from "next";

interface UploadForm {
  thumbnail: FileList;
  name: string;
  price: string;
  description: string;
}

const Upload: NextPage = () => {
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
            <label className="text-gray-700 cursor-pointer w-full flex space-x-1 items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-md">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="text-sm font-medium">Drop an image or click to browse.</span>
              <input {...register("thumbnail")} type="file" accept="image/*" className="hidden" />
            </label>
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

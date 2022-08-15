import Layout from "@components/Layout";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@components/Button";
import { NextPage } from "next";

interface UploadForm {
  name: string;
  price: string;
  description: string;
  photos: FileList;
}

const Upload: NextPage = () => {
  useUser({ routeType: "entered", redirectTo: "/enter" });
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadForm>();
  const [uploadItem, { data: uploadData, loading }] = useMutation("/api/items/upload");
  const [photoUploading, setPhotoUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (uploadData?.itemId) {
      router.push(`/items/${uploadData.itemId}`);
    }
  }, [uploadData]);

  const uploadPhoto = async () => {
    const { id, uploadURL } = await (await fetch("/api/upload-url")).json();
    const form = new FormData();
    form.append("file", photos[0]);
    await fetch(uploadURL, { method: "POST", body: form });
    return id;
  };

  const onValid = async (data: UploadForm) => {
    if (loading) return;
    const { name, price, description, photos } = data;
    if (photos && photos.length > 0) {
      setPhotoUploading(true);
      const id = await uploadPhoto();
      setPhotoUploading(false);
      uploadItem({ name, price, description, id });
    }
  };

  const photos = watch("photos");

  useEffect(() => {
    if (photos && photos.length > 0) setPreviewUrl(URL.createObjectURL(photos[0]));
  }, [photos]);

  return (
    <Layout title="Upload">
      <div className="mt-12 px-5">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
          <div className="space-y-2">
            {previewUrl ? (
              <div className="flex flex-col items-center space-y-2">
                <img src={previewUrl} className="h-40 rounded-md" />
              </div>
            ) : (
              <label className="text-gray-700 hover:text-orange-500 cursor-pointer w-full flex space-x-1 items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-md hover:border-orange-500">
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
                <span className="text-sm font-medium">Photo</span>
                <input
                  {...register("photos")}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                />
              </label>
            )}
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
          <Button text={loading || photoUploading ? "Loading" : "Upload"} />
        </form>
      </div>
    </Layout>
  );
};

export default Upload;

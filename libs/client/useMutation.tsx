import { useState } from "react";

interface MutationData {
  data: any;
  image?: File | undefined;
}

interface MutationResponse {
  data: Response | undefined;
  loading: boolean;
  error: any;
}

export default function useMutation<Data>(
  url: string | null,
  method?: string
): [
  (mutationData: MutationData) => Promise<any>,
  {
    data: Data | undefined;
    loading: boolean;
    error: any;
  }
] {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const uploadImage = async (image: File) => {
    const { id, uploadURL } = await (await fetch("/api/upload-url")).json();
    const form = new FormData();
    form.append("file", image);
    await fetch(uploadURL, { method: "POST", body: form });
    return id;
  };
  const mutate = async ({ data, image }: MutationData) => {
    if (!url) return;
    setLoading(true);
    let body = data;
    if (image) {
      const id = await uploadImage(image);
      body = { ...data, id };
    }
    setData(
      await (
        await fetch(url, {
          method: method || "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()
    );
    setLoading(false);
  };
  return [mutate, { data, loading, error }];
}

import { useState } from "react";

interface MutationResponse {
  data: Response | undefined;
  loading: boolean;
  error: any;
}

export default function useMutation<Data>(
  url: string | null,
  method?: string
): [
  (mutationData: any) => Promise<any>,
  {
    data: Data | undefined;
    loading: boolean;
    error: any;
  }
] {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const mutate = async (data: any) => {
    if (!url) return;
    setLoading(true);
    setData(
      await (
        await fetch(url, {
          method: method || "POST",
          body: JSON.stringify(data),
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

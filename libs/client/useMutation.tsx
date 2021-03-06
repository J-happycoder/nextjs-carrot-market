import { useState } from "react";

export default function useMutation<FetchBody>(
  url: string
): [(data: FetchBody) => Promise<any>, { data: any; loading: boolean; error: any }] {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const mutate = async (data: FetchBody) => {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setData(await response.json());
    }
    setLoading(false);
  };
  return [mutate, { data, loading, error }];
}

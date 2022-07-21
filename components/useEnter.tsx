import { useState } from "react";
import useSWR from "swr";

interface EnterFormValues {
  email?: string;
  phone?: string;
}

const useEnter = () => {
  const { data, error, mutate } = useSWR("/api/enter");
  const [loading, setLoading] = useState<boolean>(false);
  const enter = async (formValues: EnterFormValues) => {
    setLoading(true);
    await mutate(
      await (
        await fetch("/api/enter", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()
    );
    setLoading(false);
  };
  return { enter, data, error, loading };
};

export default useEnter;

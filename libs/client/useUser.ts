import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UseUserProps {
  routeType?: "public" | "entered" | "private";
  redirectTo?: string;
  userId?: number;
}

interface SWRUserData {
  user: User;
}

export default function useUser({ routeType, redirectTo, userId }: UseUserProps) {
  const { data, error, mutate: mutateUser } = useSWR<SWRUserData>("/api/users/current-user");
  const router = useRouter();
  useEffect(() => {
    if (!data) {
      return;
    }
    const forbidden =
      (routeType === "public" && data.user) ||
      (routeType === "entered" && !data.user) ||
      (routeType === "private" && data.user?.id !== userId);
    if (forbidden && redirectTo) {
      router.push(redirectTo);
    }
  }, [data, routeType, redirectTo]);
  return { user: data?.user, mutateUser };
}

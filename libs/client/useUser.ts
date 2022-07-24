import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UseUserProps {
  routeType?: "public" | "entered" | "private";
  redirectTo?: string;
  userId?: number;
}

export default function useUser({ routeType, redirectTo, userId }: UseUserProps) {
  const { data: user, error, mutate: mutateUser } = useSWR<User>("/api/users/current-user");
  const router = useRouter();
  useEffect(() => {
    const forbidden =
      (routeType === "public" && user) ||
      (routeType === "entered" && !user) ||
      (routeType === "private" && user?.id !== userId);
    if (forbidden && redirectTo) {
      router.push(redirectTo);
    }
  }, [user, routeType, redirectTo]);
  return { user, mutateUser };
}

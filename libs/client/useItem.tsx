import { Item } from "@prisma/client";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface UseItemProps {
  id?: string | string[] | undefined;
  multiple?: boolean;
}

interface ItemResponse {
  item?: Item;
  items?: Item[];
}

const useItem = ({ id, multiple }: UseItemProps): { data: ItemResponse | undefined } => {
  const { data } = useSWR<ItemResponse>(multiple ? "/api/items" : `/api/items/${id}`);
  return { data };
};

export default useItem;

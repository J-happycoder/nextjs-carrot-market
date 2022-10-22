import Layout from "@components/Layout";
import Sold from "@components/Sold";
import Status from "@components/Status";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import type { FavoritesOnItems, Item } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ChatData {
  ok: boolean;
  id: number;
}

const GrayHeart = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const OrangeHeart = () => (
  <svg
    className="w-5 h-5 text-orange-500 hidden group-active:block"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const Item: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: item, mutate } = useSWR<Item & { likes: FavoritesOnItems[] }>(
    id ? `/api/items/${id}` : null
  );
  const [createOrFindChat, { data: chatData }] =
    useMutation<ChatData>("/api/chats/new");
  const [addLike, { data: likeData }] = useMutation(
    id ? `/api/items/${id}/addLike` : null,
    "PATCH"
  );
  const { user } = useUser({ routeType: "entered", redirectTo: "/enter" });
  useEffect(() => {
    if (chatData?.ok) {
      router.push(`/chats/${chatData.id}`);
    }
  }, [chatData]);

  const handleLikeClick = async () => {
    await addLike({});
    mutate();
  };
  const onChatClick = async () => {
    if (id && user?.id) {
      createOrFindChat({
        data: {
          itemId: id,
          customerId: user.id,
        },
      });
    }
  };
  return (
    <Layout title={item?.name}>
      {item?.photoId ? (
        <img
          className="mt-16 rounded-md"
          src={`https://imagedelivery.net/NBXXy2GWfraNvFGhspc2LQ/${item.photoId}/public`}
        />
      ) : (
        <div className="h-64 bg-gray-200 mx-auto mt-16 rounded-md"></div>
      )}
      <div className="flex flex-row justify-between items-center max-w-2xl w-full mx-auto mt-1">
        <span className="text-xl font-bold">${item?.price}</span>
        {item?.sold && <Sold />}
      </div>
      <div className="flex items-center space-x-1 text-sm text-gray-500 mt-5">
        <Status likes={item?.likes.length} views={item?.views} />
      </div>
      <div className="flex space-x-1 mt-5">
        <button
          onClick={onChatClick}
          className="text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 px-3 py-2 rounded-md shadow-sm w-full"
        >
          Talk to Seller
        </button>
        <button
          onClick={handleLikeClick}
          className="px-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-md focus:outline-none group"
        >
          <div className="group-active:hidden">
            <GrayHeart />
          </div>
          <div className="group-active:block">
            <OrangeHeart />
          </div>
        </button>
      </div>
      <div className="w-full mt-5">
        <p className="text-sm text-gray-500">{item?.description}</p>
      </div>
      <div className="mt-5 border-b border-gray-300" />
      {/* <div className="mt-3">
        <span className="text-sm font-medium">Kyle's items</span>
        <div className="grid grid-cols-2 gap-4 w-full mt-2">
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Item;

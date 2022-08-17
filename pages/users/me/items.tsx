import Layout from "@components/Layout";
import Sold from "@components/Sold";
import { Item } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface ItemsResponse {
  items: Item[];
}

const MyItems: NextPage = () => {
  const { data } = useSWR<ItemsResponse>("/api/items/my-items");
  return (
    <Layout title="My Items" before="/users/me">
      <div>
        {data?.items ? (
          <div className="mt-16 flex flex-col mx-auto space-y-3 mb-10 px-5">
            {data.items.map((item) => (
              <>
                <div key={item.id} className="flex">
                  <img
                    src={`https://imagedelivery.net/NBXXy2GWfraNvFGhspc2LQ/${item.photoId}/public`}
                    className="w-20 h-20 object-cover bg-gray-300 rounded-md"
                  />
                  <div className="ml-3 flex flex-col w-full relative">
                    <Link href={`/items/${item.id}`}>
                      <a className="text-sm">{item.name}</a>
                    </Link>
                    <span className="text-sm text-gray-400">{item.description}</span>
                    <span className="text-md font-bold">${item.price}</span>
                    <div className="flex absolute right-0 bottom-0">
                      <div className="text-sm flex items-center space-x-1 mr-2 text-gray-500">
                        <span>
                          {item.likes} {item.likes === 1 ? "like" : "likes"}
                        </span>
                      </div>
                      {item.sold && <Sold />}
                    </div>
                  </div>
                </div>
                <div className="mt-3 border-b border-gray-300"></div>
              </>
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MyItems;

import type { NextPage } from "next";
import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";
import Navigation from "@components/Navigation";
import useSWR from "swr";
import type { Item } from "@prisma/client";
import Link from "next/link";
import Sold from "@components/Sold";

interface ItemResponse {
  items: Item[];
}

const Home: NextPage = () => {
  const { data } = useSWR<ItemResponse>("/api/items");
  useUser({ routeType: "entered", redirectTo: "/enter" });
  return (
    <Layout title="Home" home>
      <div>
        {data?.items ? (
          <div className="mt-16 flex flex-col mx-auto space-y-3 mb-10 px-5">
            {data.items.map((item) => (
              <div key={item.id}>
                <div className="flex">
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
              </div>
            ))}
          </div>
        ) : null}
        <div className="fixed w-full max-w-lg mx-auto bottom-28">
          <div className="max-w-xl px-5 flex justify-end">
            <Link href="/items/upload">
              <button className="text-white bg-orange-500 hover:bg-orange-600 rounded-full cursor-pointer shadow-md p-3">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Navigation />
    </Layout>
  );
};

export default Home;

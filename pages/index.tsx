import type { NextPage } from "next";
import Layout from "@components/Layout";
import useSWR from "swr";
import type { Item as DBItem } from "@prisma/client";
import Item from "@components/Item";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";

interface ItemData {
  items: DBItem[];
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ItemData>("/api/items");
  const { user, mutateUser } = useUser({ routeType: "entered", redirectTo: "/enter" });
  const goUploadPage = () => router.push("/items/upload");
  return (
    <Layout title="Home" home>
      <div>
        {data?.items ? (
          <div className="mt-16 flex flex-col mx-auto space-y-5 mb-10 px-5">
            {data.items.map((item) => (
              <div key={item.likes} className="flex flex-col">
                <Item item={item} />
              </div>
            ))}
          </div>
        ) : null}
        <div className="fixed w-full max-w-lg mx-auto bottom-28">
          <div className="max-w-xl px-5 flex justify-end">
            <button
              onClick={goUploadPage}
              className="text-white bg-orange-500 hover:bg-orange-600 rounded-full cursor-pointer shadow-md p-3"
            >
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
          </div>
        </div>
      </div>
      <div className="fixed w-full max-w-lg mx-auto flex bottom-0 border-t border-gray-300 pt-2 pb-8 bg-white">
        <ul className="w-full px-5 mx-auto grid grid-cols-5 justify-between">
          <li className="cursor-pointer">
            <Link href="/">
              <div className="flex flex-col items-center text-gray-700">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                <span className="text-sm">Home</span>
              </div>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/neighborhood">
              <div className="flex flex-col items-center text-gray-700">
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  ></path>
                </svg>
                <span className="text-sm text-center">Neighbor</span>
              </div>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/near">
              <div className="flex flex-col items-center text-gray-700">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span className="text-sm">Near Me</span>
              </div>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/chats">
              <div className="flex flex-col items-center text-gray-700">
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
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  ></path>
                </svg>
                <span className="text-sm">Chats</span>
              </div>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/users/me">
              <div className="flex flex-col items-center text-gray-700">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span className="text-sm">My Profile</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;

import type { NextPage } from "next";
import Layout from "@components/Layout";
import Item from "@components/Item";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import Navigation from "@components/Navigation";
import useItem from "@libs/client/useItem";

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = useItem({ multiple: true });
  useUser({ routeType: "entered", redirectTo: "/enter" });
  const goUploadPage = () => router.push("/items/upload");
  return (
    <Layout title="Home" home>
      <div>
        {data?.items ? (
          <div className="mt-16 flex flex-col mx-auto space-y-5 mb-10 px-5">
            {data.items.map((item) => (
              <div key={item.id} className="flex flex-col">
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
      <Navigation />
    </Layout>
  );
};

export default Home;

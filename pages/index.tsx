import type { NextPage } from "next";
import Input from "@components/Input";
import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";

interface Product {
  name: string;
  id: number;
  likes: number;
  sold: boolean;
}

interface ProductJson {
  products: Product[];
}

const Home: NextPage = () => {
  const products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => ({
    name: "iPhone 14 Pro",
    likes: 1,
    sold: true,
  }));
  return (
    <Layout title="Home">
      <>
        <form className="backdrop-blur-sm flex flex-row justify-center px-14 py-2 border-b border-gray-300 sticky top-0 shadow-sm">
          <div className="max-w-xl w-full">
            <Input type="text" placeholder="Search for a product." submitText="search" />
          </div>
        </form>
        <div className="mt-16 flex flex-col max-w-2xl mx-auto px-5 space-y-5 mb-10">
          {products.map((product) => (
            <div key={product.likes} className="flex flex-row">
              <div className="w-28 h-28 bg-gray-300 rounded-md"></div>
              <div className="ml-3">
                <a href="/items/1" className="text-sm block">
                  {product.name}
                </a>
                <span className="text-sm text-gray-400">descriptions...........</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-5">
          <div className="max-w-2xl px-5 mx-auto flex justify-end">
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
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Home;

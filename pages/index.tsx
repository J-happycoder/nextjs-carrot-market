import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import className from "../libs/createClassName";

type Product = {
  name: string;
  likes: number;
  sold: Boolean;
};

type ProductJson = {
  products: Product[];
};

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const loadProducts = async () => {
    const { products }: ProductJson = await (await fetch("/api/products")).json();
    setProducts(products);
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Layout title="Home">
      <>
        <form className="backdrop-blur-sm flex flex-row justify-center px-14 py-2 border-b border-gray-300 sticky top-0 shadow-sm">
          <input
            className="appearance-none w-full border border-gray-300 rounded-l-md shadow-sm focus:border-orange-500 focus:ring-orange-500 placeholder-gray-400 text-sm max-w-xl z-10"
            type="text"
            placeholder="Search products."
          />
          <button
            className="px-2 text-sm text-gray-400 bg-white hover:bg-gray-50 border border-gray-300 border-l-0 rounded-r-md focus:outline-none shadow-sm"
            type="submit"
          >
            search
          </button>
        </form>
        <div className="mt-16 flex flex-col max-w-2xl m-auto px-5">
          {products.map((product) => (
            <div key={product.likes} className="flex flex-row mb-5">
              <div className="w-28 h-28 bg-gray-300 rounded-md"></div>
              <div className="ml-3">
                <h4 className="text-sm">{product.name}</h4>
                <span className="text-sm text-gray-400">descriptions...........</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-5">
          <div className="max-w-2xl px-5 m-auto flex justify-end">
            <i
              className={className(
                "fa-solid fa-plus",
                "text-white text-xl w-12 h-12 bg-orange-500 rounded-full flex justify-center items-center cursor-pointer shadow-md"
              )}
            ></i>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Home;

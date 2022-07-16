import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

type Product = {
  name: string;
  likes: number;
  sold: Boolean;
};

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product>({
    name: "Product",
    likes: 0,
    sold: false,
  });
  const loadProduct = async () => {
    const { product } = await (await fetch(`/api/products/${router.query}`)).json();
    setProduct(product);
  };
  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <Layout title="Product">
      <div>
        <h1 className="text-2xl font-bold text-center py-3 border-b border-gray-300">
          {product.name}
        </h1>
        <div className="max-w-2xl h-96 w-full bg-gray-200 m-auto mt-16 rounded-md"></div>
        <div className="flex flex-row max-w-2xl w-full m-auto justify-end mt-2">
          <span className="text-sm text-gray-400">
            {product.likes} {product.likes === 1 ? "like" : "likes"}
          </span>
          {product.sold ? (
            <span className="text-sm font-medium text-red-600 ml-2">Sold</span>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Product;

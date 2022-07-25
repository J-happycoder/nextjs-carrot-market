import Layout from "@components/Layout";

interface Product {
  name: string;
  likes: number;
  sold: boolean;
}

const Product = () => {
  const product = { name: "iPhone 13 Pro", likes: 1, sold: true };
  return (
    <Layout title="Product">
      <div>
        <h1 className="text-2xl font-bold text-center py-3 border-b border-gray-300">
          {product.name}
        </h1>
        <div className="max-w-2xl h-96 w-full bg-gray-200 mx-auto mt-16 rounded-md"></div>
        <div className="flex flex-row justify-between max-w-2xl w-full mx-auto mt-1">
          <span className="text-sm text-gray-400">
            {product.likes} {product.likes === 1 ? "like" : "likes"}
          </span>
          <span className="text-sm font-medium text-red-600">{product.sold ? "Sold" : ""}</span>
        </div>
        <div className="mx-auto max-w-2xl mt-2">
          <p className="text-sm text-gray-500 truncate">descriptions...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Product;

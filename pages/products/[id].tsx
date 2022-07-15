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
    name: "",
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
        <h1>{product.name}</h1>
        <span>{product.likes} likes</span>
        <span>{product.sold ? "Sold" : ""}</span>
      </div>
    </Layout>
  );
};

export default Product;

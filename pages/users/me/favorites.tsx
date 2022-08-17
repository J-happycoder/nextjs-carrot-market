import Layout from "@components/Layout";
import { NextPage } from "next";

const Favorites: NextPage = () => {
  return <Layout title="Favorites" before="/users/me"></Layout>;
};

export default Favorites;

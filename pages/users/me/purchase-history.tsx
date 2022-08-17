import Layout from "@components/Layout";
import { NextPage } from "next";

const PurchaseHistory: NextPage = () => {
  return <Layout title="Purchase History" before="/users/me"></Layout>;
};

export default PurchaseHistory;

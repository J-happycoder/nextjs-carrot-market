import Head from "next/head";
import { ReactElement } from "react";
import Navigation from "./Navigation";

interface layoutProps {
  title: string;
  children: ReactElement;
}

const Layout = ({ title, children }: layoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;

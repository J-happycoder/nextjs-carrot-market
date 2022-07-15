import { ReactElement } from "react";
import Head from "next/head";
import Navigation from "./Navigation";

type layoutProps = {
  title: string;
  children: ReactElement;
};

const Layout = ({ title, children }: layoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </Head>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;

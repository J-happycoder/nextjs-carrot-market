import Head from "next/head";
import { ReactElement } from "react";
import Header from "@components/Header";
import useUser from "@libs/client/useUser";

interface layoutProps {
  title: string;
  children?: ReactElement | ReactElement[];
  home?: boolean;
  enter?: boolean;
}

const Layout = ({ title, children, home, enter }: layoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {!enter && <Header title={title} home={home} />}
      <div className="max-w-lg mx-auto flex flex-col">{children}</div>
    </>
  );
};

export default Layout;

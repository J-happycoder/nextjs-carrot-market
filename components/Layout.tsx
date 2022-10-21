import Head from "next/head";
import { ReactElement } from "react";
import Header from "@components/Header";
import useUser from "@libs/client/useUser";

interface layoutProps {
  title: string | undefined;
  children?: ReactElement | ReactElement[];
  home?: boolean;
  enter?: boolean;
  before?: string;
}

const Layout = ({ title, children, home, enter, before }: layoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {!enter && <Header title={title} home={home} before={before ? before : "/"} />}
      <div className="max-w-lg mx-auto flex flex-col">{children}</div>
    </>
  );
};

export default Layout;

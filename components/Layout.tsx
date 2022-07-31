import Head from "next/head";
import { ReactElement } from "react";

interface layoutProps {
  title: string;
  children?: ReactElement | ReactElement[];
}

const Layout = ({ title, children }: layoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-white max-w-lg w-full z-10 flex items-center mx-auto py-2 border-b border-gray-300 sticky top-0">
        <h1 className="text-2xl font-bold text-center w-full">{title}</h1>
      </div>
      <div className="max-w-lg mx-auto flex flex-col">{children}</div>
    </>
  );
};

export default Layout;

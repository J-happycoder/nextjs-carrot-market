import Link from "next/link";
import { useState } from "react";
import className from "@libs/client/createClassName";
import Menu from "@components/Menu";
import useUser from "@libs/client/useUser";

const Navigation = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, mutateUser } = useUser({});
  const handleClose = () => setIsOpened(false);
  const handleMenuClick = () => setIsOpened((prev) => !prev);
  const logout = async () => {
    setLoading(true);
    await fetch("/api/users/logout");
    await mutateUser();
    setLoading(false);
  };
  return (
    <>
      <div
        onClick={handleMenuClick}
        className="text-gray-500 cursor-pointer fixed top-0 right-0 mx-auto px-5 py-4 z-10 ml-4"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.3"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
      <div
        className={className(
          "flex flex-col items-center fixed right-0 top-0 h-screen bg-gray-50 border-l border-gray-300 w-72 z-30 shadow-2xl transition-transform",
          isOpened ? "translate-x-0" : "translate-x-72"
        )}
      >
        <div className="flex w-full justify-end">
          <div onClick={handleClose} className="text-gray-500 cursor-pointer px-5 py-5">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.7"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col w-full mt-10 mb-16 h-full">
          <nav className="flex flex-col justify-between h-full">
            <ul className="text-sm flex flex-col">
              <Menu href="/" text="Home" />
              {!user && <Menu href="/enter" text="Enter" />}
              {user && <Menu href="/users/1" text="My Profile" />}
              {user && <Menu href="/items/upload" text="Upload" />}
              {user && <Menu href="/users/update" text="Update Profile" />}
            </ul>
            {user && (
              <button
                onClick={logout}
                className="mx-12 py-2 text-sm text-white rounded-md shadow-sm bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {loading ? "Loading" : "Logout"}
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;

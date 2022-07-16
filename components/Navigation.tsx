import Link from "next/link";
import { useState } from "react";
import className from "../libs/createClassName";

const Navigation = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleClose = () => setIsOpened(false);
  const handleMenuClick = () => setIsOpened((prev) => !prev);
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
          "flex flex-col items-center fixed right-0 top-0 h-screen bg-gray-50 border-l border-gray-300 w-80 z-30 shadow-2xl transition-transform",
          isOpened ? "translate-x-0" : "translate-x-80"
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
        <div className="flex flex-col w-full mt-10 justify-center items-center">
          <nav>
            <ul className="text-sm text-orange-400 flex flex-col items-center">
              <li>
                <Link href="/">
                  <a className="hover:underline">Home &rarr;</a>
                </Link>
              </li>
              <li>
                <Link href="/enter">
                  <a className="hover:underline">Enter &rarr;</a>
                </Link>
              </li>
              <li>
                <Link href="/users/1">
                  <a className="hover:underline">My Profile &rarr;</a>
                </Link>
              </li>
              <li>
                <Link href="/items/upload">
                  <a className="hover:underline">Upload &rarr;</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;

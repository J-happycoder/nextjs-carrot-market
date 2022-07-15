import Link from "next/link";
import { useState } from "react";
import className from "../libs/createClassName";

const Navigation = () => {
  const [isOpened, setIsOpened] = useState<Boolean>(false);
  const handleClose = () => setIsOpened(false);
  const handleMenuClick = () => setIsOpened((prev) => !prev);
  return (
    <>
      <i
        onClick={handleMenuClick}
        className={className(
          "fa-solid fa-bars",
          "text-lg text-gray-500 cursor-pointer fixed top-0 right-0 m-auto px-5 py-3 z-10 ml-4"
        )}
      />
      <div
        className={className(
          "flex flex-col items-center fixed right-0 top-0 h-screen bg-gray-50 border-l border-gray-300 w-80 z-10 shadow-2xl transition-transform",
          isOpened ? "translate-x-0" : "translate-x-80"
        )}
      >
        <div className="flex w-full justify-end">
          <i
            onClick={handleClose}
            className={className(
              "fa-solid fa-xmark",
              "text-lg text-gray-500 cursor-pointer px-5 py-3"
            )}
          />
        </div>
        <div className="flex flex-col w-full mt-10 justify-center items-center">
          <nav>
            <ul className="text-sm text-orange-400">
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
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;

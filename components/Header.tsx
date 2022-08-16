import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  home?: boolean;
  title: string;
  before: string;
}

const Header = ({ home, title, before }: HeaderProps) => {
  return (
    <div className="bg-white max-w-lg w-full z-10 grid grid-cols-3 items-center mx-auto py-2 border-b border-gray-300 sticky top-0">
      <div className="ml-2">
        {!home && (
          <Link href={before}>
            <svg
              className="w-5 h-5 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </Link>
        )}
      </div>
      <span className="text-xl font-bold text-center w-full">{title}</span>
    </div>
  );
};

export default Header;

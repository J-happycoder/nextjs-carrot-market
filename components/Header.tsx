import { useRouter } from "next/router";

interface HeaderProps {
  home?: boolean;
  title: string;
}

const Header = ({ home, title }: HeaderProps) => {
  const router = useRouter();
  const goHome = () => router.push("/");
  return (
    <div className="bg-white max-w-lg w-full z-10 grid grid-cols-3 items-center mx-auto py-2 border-b border-gray-300 sticky top-0">
      <div className="ml-2">
        {!home && (
          <svg
            onClick={goHome}
            className="w-6 h-6 cursor-pointer"
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
        )}
      </div>
      <span className="text-2xl font-bold text-center w-full">{title}</span>
    </div>
  );
};

export default Header;

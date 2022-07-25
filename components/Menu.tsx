import Link from "next/link";

interface MenuProps {
  text: string;
  href: string;
}

const Menu = ({ text, href }: MenuProps) => {
  return (
    <li className="flex bg-gray-50">
      <Link href={href}>
        <a className="text-gray-500 w-full text-center py-3 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
          {text}
        </a>
      </Link>
    </li>
  );
};

export default Menu;

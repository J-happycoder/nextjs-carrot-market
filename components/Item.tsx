import { Item } from "@prisma/client";

interface ItemProps {
  item: Item;
}

const Item = ({ item }: ItemProps) => {
  return (
    <>
      <div className="flex">
        <div className="p-10 bg-gray-300 rounded-md"></div>
        <div className="ml-3 relative w-full">
          <div className="flex flex-col">
            <a href="/products/1" className="text-sm">
              {item.name}
            </a>
            <span className="text-sm text-gray-400">{item.description}</span>
          </div>
          <div className="flex absolute bottom-0 right-3 space-x-2">
            <div className="text-sm flex items-center space-x-1 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{item.likes}</span>
            </div>
            {item.sold && (
              <span className="text-sm font-medium bg-orange-100 rounded-md px-2 py-1 text-orange-600">
                Sold
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 border-b border-gray-300"></div>
    </>
  );
};

export default Item;

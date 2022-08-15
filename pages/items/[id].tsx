import Layout from "@components/Layout";
import Sold from "@components/Sold";
import Status from "@components/Status";
import useItem from "@libs/client/useItem";
import type { Item } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Item: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useItem({ id, multiple: false });
  return (
    <Layout title={data?.item ? data.item.name : "Item"}>
      <div className="max-w-2xl h-64 w-full bg-gray-200 mx-auto mt-16 rounded-md"></div>
      <div className="flex flex-row justify-between items-center max-w-2xl w-full mx-auto mt-1">
        <span className="text-md font-bold">${data?.item ? data?.item.price : 0}</span>
        {data?.item?.sold && <Sold />}
      </div>
      <div className="flex items-center space-x-1 text-sm text-gray-500 mt-5">
        {data?.item?.likes && data?.item?.views ? (
          <Status likes={data.item.likes} views={data.item.views} />
        ) : (
          <Status likes={0} views={0} />
        )}
      </div>
      <div className="w-full mt-5">
        <p className="text-sm text-gray-500">{data?.item?.description}</p>
      </div>
      <div className="mt-5 border-b border-gray-300" />
      <div className="mt-3">
        <span className="text-sm font-medium">Kyle's items</span>
        <div className="grid grid-cols-2 gap-4 w-full mt-2">
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
          <div>
            <div className="w-full h-28 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between p-1">
              <span className="text-sm text-gray-600">item title</span>
              <span className="text-sm font-medium">$13</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Item;

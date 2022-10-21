// import Layout from "@components/Layout";
// import className from "@libs/client/createClassName";
// import { Chat } from "@prisma/client";
// import { NextPage } from "next";
// import { useRouter } from "next/router";
// import useSWR from "swr";

// interface ChatResponse {
//   chat: Chat;
// }

// const Chat: NextPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data: chat } = useSWR(id ? `/api/chats/${id}` : null);
//   return (
//     <Layout
//       title={chat?.item.name ? `${chat?.item.name}` : "Item"}
//       before={`/items/${chat?.item.id}`}
//     >
//       <div className="">
//         <div className="max-w-2xl mx-auto flex flex-col mb-40 mt-24 px-5 space-y-5">
//           {chat?.messages
//             ? chat?.messages.map((message, i) => (
//                 >
//                   <div
//                     className={className(
//                       "flex",
//                       message.from.name === "Kyle" ? "flex-row-reverse" : "flex-row"
//                     )}
//                   >
//                     <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
//                       <span className="text-sm font-medium text-gray-700">{message.from.name}</span>
//                     </div>
//                     <span className="max-w-sm border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-500 mx-2">
//                       {message.text}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             : null}
//         </div>
//         <form className="flex mx-auto px-5 sticky bottom-0 py-8 border-t border-gray-300 bg-white">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="appearance-none mx-auto w-full border border-gray-300 rounded-l-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm z-10"
//           />
//           <button
//             type="submit"
//             className="text-gray-500 px-3 border border-l-0 border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="3"
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               ></path>
//             </svg>
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Chat;

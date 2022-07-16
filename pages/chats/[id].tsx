import { text } from "stream/consumers";
import Layout from "../../components/Layout";
import className from "../../libs/createClassName";

const Chat = () => {
  const messages = [
    {
      from: { name: "Kyle" },
      text: "Hello my name is kyle lee lkjlkjlkje dkgi eif d keu wku Hello my name is kyle lee lkjlkjlkje dkgi eif d keu wku Hello my name is kyle lee lkjlkjlkje dkgi eif d keu wku Hello my name is kyle lee lkjlkjlkje dkgi eif d keu wku Hello my name is kyle lee lkjlkjlkje dkgi eif d keu wku Hello my name is kyle lee lkjlkjlkje dkgi eif d keu wku ",
    },
  ];
  return (
    <Layout title="Chat">
      <div className="">
        <div className="flex flex-col items-center py-3 border-b border-gray-300 sticky top-0 backdrop-blur-sm">
          <h1 className="text-2xl font-bold">iPhone 13 Pro</h1>
          <span className="text-sm text-gray-400">(with Bob)</span>
        </div>
        <div className="max-w-2xl mx-auto flex flex-col mb-40 mt-24 px-5 space-y-5">
          {messages.map((message, i) => (
            <div
              className={className(
                "flex",
                message.from.name === "Kyle" ? "justify-end" : "justify-start"
              )}
              key={i}
            >
              <div
                className={className(
                  "flex",
                  message.from.name === "Kyle" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                  <span className="text-sm font-medium text-gray-700">{message.from.name}</span>
                </div>
                <span className="max-w-sm border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-500 mx-2">
                  {message.text}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 pb-20 pt-4 backdrop-blur-sm w-full border-t border-gray-300">
          <form className="flex max-w-2xl w-full mx-auto px-5">
            <input
              type="text"
              placeholder="Type a message..."
              className="appearance-none mx-auto w-full border border-gray-300 rounded-l-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm z-10"
            />
            <button
              type="submit"
              className="text-gray-500 px-3 border border-l-0 border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
            >
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
                  strokeWidth="3"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

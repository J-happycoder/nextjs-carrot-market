import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";
import Link from "next/link";

const MyProfile = () => {
  const { user } = useUser({ routeType: "entered" });
  return (
    <Layout title="My Profile">
      <div className="p-5">
        <div className="flex items-center space-x-3 relative">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">{user?.name}</span>
            {user?.email ? (
              <span className="text-sm text-gray-600">{user.email}</span>
            ) : (
              <span className="text-sm text-gray-600">{user?.phone}</span>
            )}
          </div>
        </div>
        <div className="mt-5">
          <div>
            <div className="relative flex justify-center mb-1">
              <span className="text-sm font-medium bg-white z-10 px-2">Settings</span>
              <div className="border-b border-gray-200 absolute top-2.5 w-full"></div>
            </div>
            <ul>
              <Link href="/users/update">
                <li className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50 text-gray-500 flex items-center justify-between cursor-pointer">
                  <span className="text-sm">Update Profile</span>
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
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
              </Link>
              <Link href="/api/users/logout">
                <li className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50 text-gray-500 flex items-center justify-between cursor-pointer">
                  <span className="text-sm">Log Out</span>
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
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;

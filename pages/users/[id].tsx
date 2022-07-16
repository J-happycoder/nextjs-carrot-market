import Layout from "../../components/Layout";

const Profile = () => {
  const products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => ({
    name: "iPhone 14 Pro",
    likes: 1,
    sold: true,
  }));
  return (
    <Layout title="Kyle">
      <div>
        <div className="flex flex-row mx-auto items-center justify-center space-x-10 py-16 sticky top-0 border-b backdrop-blur-md shadow-sm">
          <div className="w-16 h-16 bg-gray-300 rounded-full shadow-sm"></div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Kyle</h1>
            <span className="text-sm text-sky-500 cursor-pointer">follow</span>
          </div>
        </div>
        <div className="mt-16 flex flex-col max-w-2xl mx-auto px-5 space-y-5 mb-10">
          {products.map((product) => (
            <div key={product.likes} className="flex flex-row">
              <div className="w-28 h-28 bg-gray-300 rounded-md"></div>
              <div className="ml-3">
                <a href="/products/1" className="text-sm block">
                  {product.name}
                </a>
                <span className="text-sm text-gray-400">descriptions...........</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

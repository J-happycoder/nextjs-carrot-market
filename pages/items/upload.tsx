import ItemImageInput from "../../components/ItemImageInput";
import Layout from "../../components/Layout";
import PriceInput from "../../components/PriceInput";
import TextInput from "../../components/TextInput";

const Upload = () => {
  return (
    <Layout title="Upload">
      <div className="px-5 mb-10">
        <form className="flex flex-col max-w-3xl mx-auto mt-20 space-y-3">
          <ItemImageInput label="Change" />
          <TextInput label="Item Name" required />
          <PriceInput label="Price" />
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Description</label>
            <textarea className="resize-none h-96 border border-gray-300 rounded-md appearance-none shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm z-10" />
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm px-3 py-3 rounded-md border-transparent focus:outline-none focus:ring-offset-2 focus:ring-orange-500 focus:ring-2 shadow-sm"
            type="submit"
          >
            Upload
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Upload;

interface ItemImageInputProps {
  label: string;
}

const ItemImageInput = ({ label }: ItemImageInputProps) => {
  return (
    <div className="flex items-center justify-start space-x-10">
      <div className="w-96 h-40 bg-gray-300 rounded-md shadow-sm"></div>
      <label
        htmlFor="image"
        className="text-sm text-gray-400 px-3 py-1.5 cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
      >
        {label}
      </label>
      <input type="file" accept="image/*" className="hidden" id="image" required />
    </div>
  );
};

export default ItemImageInput;

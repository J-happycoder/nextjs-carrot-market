interface PriceInputProps {
  label: string;
}

const PriceInput = ({ label }: PriceInputProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-500">{label}</label>
      <div className="flex">
        <span className="flex items-center text-sm text-gray-400 px-3 border border-gray-300 border-r-0 rounded-l-md bg-gray-50">
          $
        </span>
        <input
          className="appearance-none w-full border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm z-10"
          type="number"
        />
        <span className="flex items-center text-sm text-gray-400 px-3 border border-gray-300 border-l-0 rounded-r-md bg-gray-50">
          USD
        </span>
      </div>
    </div>
  );
};

export default PriceInput;

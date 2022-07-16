interface PhoneInputProps {
  label: string;
}

const PhoneInput = ({ label }: PhoneInputProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-500">{label}</label>
      <div className="flex">
        <span className="flex items-center justify-center px-3 shadow-sm rounded-l-md border border-gray-300 border-r-0 bg-gray-50 text-gray-400 text-sm select-none">
          +82
        </span>
        <input
          className="appearance-none w-full border border-gray-300 rounded-r-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
          type="number"
          required
        />
      </div>
    </div>
  );
};

export default PhoneInput;

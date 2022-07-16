interface TextInputProps {
  label: string;
  required?: boolean;
}

const TextInput = ({ label, required }: TextInputProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        className="appearance-none w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
        type="text"
        required={required}
      />
    </div>
  );
};

export default TextInput;

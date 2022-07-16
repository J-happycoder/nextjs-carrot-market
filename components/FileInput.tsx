interface FileInputProps {
  label: string;
  required?: boolean;
}

const FileInput = ({ label, required }: FileInputProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-gray-300 rounded-full shadow-sm"></div>
      <label
        htmlFor="image"
        className="text-sm text-gray-400 px-3 py-1.5 cursor-pointer bg-gray-50 border border-gray-300 rounded-md"
      >
        {label}
      </label>
      <input type="file" accept="image/*" className="hidden" id="image" required={required} />
    </div>
  );
};

export default FileInput;

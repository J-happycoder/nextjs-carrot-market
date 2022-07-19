interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm px-3 py-3 rounded-md border-transparent focus:outline-none focus:ring-offset-2 focus:ring-orange-500 focus:ring-2 shadow-sm"
    >
      {text}
    </button>
  );
};

export default Button;

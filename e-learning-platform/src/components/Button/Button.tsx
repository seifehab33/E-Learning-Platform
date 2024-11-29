interface ButtonProps {
  buttonText: string;
  onClick?: () => void;
}
function Button({ buttonText, onClick }: ButtonProps) {
  return (
    <button
      className=" text-sm lg:text-lg font-bold border-[var(--purple-color)] border-[2px] text-white py-2 px-8 rounded-full hover:bg-[var(--purple-color)] transition-colors duration-200 ease-out text-nowrap "
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;

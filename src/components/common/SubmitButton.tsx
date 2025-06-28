type SubmitButtonProps = {
  buttonText: string;
};

const SubmitButton = ({ buttonText }: SubmitButtonProps) => {
  return (
    <button
      className="w-full h-fit py-4 flex justify-center items-center bg-monochrome-black rounded-xl en-text text-xl text-monochrome-white"
      type="submit"
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;

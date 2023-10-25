const Button = (props) => {
  return (
    <div className="bg-darkGray hover:bg-green-700 hover:cursor-pointer duration-200 text-white font-bold py-2 px-4 rounded mobile:text-sm flex justify-center ">
      {props.children}
    </div>
  );
};

export default Button;

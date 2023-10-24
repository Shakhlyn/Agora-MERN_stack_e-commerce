const Button = (props) => {
  return (
    <div className="bg-darkGray hover:bg-gray-600 hover:cursor-pointer duration-200 text-white font-bold py-2 px-4 rounded text-center mobile:text-sm ">
      {props.children}
    </div>
  );
};

export default Button;

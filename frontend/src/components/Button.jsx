const Button = (props) => {
  return (
    <div className="bg-darkGray hover:bg-slate-900 hover:cursor-pointer duration-300 text-slate-100 hover:text-slate-300 hover:shadow-sm hover:shadow-darkGray font-bold  py-2 px-4 rounded mobile:text-sm flex justify-center">
      {props.children}
    </div>
  );
};

export default Button;

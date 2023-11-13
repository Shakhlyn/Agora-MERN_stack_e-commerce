// import { Link } from "react-router-dom";
// import Message from "./message";
// import { useGetTopProductsQuery } from "../slices/productsApiSlice";
// import { useState } from "react";
// import {
//   BsFillArrowRightCircleFill,
//   BsFillArrowLeftCircleFill,
// } from "react-icons/bs";

// export default function ProductCarousel() {
//   const { data, isLoading, error } = useGetTopProductsQuery();

//   let [current, setCurrent] = useState(0);

//   let previousSlide = () => {
//     if (current === 0) setCurrent(data?.data?.length - 1);
//     else setCurrent(current - 1);
//   };

//   let nextSlide = () => {
//     if (current === data?.data?.length - 1) setCurrent(0);
//     else setCurrent(current + 1);
//   };

//   return (
//     <div className="overflow-hidden relative">
//       {/* <div className="grid grid-cols-12"> */}
//       <div className=" max-h-60 ">
//         <img
//           src={data?.data[current]?.image}
//           alt="product image"
//           className=" mx-auto w-1/3 max-h-60 "
//         />
//       </div>
//       <div></div>
//       {/* </div> */}

//       <div className="absolute top-0 h-full w-2/3 justify-between items-center flex text-darkGray px-10 text-3xl">
//         <button onClick={previousSlide}>
//           <BsFillArrowLeftCircleFill />
//         </button>
//         <button onClick={nextSlide}>
//           <BsFillArrowRightCircleFill />
//         </button>
//       </div>

//       <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
//         {data?.data?.map((product, index) => {
//           return (
//             <div
//               onClick={() => {
//                 setCurrent(index);
//               }}
//               key={"circle" + index}
//               className={`rounded-full w-5 h-5 cursor-pointer  ${
//                 index == current ? "bg-gray-200" : "bg-gray-500"
//               }`}
//             ></div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// *********************************************************************************************

import { Link } from "react-router-dom";
import Message from "./message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Loader from "./Loader";

export default function ProductCarousel() {
  const { data, isLoading, error } = useGetTopProductsQuery();
  const totalProducts = data?.data?.length;

  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalProducts - 1 : prev - 1));
  };

  let nextSlide = () => {
    setCurrent((prev) => (prev === totalProducts - 1 ? 0 : prev + 1));
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.message}</Message>
  ) : (
    <div className="relative mobile:h-40 md:h-60 lg:2/3 md:w-5/6 mobile:w-full mx-auto ">
      <div className="max-h-60 grid grid-cols-12 justify-between gap-8 overflow-hidden">
        <img
          src={data?.data[current]?.image}
          alt="product image"
          className=" col-span-6 mobile:h-28 md:h-40 mx-auto transition-transform duration-3000 transform hover:scale-105"
        />

        {/* <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex flex-col items-center text-center"> */}
        <div className=" col-span-6 hover:scale-105">
          <h3 className="text-lg font-semibold mb-2 mobile:pt-2 md:pt-10">
            {data?.data[current]?.name}
          </h3>
          <p className="text-gray-500">${data?.data[current]?.price} Only!!!</p>
        </div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center px-4">
        <button
          onClick={previousSlide}
          className="text-2xl text-gray-700 hover:text-black focus:outline-none"
        >
          <BsFillArrowLeftCircleFill />
        </button>
        <button
          onClick={nextSlide}
          className="text-2xl text-gray-700 hover:text-black focus:outline-none"
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-4 flex justify-center w-full">
        {data?.data?.map((product, index) => (
          <div
            onClick={() => setCurrent(index)}
            key={"circle" + index}
            className={`rounded-full w-4 h-4 cursor-pointer mx-2 ${
              index === current ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

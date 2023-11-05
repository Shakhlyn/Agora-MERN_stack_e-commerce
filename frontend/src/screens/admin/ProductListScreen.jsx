import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import Message from "../../components/message";
import Loader from "../../components/Loader";

import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";

const ProductListScreen = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure that you want to create a new Product")) {
      try {
        await createProduct();
        refetch(); //re-fetch useGetProductsQuery()
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          className="flex flex-row items-center "
          onClick={createProductHandler}
        >
          <Button>
            <div className="flex flex-row items-center">
              <FaPlus className="" /> <p>Create Product</p>
            </div>
          </Button>
        </button>
      </div>

      {createProductLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error.data.message}</Message>
      ) : (
        <>
          <table className="table-auto w-full text-mobile md:text-base">
            <thead>
              <tr>
                <th>SL No</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((product, index) => (
                <tr key={product._id} className=" border-y-2 ">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{product.name}</td>
                  <td className="text-center">${product.price}</td>
                  <td className="text-center">{product.category}</td>
                  <td className="text-center">{product.brand}</td>
                  <td className="space-x-2">
                    <div className="flex flex-row justify-between">
                      <button className="hover:bg-white">
                        <Link to={`/admin/products/${product._id}/edit`}>
                          <Button>
                            <FaEdit className="text-slate-200 hover:text-slate-50" />
                          </Button>
                        </Link>
                      </button>

                      <button className="hover:bg-white">
                        <Button>
                          <FaTrash className="text-red-700 hover:text-red-800" />
                        </Button>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;

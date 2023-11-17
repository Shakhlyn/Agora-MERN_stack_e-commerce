import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import LinkButton from "../../Utils/LinkButton";
import Message from "../../components/message";
import Loader from "../../components/Loader";

import Paginate from "../../components/Paginate";

import {
  useGetProductsQuery,
  // useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  // const [createProduct, { isLoading: createProductLoading }] =
  //   useCreateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  // const createProductHandler = async () => {
  //   if (window.confirm("Are you sure that you want to create a new Product")) {
  //     try {
  //       await createProduct();
  //       refetch(); //re-fetch useGetProductsQuery()
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product Deleted!");
      } catch (error) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button className="flex flex-row items-center ">
          <LinkButton
            to={`/admin/create-product`}
            button={
              <div className="flex flex-row items-center gap-1">
                <FaPlus /> <p>Create Product</p>
              </div>
            }
          ></LinkButton>
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error.data?.message}</Message>
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
              {data?.data?.products.map((product, index) => (
                <tr key={product._id} className=" border-y-2 ">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{product.name}</td>
                  <td className="text-center">${product.price}</td>
                  <td className="text-center">{product.category}</td>
                  <td className="text-center">{product.brand}</td>
                  <td className="space-x-2">
                    <div className="flex flex-row justify-between">
                      <button className="hover:bg-white">
                        <Link
                          to={`/admin/products/${product._id}/edit/${
                            pageNumber ? pageNumber : 1
                          }`}
                        >
                          <Button>
                            <FaEdit className="text-slate-200 hover:text-slate-50" />
                          </Button>
                        </Link>
                      </button>

                      <button
                        className="hover:bg-white"
                        onClick={() => deleteProductHandler(product._id)}
                      >
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
      <Paginate
        totalPages={data?.data?.totalPages}
        currentPage={data?.data?.currentPage}
        isAdmin={true}
      />
    </>
  );
};

export default ProductListScreen;

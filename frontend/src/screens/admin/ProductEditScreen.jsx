import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { stringify } from "uuid";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      // console.log(product.data);
      setName(product.data.name);
      setPrice(product.data.price);
      setImage(product.data.image);
      setBrand(product.data.brand);
      setCategory(product.data.category);
      setCountInStock(product.data.countInStock);
      setDescription(product.data.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      // res.message = '/images/<updated-name>'; extracted it from req.file.path in the backend's uploadRoutes.js.

      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link
        to="/admin/productlist"
        className="text-blue-500 hover:underline my-3"
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="bg-red-500 text-white">
            {error.data.message}
          </Message>
        ) : (
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-semibold text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded-md"
                placeholder="Enter name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block font-semibold text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="w-full p-2 border rounded-md"
                placeholder="Enter price"
                value={price || 0}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold">
                Image
              </label>
              <input
                id="image"
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700 font-bold">
                Choose File
              </label>
              <input
                id="file"
                type="file"
                name="image"
                onChange={uploadFileHandler}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* <div className="mb-4">
              <label
                htmlFor="image"
                className="block font-semibold text-gray-600"
              >
                Image
              </label>
              <input
                type="text"
                id="image"
                className="w-full p-2 border rounded-md"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="file"
                className="mt-2"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <Loader />}
            </div> */}

            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block font-semibold text-gray-600"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className="w-full p-2 border rounded-md"
                placeholder="Enter brand"
                value={brand || ""}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="countInStock"
                className="block font-semibold text-gray-600"
              >
                Count In Stock
              </label>
              <input
                type="number"
                id="countInStock"
                className="w-full p-2 border rounded-md"
                placeholder="Enter countInStock"
                value={countInStock || 0}
                onChange={(e) => setCountInStock(parseFloat(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block font-semibold text-gray-600"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                className="w-full p-2 border rounded-md"
                placeholder="Enter category"
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-semibold text-gray-600"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                className="w-full p-2 border rounded-md"
                placeholder="Enter description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit">Update</button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

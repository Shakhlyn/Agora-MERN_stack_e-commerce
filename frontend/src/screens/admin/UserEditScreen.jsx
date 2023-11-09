import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Message from "../../components/message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

import {
  useGetAUserQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, refetch, error } = useGetAUserQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.data.name);
      setEmail(user.data.email);
      setIsAdmin(user.data.isAdmin);
    }
  }, [user]);

  const handleCheckboxChange = () => {
    setIsAdmin((isAdmin) => !isAdmin);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin: Boolean(isAdmin),
      }).unwrap();

      toast.success("Product updated");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      console.log(err.data.stack);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link
        to="/admin/userlist"
        className="text-slate-300 hover:text-slate-50 my-3 bg-darkGray px-2 py-1 rounded-md"
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-2xl font-bold text-center mb-8 ">Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="bg-red-500 text-white">
            {error.data.message}
          </Message>
        ) : (
          <form onSubmit={submitHandler}>
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
                htmlFor="email"
                className="block font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter email address"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="isAdmin"
                className="block font-semibold text-gray-600"
              >
                Admin
              </label>
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={handleCheckboxChange}
              />
            </div>

            <button
              type="submit"
              className="text-slate-200 hover:text-slate-50 my-3 bg-blue-600 px-2 py-1 rounded-md"
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;

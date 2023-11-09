import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import Message from "../../components/message";
import Loader from "../../components/Loader";

import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAUserQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserListScreen = () => {
  const { data, isLoading, error, refetch } = useGetAllUsersQuery();

  const [deleteUser, { isLoading: loadingUserDelete }] =
    useDeleteUserMutation();

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User Deleted!");
      } catch (error) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Users</h1>

      {loadingUserDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error.data?.message}</Message>
      ) : (
        <>
          <table className="table-auto w-full text-mobile md:text-base">
            <thead>
              <tr>
                <th>SL NO</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((user, index) => (
                <tr key={user._id} className=" border-y-2 ">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>

                  <td className="p-2 text-center">
                    {user.isAdmin ? (
                      <span className="flex justify-center ">
                        <FaCheck className="text-green-600" />
                      </span>
                    ) : (
                      <span className="flex justify-center ">
                        <FaTimes className="text-red-500" />
                      </span>
                    )}
                  </td>
                  <td className="space-x-2">
                    <div className="flex flex-row justify-between">
                      <button className="hover:bg-white">
                        <Link to={`/admin/users/${user._id}/edit`}>
                          <Button>
                            <FaEdit className="text-slate-200 hover:text-slate-50" />
                          </Button>
                        </Link>
                      </button>

                      <button
                        className="hover:bg-white"
                        onClick={() => deleteUserHandler(user._id)}
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
    </>
  );
};

export default UserListScreen;

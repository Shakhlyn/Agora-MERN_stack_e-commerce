import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import LinkButton from "../Utils/LinkButton";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/message";

import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrderQuery } from "../slices/ordersApiSlice";

import { saveShippingAddress } from "../slices/cartSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [editInfo, setEditInfo] = useState(false);

  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();
  const {
    data: orders,
    isLoading: isMyOrderLoading,
    error: myOrderError,
  } = useGetMyOrderQuery();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);

    setAddress(shippingAddress.address);
    setCity(shippingAddress.city);
    setPostalCode(shippingAddress.postalCode);
    setCountry(shippingAddress.country);
  }, [
    userInfo,
    shippingAddress,
    userInfo.name,
    userInfo.email,
    shippingAddress.address,
    shippingAddress.city,
    shippingAddress.postalCode,
    shippingAddress.country,
  ]);

  const EditInfoHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      dispatch(
        saveShippingAddress({
          address,
          city,
          postalCode,
          country,
        })
      );
      setEditInfo(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 mb-10 md:mb-2 max-h-fit ">
        {!editInfo ? (
          <>
            <p>Name: {userInfo.name}</p>
            <p>E-mail: {userInfo.email}</p>
            <p>
              Address:
              {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}{" "}
            </p>
            <button
              className="block mt-4 md:mt-8"
              onClick={() => setEditInfo(true)}
            >
              <Button>
                <p>Edit</p>
              </Button>
            </button>
          </>
        ) : (
          <form onSubmit={EditInfoHandler} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="md:col-span-1">Name:</label>
              <input
                className="md:col-span-3 border border-gray-300 rounded-md py-1 px-2"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
              <label className="md:col-span-1">Email:</label>
              <input
                className="md:col-span-3 border border-gray-300 rounded-md p-1"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
              <label className="md:col-span-1">Address:</label>
              <input
                type="text"
                className="md:col-span-3 border border-gray-300 rounded-md p-1"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
              <label className="md:col-span-1">City:</label>
              <input
                type="text"
                className="md:col-span-3 border border-gray-300 rounded-md p-1"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
              <label className="md:col-span-1">Postal Code:</label>
              <input
                type="text"
                className="md:col-span-3 border border-gray-300 rounded-md p-1"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
              <label className="md:col-span-1">Country:</label>
              <input
                type="text"
                className="md:col-span-3 border border-gray-300 rounded-md p-1"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <button className="block mt-4 md:mt-8" type="submit">
              <Button>
                <p>Update</p>
              </Button>
            </button>
          </form>
        )}
      </div>
      <div className="col-span-12 md:col-span-8 bg-slate-100 rounded-lg shadow-lg p-4 text-mobile lg:text-base max-h-fit ">
        {isMyOrderLoading ? (
          <Loader />
        ) : myOrderError ? (
          <Message variant={myOrderError}>
            {myOrderError?.data?.message || myOrderError.error}
          </Message>
        ) : (
          <>
            <h2 className="text-lg font-bold">Order history is here</h2>
            <hr />
            <table className="w-full my-4">
              <thead className="mb-4">
                <tr>
                  <th className="p-2 table-cell">SL No</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Paid</th>
                  <th className="p-2">Delivered</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2 text-center">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="p-2 text-center">{order.totalPrice}</td>

                    <td className="p-2  text-center">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <span className="flex justify-center">
                          <FaTimes className="text-red-500" />
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <span className="flex justify-center ">
                          <FaTimes className="text-red-500" />
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      <button>
                        <LinkButton
                          button="Details"
                          to={`/orders/${order._id}`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileScreen;

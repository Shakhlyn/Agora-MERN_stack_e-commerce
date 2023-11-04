// import { LinkContainer } from 'react-router-bootstrap';
// import { Table, Button } from 'react-bootstrap';
import { FaTimes } from "react-icons/fa";
import Message from "../../components/message";
import Loader from "../../components/Loader";
import LinkButton from "../../Utils/LinkButton";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="w-full my-4 text-mobile lg:text-base ">
          <thead>
            <tr>
              <th>SL No</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center"> {order.user.name} </td>
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
                    <LinkButton button="Details" to={`/orders/${order._id}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderListScreen;

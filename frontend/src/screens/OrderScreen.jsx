import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import Button from "../components/Button";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: isOrderDeliverLoading }] =
    useDeliverOrderMutation();

  const deliverOrderHandler = () => {
    console.log("delivered");
    deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.message}</Message>
  ) : (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Order </h1>
      <div className=" grid grid-cols-12 ">
        <div className=" col-span-12 md:col-span-8 pr-8">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message>Not Delivered</Message>
            )}
          </div>
          <div className="bg-white p-4 shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="warning">Not Paid</Message>
            )}
          </div>
          <div className="bg-white p-4 shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ul>
                {order.orderItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-4 py-4 border-b border-gray-200"
                  >
                    <div className="w-16">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="w-1/4">
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className=" col-span-12 md:col-span-4 ">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <div>Tax</div>
              <div>${order.tax}</div>
            </div>
            <div className="flex justify-between py-2">
              <div>Total</div>
              <div>${order.totalPrice}</div>
            </div>
          </div>
          {userInfo &&
            userInfo.isAdmin &&
            // order.isPaid &&    //it'll be implemented after integrating a payment mgt system.
            !order.isDelivered && (
              <button onClick={deliverOrderHandler} className="mt-4">
                <Button>
                  <div>Deliver</div>
                </Button>
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;

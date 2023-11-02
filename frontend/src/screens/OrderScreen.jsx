import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  // useDeliverOrderMutation,
  // useGetPaypalClientIdQuery,
  // usePayOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  // const [deliverOrder, { isLoading: loadingDeliver }] =
  //   useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // const {
  //   data: paypal,
  //   isLoading: loadingPayPal,
  //   error: errorPayPal,
  // } = useGetPaypalClientIdQuery();

  // useEffect(() => {
  //   if (!errorPayPal && !loadingPayPal && paypal.clientId) {
  //     const loadPaypalScript = async () => {
  //       // Load PayPal script here
  //     };
  //     if (order && !order.isPaid) {
  //       if (!window.paypal) {
  //         loadPaypalScript();
  //       }
  //     }
  //   }
  // }, [errorPayPal, loadingPayPal, order, paypal]);

  // function onApprove(data, actions) {
  //   return actions.order.capture().then(async function (details) {
  //     try {
  //       await payOrder({ orderId, details });
  //       refetch();
  //       toast.success("Order is paid");
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   });
  // }

  // function onError(err) {
  //   toast.error(err.message);
  // }

  // const deliverHandler = async () => {
  //   await deliverOrder(orderId);
  //   refetch();
  // };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.message}</Message>
  ) : (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Order {order._id}</h1>
      <div className="flex">
        <div className="w-2/3 pr-8">
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
        <div className="w-1/3">
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
              <div>${order.taxPrice}</div>
            </div>
            <div className="flex justify-between py-2">
              <div>Total</div>
              <div>${order.totalPrice}</div>
            </div>
            {/* {!order.isPaid && ( */}
            {/* <div> */}
            {/* {loadingPay && <Loader />} */}
            {/* PayPal buttons */}
            {/* </div> */}
            {/* )} */}
          </div>
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <div className="bg-white p-4 shadow-md mt-4">
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  // onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;

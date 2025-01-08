import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../store/features/orderSlice";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.order);

  // Fetch orders from Firestore if not already loaded
  React.useEffect(() => {
    if (Object.keys(orders).length === 0) {
      dispatch(getOrders());
    }
  }, [orders, dispatch]);

  const handleTrackOrder = () => {
    if (loading) {
      setStatusMessage("Loading orders. Please wait...");
      return;
    }

    const order = Object.values(orders).find(
      (order) => order.orderNumber.toString() === orderNumber
    );

    if (order) {
      switch (order.status) {
        case "placed":
          setStatusMessage(
            "Your order has been placed successfully and will be delivered within 2-3 working days."
          );
          break;
        case "confirmed":
          setStatusMessage(
            "Your order has been confirmed by the team and will be delivered within 2-3 working days."
          );
          break;
        case "delivered":
          setStatusMessage(
            "Your order has been handed over to the courier. You will receive your parcel in 2 days."
          );
          break;
        default:
          setStatusMessage("Your order status is unavailable.");
      }
    } else {
      setStatusMessage("Order not found. Please check the order number.");
    }
  };

  return (
    <div className="p-6 font-monster max-w-lg mx-auto items-center justify-center   bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Track Your Order
      </h2>
      <input
        type="text"
        placeholder="Enter Order Number"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
      />
      <button
        onClick={handleTrackOrder}
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Track Order
      </button>
      {statusMessage && (
        <div className="mt-4 p-4 bg-gray-100 text-gray-700 border-l-4 border-blue-500 rounded-md">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;

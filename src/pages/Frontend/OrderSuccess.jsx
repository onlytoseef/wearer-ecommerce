import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  const { orderNumber } = useParams();
  const order = useSelector((state) => state.order.orders[orderNumber]); // Access order from Redux state

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-green-600">
          Congratulations on Placing Your Order!
        </h2>
        <p className="mt-4 text-lg">
          Your Order Number: <strong>{order.orderNumber}</strong>
        </p>
        <p className="mt-2 text-lg">
          Status: <strong>{order.status}</strong>
        </p>
        <p className="mt-2 text-lg">
          Customer Name: <strong>{order.userDetails.name}</strong>
        </p>
        <p className="mt-2 text-lg">
          Email: <strong>{order.userDetails.email}</strong>
        </p>
        <p className="mt-2 text-lg">
          Address: <strong>{order.userDetails.address}</strong>
        </p>
        <p className="mt-2 text-lg">
          Phone: <strong>{order.userDetails.phone}</strong>
        </p>

        <h3 className="mt-6 text-xl font-semibold">Products Ordered:</h3>
        <ul className="mt-4">
          {order.items.map((item, index) => (
            <li key={index} className="border-b py-2">
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-lg text-gray-500">Price: Rs {item.price}</p>
              <p className="text-lg text-gray-500">Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderSuccess;

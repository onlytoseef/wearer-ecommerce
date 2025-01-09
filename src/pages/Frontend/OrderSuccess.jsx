import React from "react";
import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { orderNumber } = useParams();

  return (
    <div className="min-h-screen font-monster flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your order. Your order number is:
        </p>
        <h2 className="text-xl font-bold text-gray-800">{orderNumber}</h2>
        <p className="text-gray-600 mt-4">
          You can Track your order Status by Order Number
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;

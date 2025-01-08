import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const TrackOrder = () => {
  const { orderNumber } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [enteredOrderNumber, setEnteredOrderNumber] = useState(""); // Input field for order number
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderNumber) {
      const fetchOrder = async () => {
        try {
          const orderRef = doc(firestore, "orders", orderNumber);
          const orderSnap = await getDoc(orderRef);
          if (orderSnap.exists()) {
            setOrderDetails(orderSnap.data());
          } else {
            setError("No such order found!");
          }
        } catch (error) {
          setError("Error fetching order. Please try again.");
        }
      };
      fetchOrder();
    }
  }, [orderNumber]);

  const handleOrderNumberInput = async () => {
    setError(null);
    if (!enteredOrderNumber) {
      setError("Please enter a valid order number!");
      return;
    }

    try {
      const orderRef = doc(firestore, "orders", enteredOrderNumber);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        setOrderDetails(orderSnap.data());
      } else {
        setError("Order not found.");
      }
    } catch (error) {
      setError("Error fetching order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      {orderDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-green-600">
            Congratulations!
          </h2>
          <p className="mt-4 text-lg">
            Your Order Number: {orderDetails.orderNumber}
          </p>
          <p className="mt-2 text-lg">Status: {orderDetails.status}</p>
          <p className="mt-2 text-lg">
            Customer Name: {orderDetails.userDetails.name}
          </p>

          <h3 className="mt-6 text-xl font-semibold">Products Ordered:</h3>
          <ul className="mt-4">
            {orderDetails.items.map((item, index) => (
              <li key={index} className="border-b py-2">
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-lg text-gray-500">Price: Rs {item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-blue-600">
            Track Your Order
          </h2>
          <p className="mt-4 text-center text-lg">
            Enter your order number to track your order status:
          </p>

          <input
            type="text"
            placeholder="Enter Order Number"
            value={enteredOrderNumber}
            onChange={(e) => setEnteredOrderNumber(e.target.value)}
            className="mt-4 p-2 w-full border border-gray-300 rounded-md"
          />
          <button
            onClick={handleOrderNumberInput}
            className="mt-4 bg-blue-600 text-white py-2 px-4 w-full rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Track Order
          </button>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;

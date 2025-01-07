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

    const orderRef = doc(firestore, "orders", enteredOrderNumber);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      setOrderDetails(orderSnap.data());
    } else {
      setError("Order not found.");
    }
  };

  return (
    <div>
      {orderDetails ? (
        <>
          <h2>Congratulations!</h2>
          <p>Your Order Number: {orderDetails.orderNumber}</p>
          <p>Status: {orderDetails.status}</p>
          <p>Customer Name: {orderDetails.userDetails.name}</p>
          <p>Product: {orderDetails.items[0].name}</p>{" "}
          {/* Displaying the first product for now */}
        </>
      ) : (
        <div>
          <h2>Track Your Order</h2>
          <p>Enter your order number to track your order status:</p>
          <input
            type="text"
            placeholder="Enter Order Number"
            value={enteredOrderNumber}
            onChange={(e) => setEnteredOrderNumber(e.target.value)}
          />
          <button onClick={handleOrderNumberInput}>Track Order</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;

import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrderAsync } from "../../store/features/orderSlice"; // Import the async action

const UserDetails = () => {
  const { state: product } = useLocation(); // Get the product details passed from the ProductDetail page
  const cartItems = [product]; // The cart now has just one product
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Dispatch the async action to place the order
      const result = await dispatch(
        placeOrderAsync({
          userDetails: userInfo,
          items: cartItems,
        })
      ).unwrap();

      const orderNumber = result.orderNumber;
      alert("Order placed successfully!");
      navigate(`/track-order/${orderNumber}`); // Redirect to the track order page with the order number
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={userInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={userInfo.address}
        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={userInfo.phone}
        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error if any */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default UserDetails;

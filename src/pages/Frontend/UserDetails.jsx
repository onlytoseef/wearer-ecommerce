import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { placeOrderAsync } from "../../store/features/orderSlice";
import { message } from "antd";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [loading, setLoading] = useState(false); // State for loader
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState(""); // State for phone number error
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.productOrder) {
      setSelectedProduct(location.state.productOrder);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+92|03)\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    // Reset error messages
    setEmailError("");
    setPhoneError("");

    // Validate email and phone number
    if (!validateEmail(deliveryInfo.email)) {
      setEmailError("Your email must end with @gmail.com");
      setLoading(false);
      return;
    }

    if (!validatePhone(deliveryInfo.phone)) {
      setPhoneError("Your phone number must be in the format of 03011234567");
      setLoading(false);
      return;
    }

    // Prepare the order data
    const orderData = {
      ...deliveryInfo,
      product: selectedProduct,
      billingSameAsShipping,
    };

    try {
      const resultAction = await dispatch(placeOrderAsync(orderData));
      if (placeOrderAsync.fulfilled.match(resultAction)) {
        const orderNumber = resultAction.payload.orderNumber; // Adjust based on the payload structure
        message.success("Order Placed Successfully");
        navigate(`/order-success/${orderNumber}`);
      } else {
        throw new Error("Order placement failed");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      message.error("An error occurred while placing the order");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="min-h-screen font-monster bg-gray-100 flex flex-col items-center py-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="p-6 w-full md:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Delivery Information Section */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Delivery Information
            </h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={deliveryInfo.email}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {emailError && (
              <div className="text-red-500 text-sm mt-2">{emailError}</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={deliveryInfo.firstName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={deliveryInfo.lastName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={deliveryInfo.address}
              onChange={handleInputChange}
              className="w-full p-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={deliveryInfo.city}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code (optional)"
                value={deliveryInfo.postalCode}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={deliveryInfo.phone}
              onChange={handleInputChange}
              className="w-full p-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {phoneError && (
              <div className="text-red-500 text-sm mt-2">{phoneError}</div>
            )}

            {/* Shipping Section */}
            <h2 className="text-xl font-bold text-gray-800 mt-6">
              Shipping Method
            </h2>
            <div className="flex items-center justify-between border p-4 mt-2 rounded-lg">
              <span>Standard</span>
              <span className="font-bold text-blue-500">FREE</span>
            </div>

            {/* Payment Section */}
            <h2 className="text-xl font-bold text-gray-800 mt-6">Payment</h2>
            <p className="text-gray-600 text-sm">
              All transactions are secure and encrypted.
            </p>
            <div className="mt-4">
              <div className="border p-4 rounded-lg flex justify-between items-center cursor-pointer">
                <span>Cash on Delivery (COD)</span>
              </div>
            </div>

            {/* Billing Address Section */}
            <h2 className="text-xl font-bold text-gray-800 mt-6">
              Billing Address
            </h2>
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="same-address"
                  name="billing-address"
                  checked={billingSameAsShipping}
                  onChange={() => setBillingSameAsShipping(true)}
                  className="mr-2"
                />
                <label htmlFor="same-address">Same as shipping address</label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="different-address"
                  name="billing-address"
                  checked={!billingSameAsShipping}
                  onChange={() => setBillingSameAsShipping(false)}
                  className="mr-2"
                />
                <label htmlFor="different-address">
                  Use a different billing address
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 p-4 text-white bg-primary rounded-lg font-bold text-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Complete Order"
              )}
            </button>
          </form>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="p-6 w-full md:w-1/3 bg-gray-50 border-l">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          {selectedProduct ? (
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedProduct.description}
                  </p>
                </div>
                <p className="ml-auto font-bold text-gray-800">
                  Rs {selectedProduct.price.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs {selectedProduct.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-2">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-gray-800 font-bold text-lg mt-4">
                <span>Total (PKR)</span>
                <span>Rs {selectedProduct.price.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <p>No product selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { placeOrderAsync } from "../../store/features/orderSlice";
import { message } from "antd";

const UserDetails = () => {
  const location = useLocation();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the order data
    const orderData = {
      ...deliveryInfo,
      product: selectedProduct,
      billingSameAsShipping,
    };

    // Dispatch the placeOrderAsync action to save order in Firestore
    dispatch(placeOrderAsync(orderData))
      .then(() => {
        message.success("Order Placed Successfully");
      })
      .catch((error) => {
        console.error("Order placement failed:", error);
        message.error("An Error occured while placing Order");
      });
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
              <div className="border p-4 mt-2 rounded-lg flex justify-between items-center cursor-pointer">
                <span>Bank Details</span>
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
            >
              Complete Order
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

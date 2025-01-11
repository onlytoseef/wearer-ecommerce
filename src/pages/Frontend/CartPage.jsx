import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItemQuantity,
  removeItemFromCart,
} from "../../store/features/cartSlice";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (id) => {
    dispatch(updateItemQuantity({ id, increment: true }));
  };

  const handleDecrement = (id) => {
    dispatch(updateItemQuantity({ id, increment: false }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
    message.success("Item removed from cart.");
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleBuyNow = () => {
    if (cartItems.length > 0) {
      navigate("/user-details", {
        state: {
          productOrder: {
            items: cartItems,
            totalPrice: calculateTotalPrice(),
          },
        },
      });
    } else {
      message.info("Your cart is empty. Add items to proceed.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Helmet>
          <title>Cart | Wearers</title>
          <meta name="description" content="Wearers Cart page" />
          <meta
            name="keywords"
            content="cartpage,cart,wearers.pk,wearers.store,hoodies for boys"
          />
        </Helmet>
        <div className="text-center font-monster p-10">Your cart is empty.</div>
        <Link to="/category">
          <button className="m-auto p-3 font-monster text-center text-white bg-primary rounded-lg font-semibold hover:bg-green-600">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container font-monster mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Helmet>
        <title>Cart | Wearers</title>
        <meta name="description" content="Wearers Cart page" />
        <meta
          name="keywords"
          content="cartpage,cart,wearers.pk,wearers.store,hoodies for boys"
        />
      </Helmet>
      {/* Cart Items Section */}
      <div className="col-span-2  space-y-4">
        <h1 className="text-3xl text-center font-semibold mb-6">
          Shopping Cart
        </h1>
        <hr />
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex text-xs sm:text-lg items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>Size: {item.size || "N/A"}</p>
                <p className="text-green-600">Rs. {item.price}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(item.id)}
                className="sm:px-2 px-2  py-1 border rounded-lg"
              >
                -
              </button>
              <span className="sm:px-4 px-1 ">{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item.id)}
                className="sm:px-2 px-2 py-1 border rounded-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500 px-2 hover:text-red-700"
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div className=" p-6 border rounded-lg bg-gray-50">
        <h2 className="md:text-xl  font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs. {calculateTotalPrice()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total</span>
            <span>Rs. {calculateTotalPrice()}</span>
          </div>
        </div>
        <button className="w-full mt-6 p-3 text-white bg-primary rounded-lg font-semibold hover:bg-green-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

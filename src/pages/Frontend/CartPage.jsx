import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItemQuantity,
  removeItemFromCart,
} from "../../store/features/cartSlice";
import { message } from "antd";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

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

  if (cartItems.length === 0) {
    return <div className="text-center p-10">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg"
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
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <span className="px-4">{item.quantity}</span>
              <button onClick={() => handleIncrement(item.id)}>+</button>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="text-right mt-6">
        <h2 className="text-2xl font-semibold">
          Total: Rs. {calculateTotalPrice()}
        </h2>
      </div>
    </div>
  );
};

export default CartPage;

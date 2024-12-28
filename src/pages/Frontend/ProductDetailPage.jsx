import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { Spin, Alert } from "antd";
import { firestore } from "../../config/firebase";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID. Please check the URL.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const docRef = doc(firestore, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          setError("Product not found. Please ensure the product exists.");
        }
      } catch (err) {
        setError("An error occurred while fetching the product.");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading product details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="max-w-lg w-full"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images */}
        <motion.div
          className="flex flex-col items-center lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.images || "https://via.placeholder.com/400"}
            alt={product.name || "Product Image"}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-4">{product.name || "N/A"}</h1>
          <p className="text-lg text-gray-600 mb-6">
            {product.description || "No description available."}
          </p>
          <p className="text-xl font-semibold text-green-600 mb-6">
            ${product.price || "0.00"}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-lg px-4 py-2 rounded-md"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-lg px-4 py-2 rounded-md"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">
              Buy Now
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

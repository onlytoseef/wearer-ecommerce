import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { Spin, Alert } from "antd";
import { firestore } from "../../config/firebase";

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Ensure productId is correctly derived from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID. Please check the URL.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const docRef = doc(firestore, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          const imagesArray = productData.images?.split(",") || []; // Convert images string to array
          productData.images = imagesArray; // Update productData with the array
          setProduct(productData);
          setActiveImage(imagesArray[0] || ""); // Set the first image as default
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
  }, [productId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleSizeSelect = (e) => setSelectedSize(e.target.value);

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
    <div className="container font-monster mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images Section */}
        <motion.div
          className="flex flex-col items-center lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={activeImage || "https://via.placeholder.com/400"}
              alt={product.name || "Product Image"}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/400")
              }
            />
          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-cover border-2 rounded-lg cursor-pointer ${
                  activeImage === img ? "border-blue-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl text-center font-[400] font-secondary mb-4">
            {product.name || "N/A"}
          </h1>
          <p className=" font-semibold text-center text-green-600 mb-6">
            Rs.{product.price || "0.00"}
          </p>
          <hr />
          <p className="mt-2 font-secondary text-lg ">Product Description :</p>
          <p className=" text-gray-600 mb-6">
            {product.description || "No description available."}
          </p>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Select Size:
              </label>
              <select
                value={selectedSize}
                onChange={handleSizeSelect}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              >
                <option value="" disabled>
                  Choose a size
                </option>
                {product.sizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

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
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
              disabled={!selectedSize}
            >
              Buy Now
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
              disabled={!selectedSize}
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

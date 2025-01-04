import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { Spin, Alert, message } from "antd";
import { firestore } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/features/cartSlice";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!selectedSize) {
      message.warning("Please select a size before adding to cart.");
      return;
    }

    dispatch(
      addItemToCart({
        id: productId,
        name: product.name,
        price: product.price,
        image: activeImage || product.images[0],
        quantity,
        size: selectedSize,
      })
    );

    message.success("Item added to Cart");
  };

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
          productData.images = productData.images?.split(",") || [];
          setProduct(productData);
          setActiveImage(productData.images[0] || "");
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
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          className="flex flex-col items-center lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border rounded-lg overflow-hidden mb-4">
            <img
              src={activeImage || "https://via.placeholder.com/400"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/400")
              }
            />
          </div>

          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 border-2 rounded-lg cursor-pointer ${
                  activeImage === img ? "border-blue-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-green-600 text-lg mb-6">Rs. {product.price}</p>
          <p>{product.description}</p>

          {product.sizes?.length > 0 && (
            <div className="my-4">
              <label className="block mb-2">Select Size:</label>
              <select
                value={selectedSize}
                onChange={handleSizeSelect}
                className="border rounded-md p-2"
              >
                <option value="" disabled>
                  Choose a size
                </option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="my-4 flex items-center">
            <button onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>

          <div>
            <button onClick={handleAddToCart} className="btn-primary">
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

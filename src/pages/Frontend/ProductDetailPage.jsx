import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { message, Collapse } from "antd";
import { firestore } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/features/cartSlice";
import Loader from "../../components/Loader";

const { Panel } = Collapse;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
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

  const handleBuyNow = () => {
    if (!selectedSize) {
      message.warning("Please select a size before proceeding to buy.");
      return;
    }

    const productOrder = {
      id: productId,
      name: product.name,
      price: product.price,
      image: activeImage || product.images[0],
      quantity,
      size: selectedSize,
    };

    navigate("/user-details", { state: { productOrder } });
  };

  useEffect(() => {
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
          setError("Product not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching the product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSizeSelect = (size) => setSelectedSize(size);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images Section */}
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
              className="w-full h-full md:h-50 object-cover"
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

        {/* Product Details Section */}
        <motion.div
          className="lg:w-1/2 font-monster"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-monster font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-gray-800 mb-6">Rs. {product.price}</p>
          <hr />

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-2 font-medium">Available Size:</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`px-4 py-2 border rounded-md text-xs font-medium ${
                      selectedSize === size
                        ? "bg-secondary text-primary border-primary"
                        : "border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h4 className="mb-2 font-medium">Quantity:</h4>
            <div className="flex border-black items-center gap-2">
              <button
                onClick={handleDecrement}
                className="px-3 py-1 border rounded-md bg-gray-200"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-3 py-1 border rounded-md bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-transparent border-black border-2 text-black font-medium rounded-md"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3 bg-primary text-white font-medium rounded-md"
            >
              Buy Now
            </button>
          </div>
          <Collapse
            bordered={false}
            className="mt-4 bg-white "
            defaultActiveKey={["0"]}
          >
            <Panel
              className="font-monster sm:text-lg uppercase font-extrabold"
              header="Product Description"
              key="1"
            >
              <ul className="list-disc font-[400] text-xs list-inside text-gray-600">
                {product.description
                  ?.split(".")
                  .filter((sentence) => sentence.trim() !== "")
                  .map((sentence, index) => (
                    <li key={index}>{sentence.trim()}.</li>
                  ))}
              </ul>
            </Panel>
            <Panel
              className="font-monster uppercase sm:text-lg font-extrabold"
              header="Exchange and Return Policy"
              key="2"
            >
              <ul className="list-disc list-inside text-gray-600">
                {product.additionalInfo
                  ?.split(".")
                  .filter((sentence) => sentence.trim() !== "")
                  .map((sentence, index) => (
                    <li key={index}>{sentence.trim()}.</li>
                  ))}
              </ul>
            </Panel>
            <Panel
              className="font-monster uppercase sm:text-lg font-extrabold"
              header="Delievery Policy"
              key="3"
            >
              <ul className="list-disc list-inside text-gray-600">
                {product.additionalInfo
                  ?.split(".")
                  .filter((sentence) => sentence.trim() !== "")
                  .map((sentence, index) => (
                    <li key={index}>{sentence.trim()}.</li>
                  ))}
              </ul>
            </Panel>
            <Panel
              className="font-monster uppercase sm:text-lg font-extrabold"
              header="FAQ'S"
              key="4"
            >
              <ul className="list-disc list-inside text-gray-600">
                {product.additionalInfo
                  ?.split(".")
                  .filter((sentence) => sentence.trim() !== "")
                  .map((sentence, index) => (
                    <li key={index}>{sentence.trim()}.</li>
                  ))}
              </ul>
            </Panel>
          </Collapse>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

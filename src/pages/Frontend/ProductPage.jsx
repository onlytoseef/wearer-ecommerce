import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/features/productSlice";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="bg-gray-50 font-monster min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <h1 className="text-4xl font-semibold text-center mb-8">
          Our Products
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enjoy Free Shipping on Prepaid Orders Across Pakistan.
        </p>
        <hr className="mb-8" />

        <div>
          {/* Filters Section */}

          {/* Products Section */}
          <div className="w-full">
            {status === "loading" && (
              <div className="flex justify-center ">
                <Loader />
              </div>
            )}

            {status === "failed" && (
              <div className="text-center text-red-500">
                <p>Error fetching products: {error}</p>
              </div>
            )}

            {status === "succeeded" && (
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/4 pr-8 mb-8 lg:mb-0">
                  <h2 className="text-2xl font-medium mb-4">Filters</h2>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Availability</h3>
                    <ul>
                      <li className="mb-2">
                        <input type="checkbox" id="inStock" />
                        <label htmlFor="inStock" className="ml-2">
                          In Stock
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="outStock" />
                        <label htmlFor="outStock" className="ml-2">
                          Out of Stock
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Price</h3>
                    <ul>
                      <li className="mb-2">
                        <input type="radio" id="lowToHigh" name="price" />
                        <label htmlFor="lowToHigh" className="ml-2">
                          Low to High
                        </label>
                      </li>
                      <li>
                        <input type="radio" id="highToLow" name="price" />
                        <label htmlFor="highToLow" className="ml-2">
                          High to Low
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      className="bg-white shadow-lg rounded-md overflow-hidden transition-all hover:shadow-xl cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      {/* Product Image */}
                      <img
                        src={
                          product.images || "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />

                      {/* Product Details */}
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <p className="text-green-600 font-bold">
                          Rs.{product.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

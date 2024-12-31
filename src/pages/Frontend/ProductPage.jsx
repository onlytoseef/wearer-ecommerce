import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/features/productSlice";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // No changes needed here if using 'productId'
  };

  return (
    <div className="bg-gray-100 font-monster min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

        {/* Loader */}
        {status === "loading" && (
          <div className="flex justify-center items-center">
            <Spin size="large" tip="Loading products..." />
          </div>
        )}

        {/* Error Message */}

        {status === "failed" && (
          <div className="text-center text-red-500">
            <p>Error fetching products: {error}</p>
          </div>
        )}

        {/* Products Grid */}
        {status === "succeeded" && (
          <div className="grid grid-cols-2  sm:grid-cols-4 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image */}
                <div className="h-80 cursor-pointer">
                  <img
                    src={product.images || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold">{product.name}</h2>

                  <p className="text-green-600 font-bold">${product.price}</p>
                </div>

                {/* Actions */}
                <div className="p-4 flex justify-between">
                  <Button
                    className="bg-green-500 text-white hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Buy Now: ${product.id}`);
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    className="bg-gray-500 text-white hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Add to Cart: ${product.id}`);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

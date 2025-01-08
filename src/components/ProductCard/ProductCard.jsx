import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/features/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const ProductCard = () => {
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
    <div className="font-monster">
      <div className="container mx-auto px-6 py-8">
        <div>
          <div className="w-full">
            {status === "loading" && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}

            {status === "failed" && (
              <div className="text-center text-red-500">
                <p>Error fetching products: {error}</p>
              </div>
            )}

            {status === "succeeded" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white shadow-lg rounded-md overflow-hidden transition-all cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="relative">
                      <img
                        src={
                          Array.isArray(product.images)
                            ? product.images[0]
                            : product.images.includes(",")
                            ? product.images.split(",")[0].trim()
                            : product.images ||
                              "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        className="w-full h-90 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        SAVE 40%
                      </div>
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="text-sm sm:text-xl font-medium">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-center">
                        <p className="text-gray-400 text-xs sm:text-lg line-through mr-2">
                          Rs.{product.originalPrice}
                        </p>
                        <p className="text-green-600 font-bold text-xs sm:text-lg">
                          Rs.{product.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

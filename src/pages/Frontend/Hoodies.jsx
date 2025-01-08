import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/features/productSlice";
import ProductCard from "../../components/ProductCard/ProductCard";

const Hoodies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 font-monster min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Our Hoodies</h1>
        <p className="text-center text-gray-600 mb-8">
          Enjoy Free Shipping on Prepaid Orders Across Pakistan.
        </p>
        <hr className="mb-8" />
        <ProductCard category="hoodies" />
      </div>
    </div>
  );
};

export default Hoodies;

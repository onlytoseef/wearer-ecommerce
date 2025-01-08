import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/features/productSlice";
import ProductCard from "../../components/ProductCard/ProductCard";

const TrackSuits = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 font-monster min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <h1 className="text-4xl font-semibold text-center mb-8">
          Our Track-Suits
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enjoy Free Shipping on Prepaid Orders Across Pakistan.
        </p>
        <hr className="mb-8" />
        <ProductCard category="tracksuits" />
      </div>
    </div>
  );
};

export default TrackSuits;

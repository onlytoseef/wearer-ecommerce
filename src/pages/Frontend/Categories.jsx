import React from "react";
import CategoryCarousel from "../../components/CategoryCarousel";

export default function Categories() {
  return (
    <>
      <div className="text-center py-5 font-secondary text-[3rem] font-[450] sm:text-[3rem]">
        Categories
      </div>
      <CategoryCarousel />
    </>
  );
}

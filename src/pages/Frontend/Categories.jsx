import React, { Suspense } from "react";

export default function Categories() {
  const Lazy = React.lazy(() => import("../../components/CategoryCarousel"));

  return (
    <>
      <div className="text-center py-5 font-secondary text-[3rem] font-[450] sm:text-[3rem]">
        Categories
      </div>
      <Suspense fallback={<div>Loading Categories ..</div>}>
        <Lazy />
      </Suspense>
    </>
  );
}

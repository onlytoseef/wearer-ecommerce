import React, { Suspense } from "react";
import Loader from "../../components/Loader";

export default function Categories() {
  const Lazy = React.lazy(() => import("../../components/CategoryCarousel"));

  return (
    <>
      <div className="text-center py-5 font-secondary text-[3rem] font-[450] sm:text-[3rem]">
        Categories
      </div>
      <Suspense fallback={<Loader />}>
        <Lazy />
      </Suspense>
    </>
  );
}

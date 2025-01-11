import React, { Suspense } from "react";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet-async";

export default function Categories() {
  const Lazy = React.lazy(() => import("../../components/CategoryCarousel"));

  return (
    <>
      <Helmet>
        <title>Categories | Wearers</title>
        <meta
          name="description"
          content="Explore the latest categories of hoodies, tracksuits, and more at Wearers."
        />
        <meta
          name="keywords"
          content="hoodies, tracksuits, categories,caps,t-shirts , wearers.pk , wearers.store, plain hoodies,printed hoodies,wearers,affordable hoodies,hoodies for men,hoodies for men in pakistan,hoodies for boys,hoodies for boys sale"
        />
      </Helmet>
      <div className="text-center py-5 font-secondary text-[3rem] font-[450] sm:text-[3rem]">
        Categories
      </div>
      <Suspense fallback={<Loader />}>
        <Lazy />
      </Suspense>
    </>
  );
}

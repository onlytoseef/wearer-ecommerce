import React, { Suspense } from "react";
import Loader from "../Loader";

const ProductCard = React.lazy(() => import("./ProductCard"));

export default function Index() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ProductCard />
      </Suspense>
    </div>
  );
}

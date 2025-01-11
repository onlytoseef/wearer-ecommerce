import React, { Suspense } from "react";
import FeatCard from "./FeatCard";
import Loader from "../Loader";

export default function Index() {
  return (
    <Suspense fallback={<Loader />}>
      <FeatCard />
    </Suspense>
  );
}

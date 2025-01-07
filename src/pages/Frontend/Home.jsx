import React from "react";

import Carousel from "../../components/carousel/";
import Categories from "./Categories";
import Feature from "../../components/Feature";
export default function Home() {
  return (
    <>
      <Carousel />;
      <Categories />
      <Feature />
    </>
  );
}

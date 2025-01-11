import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet from react-helmet-async
import Carousel from "../../components/carousel/";
import Categories from "./Categories";
import Feature from "../../components/Feature";
import FeatCard from "../../components/FeatCard";

export default function Home() {
  useEffect(() => {
    document.title = "Wearers - Home";
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Shop premium hoodies, tracksuits, and more at Wearers"
        />
        <meta name="keywords" content="home, wearers, clothing, fashion" />
      </Helmet>
      <Carousel />
      <Categories />
      <Feature />
      <FeatCard />
    </>
  );
}

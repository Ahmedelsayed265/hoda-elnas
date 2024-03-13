import React from "react";
import HeroSection from "../components/home/HeroSection";
import BestCourses from "../components/home/BestCourses";
import FeatureAndStatistics from "../components/home/FeatureAndStatistics";
import Library from "../components/home/Library";
import Offers from "../components/home/Offers";
import WhatWeOffer from "../components/home/WhatWeOffer";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BestCourses />
      <FeatureAndStatistics />
      <Library />
      <WhatWeOffer />
      <Testimonials />
      <Offers />
    </>
  );
};

export default Home;

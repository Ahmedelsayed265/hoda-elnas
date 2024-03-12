import React from "react";
import HeroSection from "../components/home/HeroSection";
import BestCourses from "../components/home/BestCourses";
import FeatureAndStatistics from "../components/home/FeatureAndStatistics";
import Library from "../components/home/Library";
import Offers from "../components/home/Offers";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BestCourses />
      <FeatureAndStatistics />
      <Library />
      <Offers />
    </>
  );
};

export default Home;

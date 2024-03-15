import React from "react";
import HeroSection from "../components/home/HeroSection";
import BestCourses from "../components/home/BestCourses";
import FeatureAndStatistics from "../components/home/FeatureAndStatistics";
import Library from "../components/home/Library";
import WhatWeOffer from "../components/home/WhatWeOffer";
import Testimonials from "../components/home/Testimonials";
import OurParteners from "../components/home/OurParteners";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BestCourses />
      <FeatureAndStatistics />
      <Library />
      <WhatWeOffer />
      <Testimonials />
      <OurParteners />
    </>
  );
};

export default Home;

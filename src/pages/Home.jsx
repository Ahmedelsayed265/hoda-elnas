import React from "react";
import HeroSection from "../components/home/HeroSection";
import BestCourses from "../components/home/BestCourses";
import FeatureAndStatistics from "../components/home/FeatureAndStatistics";
import Library from "../components/home/Library";
import WhatWeOffer from "../components/home/WhatWeOffer";
import Testimonials from "../components/home/Testimonials";
import OurParteners from "../components/home/OurParteners";
import { useSelector } from "react-redux";

const Home = () => {
  const partners = useSelector((state) => state.partners.partners);
  return (
    <>
      <HeroSection />
      <BestCourses />
      <FeatureAndStatistics />
      <Library />
      <WhatWeOffer />
      <Testimonials />
      {partners && partners?.length > 0 && <OurParteners partners={partners} />}
    </>
  );
};

export default Home;

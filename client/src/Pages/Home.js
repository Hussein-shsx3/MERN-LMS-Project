import React, { useEffect } from "react";
import Header from "../Components/header";
import Main from "../Components/main";
import TopCategories from "../Components/topCategories";
import OurCourses from "../Components/ourCourses";
import Subscribe from "../Components/subscribe";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1600, once: true });
  });
  return (
    <section className="relative w-full flex flex-col items-center">
      <Header />
      <Main />
      <TopCategories />
      <OurCourses />
      <Subscribe />
    </section>
  );
};

export default Home;

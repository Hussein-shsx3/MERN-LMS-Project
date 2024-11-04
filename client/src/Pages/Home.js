import React from "react";
import Header from "../Components/header";
import Main from "../Components/main";
import TopCategories from "../Components/topCategories";

const Home = () => {
  return (
    <section className="relative w-full min-h-[150dvh] flex flex-col items-center overflow-hidden">
      <Header />
      <Main />
      <TopCategories />
    </section>
  );
};

export default Home;

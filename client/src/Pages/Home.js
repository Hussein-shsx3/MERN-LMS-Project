import React from "react";
import Header from "../Components/header";
import Main from "../Components/main";

const Home = () => {
  return (
    <section className="relative w-full min-h-[150dvh] flex flex-col items-center overflow-hidden">
      <Header />
      <Main />
    </section>
  );
};

export default Home;

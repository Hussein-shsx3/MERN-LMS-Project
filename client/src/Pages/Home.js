import React from "react";
import Header from "../Components/header";
import Main from "../Components/main";

const Home = () => {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden">
      <div className="relative min-h-[150dvh] w-full flex flex-col items-center px-2 md:px-0">
        <Header />
        <Main />
      </div>
    </section>
  );
};

export default Home;

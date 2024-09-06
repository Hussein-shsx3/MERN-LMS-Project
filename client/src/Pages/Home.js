import React from "react";
import Header from "../Components/header";

const Home = () => {
  return (
    <section className="relative w-full min-h-[100dvh] flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header active="active" />
      </div>
    </section>
  );
};

export default Home;

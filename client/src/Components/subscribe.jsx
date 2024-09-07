import React from "react";

const Subscribe = () => {
  return (
    <form className="w-full flex flex-col justify-center items-center gap-3 text-center">
      <p className="text-2xl text-title font-medium">
        Subscribe now & get 20% off
      </p>
      <p className="text-text font-medium">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className="w-full md:w-[52%] flex flex-row justify-center items-center mt-4">
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-[80%] h-[48px] outline-none border-borderColor border-[1px] pl-3"
        />
        <input
          type="submit"
          value="SUBSCRIBE"
          className="bg-black text-white text-xs w-[20%] h-[48px]"
        />
      </div>
    </form>
  );
};

export default Subscribe;

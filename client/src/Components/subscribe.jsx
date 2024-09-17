import React from "react";

const Subscribe = () => {
  return (
    <form className="w-full flex flex-col justify-center items-center gap-3 text-center">
      <p className="text-xl md:text-2xl text-title font-medium">
        Subscribe now & get 20% off
      </p>
      <p className="text-sm md:text-base text-text font-medium">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className="w-full md:w-[52%] flex flex-row justify-center items-center mt-4">
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-[79%] h-[47px] outline-none border-borderColor border-[1px] pl-3 text-sm md:text-base"
        />
        <input
          type="submit"
          value="SUBSCRIBE"
          className="bg-black text-white w-[21%] h-[47px] text-xs md:text-sm"
        />
      </div>
    </form>
  );
};

export default Subscribe;

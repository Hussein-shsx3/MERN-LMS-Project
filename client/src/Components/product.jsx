import React from "react";

const Product = (props) => {
  return (
    <div className="w-[215px] md:w-[230px] flex flex-col cursor-pointer">
      <div className="w-[215px] md:w-[230px] h-[265px] md:h-[275px] overflow-hidden mb-[10px]">
        <img
          src={props.img}
          alt=""
          className="object-cover w-[215px] md:w-[230px] h-[265px] md:h-[275px] hover:scale-[1.1] transition-all duration-200"
        />
      </div>
      <p className="text-[14px] text-title mb-[3px]">{props.name}</p>
      <p className="text-[14px]">{props.price}</p>
    </div>
  );
};

export default Product;

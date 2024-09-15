import React from "react";
import { Link } from "react-router-dom";

const Product = ({ image, name, price, id }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="w-[215px] md:w-[230px] flex flex-col cursor-pointer"
    >
      <div className="w-[215px] md:w-[230px] h-[265px] md:h-[275px] overflow-hidden mb-[10px]">
        <img
          src={image[0]}
          alt=""
          className="object-cover w-[215px] md:w-[230px] h-[265px] md:h-[275px] hover:scale-[1.1] transition-all duration-200"
        />
      </div>
      <p className="text-[14px] text-title mb-[3px]">{name}</p>
      <p className="text-[14px]">{price}</p>
    </Link>
  );
};

export default Product;

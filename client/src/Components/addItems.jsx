import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Api/ProductApi";
import { setStatus } from "../redux/productSlice";
import { ToastContainer, toast } from "react-toastify";

const AddItems = () => {
  const fileInputRefs = [useRef(), useRef(), useRef(), useRef()];
  const { status, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Topwear",
    price: "",
    sizes: [],
    isBestseller: false,
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSizeChange = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((s) => s !== size)
        : [...prevData.sizes, size],
    }));
  };

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages[index] = files[0];
      return { ...prevData, images: updatedImages };
    });
  };

  const handleFileClick = (index) => {
    fileInputRefs[index].current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      toast.error("You must input at least one image");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subCategory", formData.subCategory);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("isBestseller", formData.isBestseller);
    formData.sizes.forEach((size) => formDataToSend.append("sizes", size));
    formData.images.forEach((image) => {
      if (image) formDataToSend.append("images", image);
    });

    dispatch(createProduct(formDataToSend));
  };

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Product added successfully!");
      dispatch(setStatus());
    } else if (status === "failed") {
      toast.error(error || "Failed to add product.");
      dispatch(setStatus());
    }
  }, [status, error, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="pl-5 md:pl-10 py-6 flex flex-col w-full pt-6 space-y-4"
    >
      <ToastContainer />
      <p className="text-title mb-3">Upload Image</p>
      <div className="flex flex-row gap-2">
        {fileInputRefs.map((ref, index) => (
          <div key={index}>
            <input
              type="file"
              ref={ref}
              hidden
              onChange={(e) => handleFileChange(e, index)}
            />
            <img
              src={
                !formData.images[index]
                  ? "../images/imgB.png"
                  : URL.createObjectURL(formData.images[index])
              }
              alt=""
              className="w-[80px]"
              onClick={() => handleFileClick(index)}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-title">Product name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Type here"
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block text-title">Product description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Write content here"
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-title">Product category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border p-2 text-text"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <label className="block text-title">Sub category</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
            className="border p-2 text-text"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div>
          <label className="block text-title">Product Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="25"
            className="border p-2 text-text"
            required
          />
        </div>
      </div>

      <div>
        <p className="text-title">Product Sizes</p>
        <div className="flex gap-2 text-text">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeChange(size)}
              className={`border py-1 px-3 text-title ${
                formData.sizes.includes(size) ? "bg-pink-100" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isBestseller"
            checked={formData.isBestseller}
            onChange={handleInputChange}
          />
          <span className="ml-2">Add to bestseller</span>
        </label>
      </div>

      {status === "loading" ? (
        <div className="w-full h-[45px] flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <button
          type="submit"
          className="bg-black text-white py-3 px-9 mt-4 w-[110px]"
        >
          ADD
        </button>
      )}
    </form>
  );
};

export default AddItems;

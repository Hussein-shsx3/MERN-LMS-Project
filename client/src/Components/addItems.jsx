import React, { useRef, useState } from "react";

const AddItems = () => {
  const fileInputRefs = [useRef(), useRef(), useRef(), useRef()];
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const [formData, setFormData] = useState({
    images: [],
    name: "",
    description: "",
    category: "Men",
    subCategory: "Topwear",
    price: "",
    sizes: [],
    isBestseller: false,
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

  const handleFileClick = (index) => {
    fileInputRefs[index].current.click(); // Trigger the file input click
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setFormData((prevData) => {
          const updatedImages = [...prevData.images];
          updatedImages[index] = imageData;
          return { ...prevData, images: updatedImages };
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      alert("File size exceeds the 2MB limit");
    }
  };

  console.log(formData);

  return (
    <form className="pl-10 pt-6 space-y-4">
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
            <div
              onClick={() => handleFileClick(index)}
              className="flex flex-col justify-center items-center py-4 px-5 bg-slate-50 text-text border-[1px] cursor-pointer"
            >
              <i className="bx bx-cloud-upload text-2xl text-text"></i>
              <p className="text-sm translate-y-[-2px]">Upload</p>
            </div>
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
              className={`border p-2 text-title ${
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

      <button type="submit" className="bg-black text-white py-3 px-9 mt-4">
        ADD
      </button>
    </form>
  );
};

export default AddItems;

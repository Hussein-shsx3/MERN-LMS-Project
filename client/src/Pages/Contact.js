import React, { useState } from "react";
import Header from "../Components/Header/header";
import ScrollToTop from "../scrollToTop";
import { sendContactMessage } from "../Api/contactApi";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../redux/contactSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactMessage(formData));
  };

  // Show toast notifications when success or error state changes
  React.useEffect(() => {
    if (success) {
      toast.success("Message sent successfully!", { position: "top-right" });
      setFormData({ name: "", email: "", message: "" }); // Reset form
      setTimeout(() => dispatch(resetState()), 5000); // Reset state after 5s
    }
    if (error) {
      toast.error(error, { position: "top-right" });
    }
  }, [success, error, dispatch]);

  return (
    <section className="relative w-full flex flex-col items-center bg-[#f2f8fd] min-h-screen">
      <ScrollToTop />
      <ToastContainer />
      <Header />
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 mt-10">
        <h2 className="text-3xl font-semibold text-center text-blue-600">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mt-2">
          We'd love to hear from you! Please fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

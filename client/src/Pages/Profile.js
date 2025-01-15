import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ProfileHeader from "../Components/profileHeader";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../Api/userApi";

const Profile = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId);
  console.log(user);
  return (
    <section className="relative w-full flex flex-col items-center bg-[#f2f8fd]">
      <Header />
      <ProfileHeader User={user} />
      <div className="container w-full flex space-x-4 p-4">
        <Link
          to="/about-me"
          className="text-[17px] font-medium text-title hover:text-blue-500 transition"
        >
          About Me
        </Link>
        <Link
          to="/edit-profile"
          className="text-[17px] font-medium text-title hover:text-blue-500 transition"
        >
          Edit Profile
        </Link>
        <Link
          to="/edit-profile-picture"
          className="text-[17px] font-medium text-title hover:text-blue-500 transition"
        >
          Edit Profile Picture
        </Link>
      </div>
      <Outlet User={user} />
      <Footer />
    </section>
  );
};

export default Profile;

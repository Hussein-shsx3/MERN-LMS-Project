import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ProfileHeader from "../Components/profileHeader";
import { Link, Outlet, useParams } from "react-router-dom";
import { useGetUserById, useGetUser } from "../Api/userApi";

const Profile = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId);
  const { data: myProfile } = useGetUser();
  return (
    <section className="relative w-full flex flex-col items-center bg-[#f2f8fd]">
      <Header />
      <ProfileHeader User={user} />
      {myProfile?._id === user?._id && (
        <div className="container w-full flex space-x-4 p-4">
          <Link
            to={`/profile/${userId}`}
            className="text-[17px] font-medium text-title hover:text-blue-500 transition"
          >
            About Me
          </Link>
          <Link
            to={`/profile/${userId}/editProfile`}
            className="text-[17px] font-medium text-title hover:text-blue-500 transition"
          >
            Edit Profile
          </Link>
          <Link
            to={`/profile/${userId}/editProfileImage`}
            className="text-[17px] font-medium text-title hover:text-blue-500 transition"
          >
            Edit Profile Picture
          </Link>
        </div>
      )}
      <Outlet User={user} />
      <Footer />
    </section>
  );
};

export default Profile;

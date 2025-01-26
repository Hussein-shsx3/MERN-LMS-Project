import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ScrollToTop from "../scrollToTop";
import ProfileHeader from "../Components/profileHeader";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { useGetUserById, useGetUser } from "../Api/userApi";

const Profile = () => {
  const { userId } = useParams();
  const location = useLocation();

  const { data: user } = useGetUserById(userId);
  const { data: myProfile } = useGetUser();

  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-[17px] text-primary"
      : "text-[17px] text-title hover:text-blue-500 transition";

  return (
    <section className="relative w-full flex flex-col items-center bg-[#f2f8fd]">
      <ScrollToTop />
      <Header />
      <ProfileHeader User={user} />
      {myProfile?._id === user?._id && (
        <div className="container w-full flex flex-wrap items-center justify-center gap-4 p-4 sm:justify-start">
          <Link
            to={`/profile/${userId}`}
            className={getLinkClass(`/profile/${userId}`)}
          >
            About Me
          </Link>
          <Link
            to={`/profile/${userId}/editProfile`}
            className={getLinkClass(`/profile/${userId}/editProfile`)}
          >
            Edit Profile
          </Link>
          <Link
            to={`/profile/${userId}/editProfileImage`}
            className={getLinkClass(`/profile/${userId}/editProfileImage`)}
          >
            Edit Profile Picture
          </Link>
          {(myProfile?.role === "teacher" || myProfile?.role === "admin") && (
            <Link
              to={`/profile/${userId}/addNewCourse`}
              className={getLinkClass(`/profile/${userId}/addNewCourse`)}
            >
              Add New Course
            </Link>
          )}
          {(myProfile?.role === "teacher" || myProfile?.role === "admin") && (
            <Link
              to={`/profile/${userId}/myCoursesDashboard`}
              className={getLinkClass(`/profile/${userId}/MyCoursesDashboard`)}
            >
              My Courses
            </Link>
          )}
        </div>
      )}
      <Outlet User={user} />
      <Footer />
    </section>
  );
};

export default Profile;

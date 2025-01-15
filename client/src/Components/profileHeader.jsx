import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  return (
    <div className="w-full min-h-[270px] container flex flex-col md:flex-row justify-between items-end gap-4 p-10 bg-primary m-10 rounded-2xl">
      <div className="flex flex-row translate-y-0 md:translate-y-16">
        <img
          src={"/images/profile-photo.png"}
          alt="Profile"
          className="w-[145px] h-[145px] rounded-full object-cover border-white border-[5px]"
        />
        <div className="m-8">
          <h1 className="text-3xl text-white">Salim Rana</h1>
          <p className="text-sm text-white">18 Courses 56 Students</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link>
          <i className="bx bxl-github profileLinks"></i>
        </Link>
        <Link>
          <i className="bx bxl-youtube profileLinks"></i>
        </Link>
        <Link>
          <i className="bx bxl-facebook-circle profileLinks"></i>
        </Link>
        <Link>
          <i className="bx bxl-twitter profileLinks"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;

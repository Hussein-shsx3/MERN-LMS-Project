import React, { useMemo } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { User, Edit, Image, PlusCircle, Book } from "lucide-react";

// Components
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/footer";
import ScrollToTop from "../scrollToTop";
import ProfileHeader from "../Components/Profile/profileHeader";
import { useGetUserById, useGetUser } from "../Api/userApi";

const NavItem = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
      ${
        isActive
          ? "bg-primary text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100"
      }
    `}
  >
    <Icon size={20} />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const Profile = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { data: user, isLoading: isUserLoading } = useGetUserById(userId);
  const { data: myProfile, isLoading: isMyProfileLoading } = useGetUser();

  const isOwnProfile = myProfile?._id === user?._id;
  const isTeacherOrAdmin =
    myProfile?.role === "teacher" || myProfile?.role === "admin";

  const navigationItems = useMemo(() => {
    const items = [
      {
        to: `/profile/${userId}`,
        icon: User,
        label: "About Me",
        showAlways: true,
      },
      {
        to: `/profile/${userId}/editProfile`,
        icon: Edit,
        label: "Edit Profile",
        showIfOwn: true,
      },
      {
        to: `/profile/${userId}/editProfileImage`,
        icon: Image,
        label: "Edit Profile Picture",
        showIfOwn: true,
      },
      {
        to: `/profile/${userId}/addNewCourse`,
        icon: PlusCircle,
        label: "Add New Course",
        showIfTeacher: true,
      },
      {
        to: `/profile/${userId}/myCoursesDashboard`,
        icon: Book,
        label: "My Courses",
        showIfTeacher: true,
      },
    ];

    return items.filter(
      (item) =>
        item.showAlways ||
        (item.showIfOwn && isOwnProfile) ||
        (item.showIfTeacher && isTeacherOrAdmin)
    );
  }, [userId, isOwnProfile, isTeacherOrAdmin]);

  if (isUserLoading || isMyProfileLoading) {
    return (
      <div className="min-h-screen bg-[#f2f8fd] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f8fd]">
      <ScrollToTop />
      <Header />

      <main className="flex flex-col items-center pb-20">
        <ProfileHeader User={user} />

        {/* Navigation */}
        {isOwnProfile && (
          <div className="container mx-auto px-4 py-6">
            <nav className="bg-white rounded-xl shadow-sm p-2">
              <div className="flex flex-wrap gap-2">
                {navigationItems.map((item) => (
                  <NavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    isActive={location.pathname === item.to}
                  />
                ))}
              </div>
            </nav>
          </div>
        )}

        {/* Content Area */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Outlet context={{ user, myProfile }} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearStatus } from "../redux/userSlice";
import { useGetUser } from "../Api/userApi";
import { useFetchCourses } from "../Api/courseApi";
import Cookies from "universal-cookie";
import SearchBar from "./searchBar";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Sample categories for the dropdown
const products = [
  {
    name: "Web Development",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Data Science",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Mobile Development",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Programming Languages",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("token");

  const cartLength = useSelector((state) => state.cart.courses.length);

  const { data: user } = useGetUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch courses using React Query
  const { data: courses } = useFetchCourses();

  // Filter courses based on the search term
  const filteredCourses = courses?.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const coursesToDisplay = searchTerm ? filteredCourses : courses?.slice(0, 4); // Show the first 4 courses when no search term is entered

  const toggleSearchBar = () => {
    const search = document.getElementById("searchBar");
    search.classList.toggle("toggleSearchBar");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearStatus());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY > 300) {
        header.classList.add("headerScroll");
      } else {
        header.classList.remove("headerScroll");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="header"
      className="relative w-full flex px-2 md:px-0 items-center justify-center z-10 transition-all duration-300 backdrop-blur-2xl bg-white/30"
    >
      <header className="container w-full shadow-sm">
        {/* Search Bar */}
        <div
          id="searchBar"
          className="absolute left-0 toggleSearchBar w-full h-[100dvh] z-[1] transition-all duration-500 backdrop-blur-sm bg-white/30"
        >
          <i
            className="bx bx-x absolute text-2xl text-text border-[1px] rounded-full h-[47px] w-[47px] flex justify-center items-center top-6 md:top-10 xl:top-7 right-8 md:right-14 xl:right-12 transition-all duration-300 hover:rotate-45"
            onClick={toggleSearchBar}
          ></i>
          <div className="w-full h-[77dvh] md:h-[72dvh] bg-white flex flex-col items-center pt-20 overflow-hidden">
            <div className="w-[95%] md:w-[85%] lg:w-[70%] flex flex-col gap-6 md:gap-9">
              <div className="bg-white border-[1px] w-full h-[45px] flex justify-center items-center gap-3 rounded-md focus-within:searchBar">
                <i className="bx bx-search cursor-pointer text-[20px] text-title"></i>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-[93%] outline-none h-[45px] bg-transparent"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="scrollSearch w-full flex h-[54dvh] md:h-auto flex-col md:flex-row items-center md:items-start justify-start gap-4 overflow-scroll md:overflow-hidden">
                {coursesToDisplay?.map((course, index) => (
                  <SearchBar course={course} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Global"
          className="flex w-full items-center justify-between py-6 gap-5"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="">
              <span className="sr-only">Your Company</span>
              <img
                alt="Logo"
                src="/images/logo-black-2-1.png"
                className="h-7 w-auto"
              />
            </Link>
          </div>
          <PopoverGroup className="hidden lg:flex gap-0 lg:gap-x-12">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-title outline-none hover:text-primary">
                Categories
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 text-title hover:text-primary"
                    >
                      <div className="flex-auto">
                        <Link to={item.href} className="block">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Link to="/" className="text-title hover:text-primary">
              Home
            </Link>
            <Link to="/courses" className="text-title hover:text-primary">
              All Courses
            </Link>
            <Link to="/myCourses" className="text-title hover:text-primary">
              My Courses
            </Link>
          </PopoverGroup>
          <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
            <div className="text-[26px] text-text flex flex-row items-center gap-3 mr-2">
              <i
                className="bx bx-search cursor-pointer hover:text-primary"
                onClick={toggleSearchBar}
              ></i>
              <button className="relative py-2 rounded-full">
                <i className="bx bx-cart-alt text-[26px] text-text"></i>
                <span className="absolute top-1 right-[-8px] bg-primary text-white text-[13px] rounded-full w-[22px] h-[22px] flex justify-center items-center">
                  {cartLength}
                </span>
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-2 xl:gap-4 text-sm xl:text-base">
              {user && token ? (
                <div className="relative group h-full">
                  <img
                    src={
                      user?.picture
                        ? user?.picture
                        : "/images/profile-photo.png"
                    }
                    alt="Profile"
                    className="w-[38px] h-[38px] rounded-full cursor-pointer object-cover"
                  />
                  <div className="absolute left-[-10px] top-6 mt-2 w-[150px] bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-primary text-white px-5 py-2 rounded-[20px]"
                >
                  Login
                </Link>
              )}
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <img
                  alt="Logo"
                  src="/images/logo-black-2-1.png"
                  className="h-5 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-title"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6">
              <Disclosure>
                <DisclosureButton className="group flex w-full items-center justify-between py-2 pl-3 pr-3.5 text-base text-title hover:bg-gray-50 hover:text-primary">
                  Categories
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {products.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm text-title hover:bg-gray-50 hover:text-primary"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <Link
                to="/"
                className="block rounded-lg px-3 py-2 text-base text-title hover:bg-gray-50 hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="block rounded-lg px-3 py-2 text-base text-title hover:bg-gray-50 hover:text-primary"
              >
                All Courses
              </Link>
              <Link
                to="/myCourses"
                className="block rounded-lg px-3 py-2 text-base text-title hover:bg-gray-50 hover:text-primary"
              >
                My Courses
              </Link>
            </div>
            <div className="py-6">
              {user && token ? (
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user?.picture
                        ? user?.picture
                        : "/images/profile-photo.png"
                    }
                    alt="Profile"
                    className="w-[38px] h-[38px] rounded-full"
                  />
                  <button
                    onClick={handleLogout}
                    className="text-title hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-title hover:text-primary">
                  Login
                </Link>
              )}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Header;

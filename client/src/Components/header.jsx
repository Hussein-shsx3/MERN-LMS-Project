import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Api/userApi";
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

const products = [
  {
    name: "Web Developement",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Data Sciense",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Mobile Developement",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Programing Languages",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const courses = useSelector((state) => state.cart.courses);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <header className="bg-white w-full">
      <nav
        aria-label="Global"
        className="mx-auto flex w-[95%] items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="." className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="./images/logo.png" className="h-7 w-auto" />
          </a>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1  text-title">
              Categories
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <a href={item.href} className="block  text-title">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <Link to="/" className=" text-title">
            Home
          </Link>
          <Link to="#" className=" text-title">
            All Courses
          </Link>
          <Link to="#" className=" text-title">
            My Courses
          </Link>
        </PopoverGroup>
        <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
          <div className="text-[25px] text-text flex flex-row items-center gap-3 mr-2">
            <i className="bx bx-search cursor-pointer"></i>
            <hr className="bg-gray-300 w-[1px] h-[40px] cursor-pointer" />
            <Link to="" className="relative flex">
              <i className="bx bx-cart cursor-pointer"></i>
              <span className="absolute top-[-8px] right-[-10px] text-xs bg-primary text-white w-[22px] h-[22px] flex justify-center items-center rounded-full">
                {courses.length}
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button className="bg-primary text-white px-5 py-2 rounded-[8px]">
              Enroll Now
            </button>
            {user !== null ? (
              <Link to="." className="">
                <img
                  src={
                    user.picture ? user.picture : "./images/profile-photo.png"
                  }
                  alt=""
                  className="w-[38px] h-[38px] rounded-full"
                />
              </Link>
            ) : (
              <Link
                to=""
                className="bg-primary text-white px-5 py-2 rounded-[8px]"
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
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="." className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="./images/logo.png" className="h-5 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-title"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 text-title hover:bg-gray-50">
                    Categories
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 text-title hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  to=""
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-title hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to=""
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-title hover:bg-gray-50"
                >
                  All Courses
                </Link>
                <Link
                  to=""
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-title hover:bg-gray-50"
                >
                  My Courses
                </Link>
              </div>
              <div className="py-6">
                {user !== null ? (
                  <Link
                    to="."
                    className="flex flex-row items-center justify-between"
                  >
                    <>
                      <img
                        src={
                          user.picture
                            ? user.picture
                            : "./images/profile-photo.png"
                        }
                        alt=""
                        className="w-[38px] h-[38px] rounded-full"
                      />
                      <Link to="" className="">
                        log out
                      </Link>
                    </>
                  </Link>
                ) : (
                  <Link to="" className="">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;

/** @format */

import { Fragment } from "react";
import { Link, useLocation } from "react-router";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserContext } from "../../context/user-context";
import logo from "../../assets/logo.png";

const navigation = [
  { name: "Home", href: "/", withAuth: false },
  { name: "Search Recipes", href: "/recipes", withAuth: true },
  { name: "My Posts", href: "/myposts", withAuth: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useUserContext();

  return (
    <Disclosure as="nav" className="fixed w-full z-50">
      {({ open }) => (
        <>
          <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
            <div className="container-custom px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                {/* Logo + Nav */}
                <div className="flex">
                  <Link
                    to="/"
                    className="flex items-center space-x-3 flex-shrink-0"
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      className="h-12 w-12 rounded-full object-cover shadow-md"
                    />
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      Recipe Builder
                    </span>
                  </Link>

                  <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-8">
                    {navigation.map(
                      (item) =>
                        (!item.withAuth || user?._id) && (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.href === location.pathname
                                ? "border-orange-500 text-orange-600"
                                : "border-transparent text-gray-600 hover:text-orange-500",
                              "inline-flex items-center border-b-2 px-1 pt-1 text-base font-semibold transition-colors duration-200"
                            )}
                          >
                            {item.name}
                          </Link>
                        )
                    )}
                  </div>
                </div>

                {/* Desktop right */}
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {user?._id ? (
                    <div className="flex items-center space-x-6">
                      <Link
                        to="/post"
                        className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-md text-base font-semibold"
                      >
                        Add Recipe
                      </Link>
                      <Menu as="div" className="relative ml-3">
                        <Menu.Button className="flex rounded-full bg-orange-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 hover:bg-orange-200">
                          <span className="sr-only">Open user menu</span>
                          <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-semibold">
                            {user.name?.[0]?.toUpperCase() || "👤"}
                          </div>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profile"
                                  className={classNames(
                                    active ? "bg-orange-50" : "",
                                    "block px-4 py-2 text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200"
                                  )}
                                >
                                  Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={logout}
                                  className={classNames(
                                    active ? "bg-orange-50" : "",
                                    "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Link
                        to="/login"
                        className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-md"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-orange-50 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2 bg-white">
              {navigation.map(
                (item) =>
                  (!item.withAuth || user?._id) && (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className={classNames(
                        item.href === location.pathname
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-transparent text-gray-600 hover:bg-orange-50 hover:text-orange-500",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors duration-200"
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  )
              )}
            </div>

            {user?._id ? (
              <div className="border-t border-gray-200 bg-white pb-4 pt-4 px-4 space-y-3">
                {/* Add Recipe button first */}
                <Link
                  to="/post"
                  className="block w-full text-center px-3 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition-all duration-200"
                >
                  Add Recipe
                </Link>

                {/* Profile avatar + text below */}
                <Link
                  to="/profile"
                  className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-50 transition-colors duration-200"
                >
                  <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-base font-semibold">
                    {user.name?.[0]?.toUpperCase() || "👤"}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Profile
                  </span>
                </Link>

                <Disclosure.Button
                  as="button"
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            ) : (
              <div className="border-t border-gray-200 bg-white pb-3 pt-4 px-4 space-y-1">
                <Disclosure.Button
                  as={Link}
                  to="/login"
                  className="block text-base font-medium text-gray-500 hover:bg-orange-50 hover:text-orange-500 px-3 py-2 transition-colors duration-200"
                >
                  Sign in
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to="/signup"
                  className="block text-base font-medium bg-orange-500 text-white hover:bg-orange-600 px-3 py-2 rounded-md text-center transition-colors duration-200"
                >
                  Sign up
                </Disclosure.Button>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

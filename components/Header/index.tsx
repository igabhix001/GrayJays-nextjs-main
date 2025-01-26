"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  // Sticky menu logic
  const handleStickyMenu = () => {
    if (window.scrollY >= 50) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full ${
        stickyMenu
          ? "bg-white shadow dark:bg-black"
          : "bg-transparent"
      } transition duration-150`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 xl:py-2 2xl:px-0">
        {/* Logo Section */}
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <a href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo/logo-dark.svg"
              alt="logo"
              width={60} // Reduced size
              height={20} // Reduced size
              className="hidden dark:block"
            />
            <Image
              src="/images/logo/logo-light.svg"
              alt="logo"
              width={60} // Reduced size
              height={20} // Reduced size
              className="dark:hidden"
            />
            <span className="text-base font-semibold text-gray-600 dark:text-gray-300">
              Gray Jays
            </span>
          </a>

          {/* Hamburger Toggle Button */}
          <button
            aria-label="hamburger-toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative my-1 block h-0.5 rounded-sm bg-black dark:bg-white ${
                    navigationOpen ? "w-0" : "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative my-1 block h-0.5 rounded-sm bg-black dark:bg-white ${
                    navigationOpen ? "w-0" : "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative my-1 block h-0.5 rounded-sm bg-black dark:bg-white ${
                    navigationOpen ? "w-0" : "delay-500 !w-full"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black dark:bg-white ${
                    navigationOpen ? "h-full" : "!h-0"
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black dark:bg-white ${
                    navigationOpen ? "h-0.5" : "!h-0"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        {/* Navigation Menu */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-6 shadow-lg dark:bg-black xl:shadow-none xl:bg-transparent"
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-8">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "relative group"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => setDropdownToggler(!dropdownToggler)}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 fill-current text-gray-600 dark:text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>

                      <ul
                        className={`absolute left-0 mt-2 hidden flex-col gap-2 bg-white p-4 shadow-lg dark:bg-gray-800 ${
                          dropdownToggler ? "flex" : ""
                        }`}
                      >
                        {menuItem.submenu.map((item, key) => (
                          <li key={key} className="hover:text-primary">
                            <Link href={item.path || "#"}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={menuItem.path || "#"}
                      className={`hover:text-primary ${
                        pathUrl === menuItem.path ? "text-primary" : ""
                      }`}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="mt-6 flex items-center gap-4 xl:mt-0">
            <ThemeToggler />
            <Link
              href="/signin"
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Sign In 🌟
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center rounded-full bg-primary px-5 py-1.5 text-sm text-white hover:bg-opacity-90"
            >
              Sign Up 🔥
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

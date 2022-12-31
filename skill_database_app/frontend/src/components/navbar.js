import React, { useState } from "react";
// import tailwind from "../Images/tailwind.png";

const Navbar = () => {
  const [isShow, setIsShow] = useState(false);

  const hamburgerMenuHandler = (e) => {
    setIsShow(!isShow);
  };

  return (
    <header className="py-3 w-full h-[63px] bg-slate-600 shadow text-white z-50 sticky top-0 right-0 left-0 mb-5">
      <nav className="container md:flex md:items-center md:justify-between">
        {/* logo - hamburger-menu*/}
        <div className="text-lg md:text-2xl font-bold text-[#00df9a] cursor-pointer flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center">
            <div className="h-10 w-10 mr-3">
              <img
                className="h-full w-full inline-block rounded-full"
                // src={tailwind}
                alt="tailwind-css logo"
              />
            </div>

            <span className="">Tailwind.</span>
          </div>

          {/* hamburger-menu */}
          <span
            className="text-3xl cursor-pointer flex items-center md:hidden"
            onClick={hamburgerMenuHandler}
          >
            {!isShow ? (
              <span className="">
                <ion-icon name="menu-outline"></ion-icon>
              </span>
            ) : (
              <span className="">
                <ion-icon name="close-outline"></ion-icon>
              </span>
            )}
          </span>
        </div>

        {/* list */}
        <ul
          className={`md:flex md:items-center gap-5 lg:gap-9 -z-[-1] md:z-auto md:static absolute bg-slate-600 w-screen left-0 md:w-auto py-3 md:py-0 pl-7 md:pl-0 top-[-400px] ${
            isShow && "top-[62px] -z-50"
          } transition-all ease-in duration-500`}
        >
          <li className="my-6 md:my-0">
            <a
              href="/"
              className="text-lg hover:text-cyan-500 transition-all ease-in-out duration-300"
            >
              Home
            </a>
          </li>

          <li className="my-6 md:my-0">
            <a
              href="/"
              className="text-lg hover:text-cyan-500 transition-all ease-in-out duration-300"
            >
              Service
            </a>
          </li>

          <li className="my-6 md:my-0">
            <a
              href="/"
              className="text-lg hover:text-cyan-500 transition-all ease-in-out duration-300"
            >
              About Us
            </a>
          </li>

          <li className="my-6 md:my-0">
            <a
              href="/"
              className="text-lg hover:text-cyan-500 transition-all ease-in-out duration-300"
            >
              Blogs
            </a>
          </li>

          <button className="bg-cyan-400 duration-300 px-6 py-2 hover:bg-cyan-500 rounded">
            Get Started
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
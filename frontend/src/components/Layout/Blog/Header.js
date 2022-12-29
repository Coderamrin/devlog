import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="px-5 py-4 flex justify-between">
        <a href="/" className="logo text-2xl font-bold">
          Devlog
        </a>

        <ul className="nav-link hidden md:flex">
          <li className="flex">
            <Link to={"/"}>Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>{" "}
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>{" "}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Signup</Link>
              </li>
            </>
          )}
        </ul>

        <button className="block md:hidden" onClick={handleToggle}>
          {toggle ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </button>

        <ul
          className={
            toggle
              ? "nav-link mobile-nav left-0"
              : "nav-link mobile-nav left-[-100%]"
          }
        >
          <li className="flex flex-col">
            <Link>Home</Link>
            {user ? (
              <>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <>
                <Link>Login</Link>
                <Link>Signup</Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

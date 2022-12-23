import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        className={
          !toggle
            ? "sidebar md:left-0 left-[-100%]"
            : "sidebar left-0 md:left-[-100%]"
        }
      >
        <div className="flex items-center">
          <Link to="/dashboard" className="text-2xl font-bold">
            Dashboard
          </Link>

          <button className="ml-2 bg-orange-600" onClick={handleToggle}>
            {!toggle ? "" : <AiOutlineClose size={20} />}
          </button>
        </div>
        <ul className="pt-10">
          <li className="py-2 font-bold border-b-2 border-gray-800 hover:border-blue-400 ">
            {" "}
            <Link to="/dashboard/new"> New Post </Link>
          </li>
          <li className="py-2 font-bold border-b-2 border-gray-800 hover:border-blue-400 ">
            {" "}
            <Link to="/dashboard/author"> Author </Link>
          </li>
        </ul>

        <button onClick={handleLogout} className="mt-auto bg-orange-400 px-5 py-2 hover:bg-orange-600">
          Logout
        </button>
      </div>

      <div className={!toggle ? " pl-0 md:pl-52" : "pl-0"}>
        <div className="flex justify-between p-5 bg-gray-100 text-black ">
          <div className="flex justify-between items-center">
            <ul className="flex items-center">
              <li className="p-2" onClick={handleToggle}>
                <AiOutlineMenu size={20} />
              </li>
              <li className="p-2">Home</li>
            </ul>
          </div>

          <div className="profil flex"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

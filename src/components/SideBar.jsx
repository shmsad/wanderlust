import { Drawer } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { successEmitter } from "../ToastEmitter";
import { useAuthContext } from "../contextapi/authcontext/authContext";

function SideBar({ open, setOpen,  navigate }) {

 const {user, setIsLogin} = useAuthContext()

  const logoutFun = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    successEmitter("logout successfully");
    navigate("/login", { replace: true });
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => {
        setOpen(false);
      }}
    >
      <div
        className="bg-gray-100 dark:bg-gray-700 h-screen w-[250px]"
        role="presentation"
        onClick={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 pt-8 w-full">
          <img
            className="h-[100px] w-[100px] object-cover border-2 border-amber-50 rounded-full"
            src={user.avtar}
            alt="loading..."
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">
            {user?.name}
          </h1>
          <h1 className="text-sm text-gray-900 dark:text-gray-100">
            {user?.email}
          </h1>
        </div>
        <ul className="space-y-2 py-4 ">
          <li>
            <Link
              to="/yourpost"
              className="block py-2 pl-7 font-semibold text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Your Posts
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block py-2 pl-7 font-semibold text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block py-2 pl-7 font-semibold text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Settings
            </Link>
          </li>
          <li className="text-center">
            <Link
              to="/login"
              className="inline-block py-3 px-7 mt-10 font-semibold rounded-sm text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-900"
              onClick={logoutFun}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </Drawer>
  );
}

export default SideBar;

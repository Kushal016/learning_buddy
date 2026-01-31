import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full  pr-10 space-x-4 flex justify-end border-b border-gray-300">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "nav_link border-purple-700"
            : "nav_link border-transparent"
        }
      >
        <span className="text-slate-600">Dashboard</span>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive
            ? "nav_link border-purple-700"
            : "nav_link border-transparent"
        }
      >
        <span className="text-slate-600">History</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? "nav_link border-purple-700"
            : "nav_link border-transparent"
        }
      >
        <span className="text-slate-600">Profile</span>
      </NavLink>
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          isActive
            ? "nav_link border-purple-700"
            : "nav_link border-transparent"
        }
      >
        <span className="text-slate-600">Logout</span>
      </NavLink>
    </div>
  );
};

export default Navbar;

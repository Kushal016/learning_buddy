import React from "react";
import { NavLink } from "react-router-dom";

const SideCard = () => {
  return (
    <div className="bg-violet-950 h-dvh">
      <div className=" flex items-center space-x-5 pl-12 pt-2">
        <div className="w-14 h-14">
          <img src="./logo.png" />
        </div>
        <div className="text-2xl font-bold pb-2 text-white">AI tools</div>
      </div>
      <section className="flex flex-col mt-16 space-y-3 text-center text-white font-semibold">
        <NavLink
          to="/grammarFix"
          className={({ isActive }) =>
            isActive
              ? "py-4 bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
              : "py-4 hover:bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
          }
        >
          <span className="text-white">Grammar fix</span>
        </NavLink>
        <NavLink
          to="/summarizer"
          className={({ isActive }) =>
            isActive
              ? "py-4 bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
              : "py-4 hover:bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
          }
        >
          <span className="text-white">Text summarizer</span>
        </NavLink>
        <NavLink
          to="/explainTopic"
          className={({ isActive }) =>
            isActive
              ? "py-4 bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
              : "py-4 hover:bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
          }
        >
          <span className="text-white">Explain topic</span>
        </NavLink>
        <NavLink
          to="/dailyPlanner"
          className={({ isActive }) =>
            isActive
              ? "py-4 bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
              : "py-4 hover:bg-linear-to-r cursor-pointer rounded from-pink-600 via-purple-500 to-blue-600"
          }
        >
          <span className="text-white">Daily planner</span>
        </NavLink>
      </section>
    </div>
  );
};

export default SideCard;

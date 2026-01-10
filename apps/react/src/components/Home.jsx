import React from "react";
import Header from "./Header";
import { bulb, calander, paper, pen } from "../assets/icon";

const Home = () => {
  const cardData = [
    {
      row: [
        {
          icon: pen,
          header: "Grammar Fix",
          description: "Correct your grammar & spelling",
        },
        {
          icon: paper,
          header: "Summarizer",
          description: "Shorten articles, essays & more",
        },
      ],
    },
    {
      row: [
        {
          icon: bulb,
          header: "Explain Topic",
          description: "Understand complex concepts easily",
        },
        {
          icon: calander,
          header: "Daily Planner",
          description: "Let AI organize your daily schedule",
        },
      ],
    },
  ];
  const Card = ({ card, idx }) => {
    return (
      <div
        className={`w-3/4 h-20 bg-white mt-4 px-4 ${
          idx % 2 === 1 ? "mr-20" : ""
        } flex space-x-10 items-center`}
      >
        <div className="w-10 h-10">{card.icon}</div>
        <div className="flex flex-col space-y-2">
          <div className="text-xl  ">{card.header}</div>
          <div className="text-lg text-slate-400">{card.description}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-purple-50 w-full h-full px-6">
      <Header />
      <section className="w-full flex justify-between pt-16">
        <div>
          <div className="flex flex-col space-y-3">
            <div className="text-6xl font-semibold">AI Tools for</div>
            <div className="text-5xl font-semibold text-purple-600">
              Productivity & Learning
            </div>
            <div className="text-2xl text-slate-500">
              Summarize, Explain, Plan & Improve your day with AI
            </div>
          </div>
          <div className="flex space-x-4 pt-20">
            <div className="w-64 h-12 items-center justify-center flex rounded-md cursor-pointer shadow-lg bg-purple-600 text-white">
              get Started
            </div>
            <div className="w-64 h-12 items-center justify-center flex rounded-md cursor-pointer shadow-lg bg-purple-100 text-purple-600">
              Try Demo
            </div>
          </div>
        </div>

        <div className=" pr-28">
          <div className="w-md h-112">
            <img src="home-bg-1.png" />
          </div>
        </div>
      </section>
      <section className="w-full h-auto">
        {cardData?.map((card) => {
          return (
            <div className="w-full flex space-x-8 justify-between">
              {card.row.map((card, idx) => (
                <Card {...{ card, idx }} />
              ))}{" "}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Home;

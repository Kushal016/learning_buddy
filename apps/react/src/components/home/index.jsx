import React from "react";
import Header from "../../common/Header";
import {
  Bulb,
  Calander,
  Paper,
  EnterText,
  SecurityIcon,
  GrammerFix,
} from "../../assets/icon";

const Home = () => {
  const cardData = [
    {
      row: [
        {
          icon: <GrammerFix />,
          header: "Grammar Fix",
          description: "Correct your grammar & spelling",
        },
        {
          icon: <Paper />,
          header: "Summarizer",
          description: "Shorten articles, essays & more",
        },
      ],
    },
    {
      row: [
        {
          icon: <Bulb />,
          header: "Explain Topic",
          description: "Understand complex concepts easily",
        },
        {
          icon: <Calander />,
          header: "Daily Planner",
          description: "Let AI organize your daily schedule",
        },
      ],
    },
    {
      row: [
        {
          icon: <SecurityIcon />,
          header: "Safe & Secure",
          description: "We priortize your privacy and data security",
        },
        {
          icon: <EnterText />,
          header: "How It Works",
          description: "Enter your text or track",
        },
      ],
    },
  ];
  const Card = ({ card, idx }) => {
    return (
      <div
        className={`w-3/4 h-20 bg-white mt-4 px-4 ${
          idx % 2 === 1 ? "mr-20" : ""
        } flex space-x-6 items-center rounded-xl shadow-md`}
      >
        <div className="w-10 h-10">{card.icon}</div>
        <div className="flex flex-col space-y-1">
          <div className="text-xl text-purple-600">{card.header}</div>
          <div className="text-lg text-slate-400">{card.description}</div>
        </div>
      </div>
    );
  };

  const jobs = [
    "Enter your text or task",
    "AI processes it in seconds",
    "Get your output",
  ];
  const Job = () => {
    return (
      <div className="flex flex-col w-full space-y-4 mr-20">
        <div className="flex justify-center content-center text-2xl text-black">
          How it works
        </div>
        <div className="grid grid-cols-3 gap-4">
          {jobs.map((j, idx) => {
            return (
              <div className="flex flex-row space-x-2 px-4 items-center rounded-xl bg-white h-12 shadow-md">
                <div className="w-6 h-6 rounded-full  bg-linear-to-bl from-pink-400 to-purple-600  text-white pl-2 font-bold">
                  {idx + 1}
                </div>
                <div className="text-purple-600">{j}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="bg-purple-50 w-full h-full">
      <Header />
      <section className="w-full flex justify-between pt-16 px-6 ">
        <div className="ml-18">
          <div className="flex flex-col space-y-3">
            <div className="text-6xl font-semibold text-black">
              AI Tools for
            </div>
            <div className="text-5xl font-semibold text-purple-600">
              Productivity & Learning
            </div>
            <div className="text-2xl text-slate-500">
              Summarize, Explain, Plan & Improve your day with AI
            </div>
          </div>
          <div className="flex space-x-4 pt-20">
            <div className="w-64 h-12 items-center justify-center flex rounded-md cursor-pointer shadow-lg bg-linear-to-bl from-pink-400 to-purple-600  text-white">
              Get Started Free
            </div>
            <div className="w-64 h-12 items-center justify-center flex rounded-md cursor-pointer shadow-lg bg-purple-100 text-purple-600">
              Try Demo
            </div>
          </div>
        </div>

        <div className="">
          <div className="w-md h-112">
            <img src="home-bg-1.png" />
          </div>
        </div>
      </section>
      <section className="w-full h-auto  px-20 pb-4">
        <div className="ml-16">
          {cardData?.map((card) => {
            return (
              <div className="w-full flex space-x-8 justify-between">
                {card.row.map((card, idx) => (
                  <Card {...{ card, idx }} />
                ))}
              </div>
            );
          })}
        </div>
      </section>
      <section className="w-full h-auto py-8 px-6">
        <Job />
      </section>
      <section className="w-full h-auto py-8 bg-linear-to-br from-white  via-purple-600 to-pink-400 ">
        <div className="flex w-full text-center flex-col space-y-4">
          <div className="flex justify-center text-2xl text-white">
            Start using AI tools for free today
          </div>
          <div className="flex justify-center content-center">
            <div
              className="w-64 h-12 items-center justify-center flex rounded-md cursor-pointer shadow-lg bg-white text-purple-600"
              onClick={() => {}}
            >
              Sign up Free
            </div>
          </div>
          <div className="flex justify-center content-center text-white text-sm">
            2026 AI Tools . Privacy . Terms
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

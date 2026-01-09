import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center">
        <div className="flex items-center pt-10 justify-center flex-col space-y-10 w-2/3 border border-pink-700">
          <div className="text-4xl font-bold text-slate-700">Job Board</div>
          <section className="w-full">
            <div className=""></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

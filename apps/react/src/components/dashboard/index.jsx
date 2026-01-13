import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-rows-4">
      <div></div>
      <div></div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center content-center">How it works</div>
        <div className="flex flex-row space-x-4 justify-around">
          <div>Enter your text or task</div>
          <div>AI processes it in seconds</div>
          <div>Get your output</div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center content-center">
          Start using AI tools for free today
        </div>
        <div><button onClick={()=>{}}>Sign up Free</button></div>
      </div>
    </div>
  );
};

export default Dashboard;

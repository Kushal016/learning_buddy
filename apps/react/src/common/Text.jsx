import React from "react";
import { Severity, TextSize } from "./utilities";

const Text = ({ size, colour, children, ...props }) => {
    console.log("Severity(colour)", Severity(colour));
    
  return (
    <div
      className={`${size ? TextSize(size) : "text-base"} ${
        colour ? Severity(colour) : "text-primary"
      }}`}
    >
      {children}
    </div>
  );
};

export default Text;

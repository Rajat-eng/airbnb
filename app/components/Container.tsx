"use Client";

import React from "react";
interface containerProps {
  children: React.ReactNode;
}
const Container: React.FC<containerProps> = ({ children }) => {
  return (
    <div
      className="px-4 
        py-4 
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2"
    >
      {children}
    </div>
  );
};

export default Container;

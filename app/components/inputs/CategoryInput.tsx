"use Client";
import { IconType } from "react-icons";
import React from "react";

interface props {
  onClick: () => void;
  icon: IconType;
  label: string;
  selected?: boolean;
}
const CategoryInput: React.FC<props> = ({ onClick, selected, label, icon:Icon }) => {
  
  return (
    <div
      onClick={() => onClick()}
      className={`
      rounded-xl
      border-2
      p-4
      flex
      flex-col
      gap-3
      hover:border-yellow-500
      transition
      cursor-pointer
      ${selected ? "border-green-600" : "border-neutral-400"}
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;

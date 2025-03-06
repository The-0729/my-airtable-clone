import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const TabItem = ({
  activeTab,
  onTabChange,
  id,
  index,
  name,
  tabsLength,
  indexSelected,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  id: string;
  index: number;
  name: string;
  tabsLength: number;
  indexSelected: number;
}) => {
  return (
    <div
      className={`h-full cursor-pointer ${activeTab === id ? "" : "bg-white"}`}
      onClick={() => onTabChange(id)}
    >
      <div
        className={`flex h-full items-center px-3 ${activeTab === id ? "rounded-t-[3px] bg-white text-black" : "bg-[#0b736c] text-[#fffffff2] hover:bg-[#0b6661]"} ${index === indexSelected - 1 ? "rounded-br-[3px]" : ""} ${index === indexSelected + 1 ? "rounded-bl-[3px]" : ""} `}
      >
        <p className="text-[13px] font-medium">{name}</p>
        {activeTab === id && (
          <ChevronDownIcon className="ml-1 h-4 w-4" onClick={() => {}} />
        )}
      </div>
    </div>
  );
};

export default TabItem;

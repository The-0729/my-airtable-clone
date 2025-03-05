import React from "react";
import { Cog8ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const ViewBar = () => {
  return (
    <div className="block h-full min-w-[280px] border-r border-gray-200 p-3">
      <div className=" flex items-center justify-between border-b border-gray-200">
       
       <MagnifyingGlassIcon className="size-4 text-gray-500 mr-2"/>
        <input
          placeholder="Find a view"
          className="flex-1 py-2 text-xs text-[#1d1f25] outline-none"
        />
        <Cog8ToothIcon className="size-4 text-gray-500" />
      </div>
    </div>
  );
};

export default ViewBar;

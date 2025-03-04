import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  TableCellsIcon,
  ViewColumnsIcon,
  Bars3Icon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Navbar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="block h-[44px] w-full border-b border-gray-200 bg-white py-[9px] pl-3">
      <div className="my-auto ml-auto flex h-full items-center space-x-2">
        <button
          className={`m-[2px] flex h-full cursor-pointer items-center space-x-1 rounded-[3px] px-1.5 ${isOpen ? "bg-[#0000000d] hover:m-[0px] hover:border-[2px] hover:border-[#0000001a]" : "hover:bg-[#0000000d]"}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Bars3Icon className="size-5" />
          <p className="text-sm font-medium">Views</p>
        </button>

        <div className="mx-2 block h-[50%] border border-gray-200" />

        <button
          className="flex h-full cursor-pointer items-center gap-1 space-x-1 rounded-[3px] px-1.5 hover:bg-[#0000000d]"
          onClick={() => {}}
        >
          <TableCellsIcon className="size-5 text-[#3283e0]" />
          <p className="text-sm font-medium">Grid view</p>
          <UserGroupIcon className="size-4" />
          <div>
            <ChevronDownIcon className="size-5" />
          </div>
        </button>
      </div>
    </div>
  );
 
};

export default Navbar;

"use client";

import React, { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import TabItem from "../Tab/TabItem"; 



export default function Tab() {
    const tabs = [
        { id: "table1", name: "Table 1" },
        { id: "table2", name: "Table 2" },
        { id: "table3", name: "Table 3" },
        { id: "table4", name: "Table 4" },
      ];
      const [activeTab, setActiveTab] = useState("table1");
      return (
        <div className="flex min-h-8 items-center justify-between bg-[#0b736c]">
          <div className="flex h-full items-center">
            <div
              className={`h-full w-[12px] ${tabs[0].id === activeTab ? "bg-white" : "bg-[#0b736c]"}`}
            >
              <div
                className={`h-full w-full ${tabs[0].id === activeTab ? "rounded-br-[3px] bg-[#0b736c]" : ""}`}
              />
            </div>
            {tabs.map((tab, index) => (
              <TabItem
                key={tab.id}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                id={tab.id}
                name={tab.name}
                index={index}
                tabsLength={tabs.length}
                indexSelected={tabs.findIndex((t) => t.id === activeTab)}
              />
            ))}
            <button
              className={`h-full  cursor-pointer ${tabs[tabs.length - 1].id === activeTab ? "bg-white" : "bg-[#0b736c]"}`}
              onClick={() => {}}
            >
              <div
                className={`flex h-full w-full items-center justify-center ${tabs[tabs.length - 1].id === activeTab ? "rounded-bl-[3px] bg-[#0b736c]" : ""}`}
              >
                <ChevronDownIcon className="mx-2 h-4 w-4 text-white"  />
                <div className="flex-1  h-[50%]  border-l border-white opacity-50 " />
              </div>
            </button>
          </div>
        </div>
      );
}

// "use client";

// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { Menu, Transition } from "@headlessui/react";
// import { Fragment } from "react";
// import { TableCellsIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";

// interface TabProps {
//   activeTab: string;
//   onTabChange: (tabId: string) => void;
// }

// export default function Tab({ activeTab, onTabChange }: TabProps) {
//   const tabs = [
//     { id: "table1", name: "Table 1" },
//     { id: "table2", name: "Table 2" },
//   ];

//   return (
//     <div className="flex items-center space-x-1 bg-teal-700 px-4 py-2">
//       {/* Left side tabs */}
//       <div className="flex items-center">
//         {tabs.map((tab) => (
//           <Menu as="div" key={tab.id} className="relative">
//             <Menu.Button
//               className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium ${
//                 activeTab === tab.id
//                   ? "bg-white text-teal-700"
//                   : "text-white hover:bg-teal-600"
//               }`}
//             >
//               {tab.name}
//               <ChevronDownIcon className="ml-1 h-4 w-4" />
//             </Menu.Button>
//             <Transition
//               as={Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items className="absolute left-0 z-10 mt-1 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                 <div className="py-1">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <button
//                         className={`${
//                           active ? "bg-gray-100" : ""
//                         } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
//                       >
//                         Rename
//                       </button>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <button
//                         className={`${
//                           active ? "bg-gray-100" : ""
//                         } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
//                       >
//                         Duplicate
//                       </button>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <button
//                         className={`${
//                           active ? "bg-gray-100" : ""
//                         } flex w-full items-center px-4 py-2 text-sm text-red-600`}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </Menu.Item>
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </Menu>
//         ))}

//         {/* Add or import button */}
//         <button className="ml-2 flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-600">
//           <span className="mr-1">+</span>
//           Add or import
//         </button>
//       </div>

//       {/* Right side actions */}
    //   <div className="ml-auto flex items-center space-x-2">
    //     {/* Views dropdown */}
    //     <Menu as="div" className="relative">
    //       <Menu.Button className="flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-600">
    //         <ViewColumnsIcon className="mr-2 h-4 w-4" />
    //         Views
    //         <ChevronDownIcon className="ml-1 h-4 w-4" />
    //       </Menu.Button>
    //       <Transition
    //         as={Fragment}
    //         enter="transition ease-out duration-100"
    //         enterFrom="transform opacity-0 scale-95"
    //         enterTo="transform opacity-100 scale-100"
    //         leave="transition ease-in duration-75"
    //         leaveFrom="transform opacity-100 scale-100"
    //         leaveTo="transform opacity-0 scale-95"
    //       >
    //         <Menu.Items className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //           <div className="py-1">
    //             <Menu.Item>
    //               {({ active }) => (
    //                 <button
    //                   className={`${
    //                     active ? "bg-gray-100" : ""
    //                   } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
    //                 >
    //                   <TableCellsIcon className="mr-2 h-4 w-4" />
    //                   Grid view
    //                 </button>
    //               )}
    //             </Menu.Item>
    //           </div>
    //         </Menu.Items>
    //       </Transition>
    //     </Menu>

    //     {/* Hidden field indicator */}
    //     <span className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-700">
    //       1 hidden field
    //     </span>

    //     {/* Other action buttons */}
    //     <button className="rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-600">
    //       Filter
    //     </button>
    //     <button className="rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-600">
    //       Group
    //     </button>
    //     <button className="rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-600">
    //       Sort
    //     </button>
    //     <button className="rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-600">
    //       Color
    //     </button>
    //   </div>
//     </div>
//   );
// }

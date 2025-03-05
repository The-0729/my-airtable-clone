import { Menu, Transition } from "@headlessui/react";
import {
  EyeSlashIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Switch } from "@headlessui/react";
import { TableInstance } from "~/app/types/table";
const HideField = ({ table }: { table: TableInstance }) => {
  return (
    <Popover className="h-full">
      <PopoverButton className="flex h-full cursor-pointer items-center gap-1 space-x-1 rounded-[3px] px-1.5 hover:bg-[#0000000d]">
        <EyeSlashIcon className="size-5" />
        {/* // tổng các field đã hide nếu lengh = 0 thì k hiện */}
        <p className="text-sm font-[400]">
          {table.getAllColumns().filter((col) => !col.getIsVisible()).length >
          0 && `${table.getAllColumns().filter((col) => !col.getIsVisible()).length} `} Hide fields
        </p>
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="min-w-[20rem] rounded-sm bg-white shadow-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div className="mx-4 mt-2 flex items-center justify-between border-b border-gray-200">
          <input
            placeholder="Find a field"
            className="flex-1 py-2 text-xs text-[#1d1f25] outline-none"
          />
          <QuestionMarkCircleIcon className="size-4 text-gray-500" />
        </div>
        <div className="flex flex-col items-center items-start gap-1 p-3">
          {table.getAllColumns().map((column) => {
            console.log(
              "🚀 ~ {table.getAllColumns ~ column:",
              column.getIsVisible(),
              column.id,
            );
            return (
              <div
                key={column.id}
                className="flex w-full cursor-pointer items-center gap-3 rounded-[3px] p-1.5 hover:bg-[#0000000d]"
                onClick={() => {
                  if (column.id === "select") return;
                  table.options.meta?.toggleColumnVisibility(column.id);
                }}
              >
                <Switch
                  checked={column.getIsVisible()}
                  className="group relative flex h-[13px] w-[20px] cursor-pointer items-center rounded-full bg-[gray] transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-[#048a0e] data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-[7px] translate-x-[2px] rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-[11px]"
                  />
                </Switch>
                <label className="text-[13px] leading-1 font-[400]">
                  {column.id}
                </label>
              </div>
            );
          })}
        </div>
        <div className="mx-2 mb-2 flex items-center gap-2">
          <button
            className="w-1/2 cursor-pointer rounded-[3px] bg-[#0000000d] p-1.5 py-3 text-[13px] leading-1 font-[400]"
            onClick={() => {
              table.getAllColumns().forEach((column) => {
                if (column.id === "select") return;
                if (column.getIsVisible()) {
                  table.options.meta?.toggleColumnVisibility(column.id);
                }
              });
            }}
          >
            Hide all
          </button>
          <button className="w-1/2 cursor-pointer rounded-[3px] bg-[#0000000d] p-1.5 py-3 text-[13px] leading-1 font-[400]" 
            onClick={() => {
              table.getAllColumns().forEach((column) => {
                if (column.id === "select") return;
                if (!column.getIsVisible()) {
                  table.options.meta?.toggleColumnVisibility(column.id);
                }
              });
            }}
          >
            Show all
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default HideField;

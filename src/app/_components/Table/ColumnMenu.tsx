import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";

import  { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
    PencilIcon,
    DocumentDuplicateIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    LinkIcon,
    InformationCircleIcon,
    LockClosedIcon,
    ArrowsUpDownIcon,
    TableCellsIcon,
    EyeSlashIcon,
    TrashIcon,
  } from "@heroicons/react/24/outline";
interface ColumnMenuProps {
  column: ColumnDef<any>;
  onRename: () => void;
  onDuplicate: () => void;
  onInsertLeft: () => void;
  onInsertRight: () => void;
  onDelete: () => void;
  onSort: (direction: "asc" | "desc") => void;
  onHide: () => void;
}

const ColumnMenu: React.FC<ColumnMenuProps> = ({
    column,
    onRename,
    onDuplicate,
    onInsertLeft,
    onInsertRight,
    onDelete,
    onSort,
    onHide,
  }) => {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="ring-opacity-5 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onRename}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <PencilIcon className="mr-3 h-4 w-4" />
                    Edit field
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onDuplicate}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <DocumentDuplicateIcon className="mr-3 h-4 w-4" />
                    Duplicate field
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onInsertLeft}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <ArrowLeftIcon className="mr-3 h-4 w-4" />
                    Insert left
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onInsertRight}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <ArrowRightIcon className="mr-3 h-4 w-4" />
                    Insert right
                  </button>
                )}
              </Menu.Item>
              <div className="border-t border-gray-200" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onSort("asc")}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <ArrowsUpDownIcon className="mr-3 h-4 w-4" />
                    Sort ascending
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onSort("desc")}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <ArrowsUpDownIcon className="mr-3 h-4 w-4" />
                    Sort descending
                  </button>
                )}
              </Menu.Item>
              <div className="border-t border-gray-200" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onHide}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <EyeSlashIcon className="mr-3 h-4 w-4" />
                    Hide field
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onDelete}
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-red-600`}
                  >
                    <TrashIcon className="mr-3 h-4 w-4" />
                    Delete field
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };
  export default ColumnMenu;
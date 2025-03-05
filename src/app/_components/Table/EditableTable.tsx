"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
  Table,
} from "@tanstack/react-table";
import { Person } from "~/utils/makeData";
import { FooterCell } from "./FooterCell";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
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
import { faker } from "@faker-js/faker";
import { ColumnType, ColumnTypeOption } from "~/app/types";
import { TableInstance } from "~/app/types/table";
import ColumnMenu from "./ColumnMenu";

interface EditableTableProps {
  table: TableInstance;
  setEditingHeader: (header: { id: string; value: string } | null) => void;
  editingHeader: { id: string; value: string } | null;
  handleHeaderEdit: (id: string, value: string) => void;
}

interface ColumnMenuProps {
  column: TableInstance['columns'][0];
  onRename: () => void;
  onDuplicate: () => void;
  onInsertLeft: () => void;
  onInsertRight: () => void;
  onDelete: () => void;
  onSort: (direction: "asc" | "desc") => void;
  onHide: () => void;
}

const columnTypes: ColumnTypeOption[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
];

const AddColumnMenu = ({
  onAddColumn,
}: {
  onAddColumn: (type: ColumnType) => void;
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-gray-500 focus:outline-none">
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
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
            {columnTypes.map((type) => (
              <Menu.Item key={type.value}>
                {({ active }) => (
                  <button
                    onClick={() => onAddColumn(type.value)}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } group flex w-full items-center px-4 py-2 text-sm`}
                  >
                    Add {type.label} Column
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const EditableTable: React.FC<EditableTableProps> = ({
  table,
  setEditingHeader,
  editingHeader,
  handleHeaderEdit,
}) => {
  const handleDuplicateColumn = (columnId: string) => {
    // Implement column duplication logic
    console.log('Duplicate column:', columnId);
  };

  const handleInsertLeft = (columnId: string) => {
    // Implement insert left logic
    console.log('Insert left of:', columnId);
  };

  const handleInsertRight = (columnId: string) => {
    // Implement insert right logic
    console.log('Insert right of:', columnId);
  };

  const handleDeleteColumn = (columnId: string) => {
    // Implement delete column logic
    console.log('Delete column:', columnId);
  };

  return (
    <div className="relative flex h-full">
      <div className="min-w-full overflow-hidden  border-gray-200 shadow-sm flex items-start">
        <table className="flex-1 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-r border-gray-200 text-left text-xs font-medium tracking-wider text-gray-500"
                  >
                    {editingHeader?.id === header.column.id ? (
                      <input
                        type="text"
                        value={editingHeader.value}
                        onChange={(e) =>
                          setEditingHeader({
                            ...editingHeader,
                            value: e.target.value,
                          })
                        }
                        onBlur={() =>
                          handleHeaderEdit(
                            header.column.id,
                            editingHeader.value,
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleHeaderEdit(
                              header.column.id,
                              editingHeader.value,
                            );
                          }
                        }}
                        autoFocus
                        className="w-full px-3 py-2 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center justify-between px-3 py-2">
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.id !== "select" && (
                              <ColumnMenu
                                column={header.column}
                                onRename={() => {
                                  setEditingHeader({
                                    id: header.column.id,
                                    value: header.column.columnDef.header as string,
                                  });
                                }}
                                onDuplicate={() => handleDuplicateColumn(header.column.id)}
                                onInsertLeft={() => handleInsertLeft(header.column.id)}
                                onInsertRight={() => handleInsertRight(header.column.id)}
                                onDelete={() => handleDeleteColumn(header.column.id)}
                                onSort={(direction) =>
                                  header.column.toggleSorting(direction === "desc")
                                }
                                onHide={() => {
                                  if (header.column.id !== "select") {
                                    table.options.meta?.toggleColumnVisibility(header.column.id);
                                  }
                                }}
                              />
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-r border-gray-200">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={table.getAllColumns().length} className="px-6 py-3">
                <button
                  onClick={() => table.options.meta?.addRow()}
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Row
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-center w-[94px] mx-auto h-[40px] border-b border-gray-200  text-xs font-medium tracking-wider text-gray-500 flex items-center justify-center bg-gray-50">
          <AddColumnMenu onAddColumn={table.options.meta?.addColumn} />
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
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
interface EditableTableProps {
  columns: ColumnDef<Person>[];
  data: Person[];
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
}

type MyTableMeta = {
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

const defaultColumn: Partial<ColumnDef<Person, unknown>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = React.useState(initialValue);

    const onBlur = () => {
      (table.options.meta as MyTableMeta)?.updateData(index, id, value);
    };

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        className="w-full px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
    );
  },
};

const ColumnMenu = ({
  column,
  onRename,
  onDuplicate,
  onInsertLeft,
  onInsertRight,
  onDelete,
  onSort,
  onHide,
}: {
  column: any;
  onRename: () => void;
  onDuplicate: () => void;
  onInsertLeft: () => void;
  onInsertRight: () => void;
  onDelete: () => void;
  onSort: (direction: "asc" | "desc") => void;
  onHide: () => void;
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

type ColumnType = "text" | "number";

interface ColumnTypeOption {
  label: string;
  value: ColumnType;
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
      <Menu.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
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
  columns: initialColumns,
  data: initialData,
  updateData,
}) => {
  const [data, setData] = useState<Person[]>(initialData);
  const [columns, setColumns] = useState<ColumnDef<Person>[]>(initialColumns);
  const [editingHeader, setEditingHeader] = useState<{
    id: string;
    value: string;
  } | null>(null);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const handleHeaderEdit = (headerId: string, newValue: string) => {
    setColumns((oldColumns) =>
      oldColumns.map((col) =>
        col.accessorKey === headerId ? { ...col, header: newValue } : col,
      ),
    );
    setEditingHeader(null);
  };

  // const addColumn = (type: ColumnType) => {
  //   const newColumnId = `newColumn${columns.length}`;

  //   const newColumn: ColumnDef<Person> = {
  //     accessorKey: newColumnId,
  //     header: `New Column`,
  //     cell: ({ getValue, row: { index }, column: { id }, table }) => {
  //       const initialValue = getValue();
  //       const [value, setValue] = React.useState(initialValue);

  //       const onBlur = () => {
  //         (table.options.meta as MyTableMeta)?.updateData(index, id, value);
  //       };

  //       return (
  //         <input
  //           type={type}
  //           value={value as string}
  //           onChange={(e) =>
  //             setValue(
  //               type === "number" ? Number(e.target.value) : e.target.value,
  //             )
  //           }
  //           onBlur={onBlur}
  //           className="w-full px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  //         />
  //       );
  //     },
  //   };

  //   setColumns((oldColumns) => [...oldColumns, newColumn]);
  //   setData((oldData) =>
  //     oldData.map((row) => ({
  //       ...row,
  //       [newColumnId]: type === "number" ? 0 : "",
  //     })),
  //   );
  // };

  const checkboxColumn: ColumnDef<Person> = {
    id: "select",
    header: ({ table }) => (
      <div className="">
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-3 py-2">
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
    ),
    size: 40,
  };

  const allColumns = [checkboxColumn, ...columns];

  const table = useReactTable({
    data,
    columns: allColumns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(), // chưa dùng pagination
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row,
          ),
        );
      },
      addRow: () => {
        const newRow = Object.fromEntries(
          columns.map((col) => {
            console.log("🚀 ~ col:", col)
            return  [col.accessorKey,
                col.meta?.type === "number"
                	? faker.number.int(1000)
                  : faker.person.firstName(),
              ]
          }),
        ) as Person;
        console.log("🚀 ~ newRow:", newRow);
        setData((old) => [...old, newRow]);
      },
      addColumn: (type: ColumnType) => {
        console.log("🚀 ~ type:", type)
        const newColumnId = `newColumn${columns.length}`;
        const newColumn: ColumnDef<Person> = {
          accessorKey: newColumnId,
          header: `New Column`,
          meta: { type },
          cell: ({ getValue, row: { index }, column: { id }, table }) => {
            const initialValue = getValue();
            const [value, setValue] = React.useState(initialValue);

            const onBlur = () => {
              (table.options.meta as MyTableMeta)?.updateData(index, id, value);
            };

            return (
              <input
                type={type}
                value={value as string}
                onChange={(e) =>
                  setValue(
                    type === "number" ? Number(e.target.value) : e.target.value,
                  )
                }
                onBlur={onBlur}
                className="w-full px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            );
          },
        };

        setColumns((oldColumns) => [...oldColumns, newColumn]);
        setData((oldData) =>
          oldData.map((row) => ({
            ...row,
            [newColumnId]:
              type === "number"
                ? faker.number.int(1000)
                : faker.person.firstName(),
          })),
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="relative flex h-full">
      <div className="min-w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th colSpan={table.getAllColumns().length} className="px-6 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">
                    Table Data
                  </h2>
                  <AddColumnMenu onAddColumn={table.options.meta?.addColumn} />
                </div>
              </th>
            </tr>
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
                                    value: header.column.columnDef
                                      .header as string,
                                  });
                                }}
                                onDuplicate={() => {}}
                                onInsertRight={() => {}}
                                onDelete={() => {}}
                                onSort={(direction) =>
                                  header.column.toggleSorting(
                                    direction === "desc",
                                  )
                                }
                                onHide={() => {}}
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
      </div>
    </div>
  );
};

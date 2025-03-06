"use client";

import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";
import { EditableTable } from "../Table/EditableTable";
import { makeData, Person } from "~/utils/makeData";
import ViewBar from "./ViewBar";
import { tableColumns } from "~/config/tableConfig";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Person } from "~/utils/makeData";
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
import { useSkipper } from "~/app/hook/useSkipper";
import { ColumnMeta, ColumnType, MyTableMeta } from "~/app/types/table";

export default function ViewContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);
  const [data, setData] = React.useState(makeData(2));
  const [columns, setColumns] = useState<ColumnDef<Person>[]>(tableColumns);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row,
      ),
    );
  };
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
            console.log("🚀 ~ col:", col);
            return [
              col.accessorKey as string,
              col.meta?.type === "number"
                ? faker.number.int(1000)
                : faker.person.firstName(),
            ];
          }),
        ) as Person;
        console.log("🚀 ~ newRow:", newRow);
        setData((old) => [...old, newRow]);
      },
      addColumn: (type: ColumnType) => {
        console.log("🚀 ~ type:", type);
        const newColumnId = `newColumn${columns.length}`;
        const newColumn: ColumnDef<Person> = {
          accessorKey: newColumnId,
          header: `New Column`,
          meta: { type } as ColumnMeta,
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
      toggleColumnVisibility: (columnId: string) => {
        const column = table.getColumn(columnId);
        console.log("🚀 ~ ViewContainer ~ column:", column)
        if (column) {
          column.toggleVisibility();
        }
      },
    } as MyTableMeta,
    debugTable: true,
  });
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onToggleColumnVisibility={() =>
          setShowColumnVisibility(!showColumnVisibility)
        }
        table={table}
      />
      <div className="flex h-full flex-1 overflow-hidden bg-white">
        {isOpen && <ViewBar />}
        <div className="flex max-h-[800px] w-full flex-col overflow-auto">
          <div className="min-w-max flex-1 overflow-auto">
            <EditableTable
              table={table}
              setEditingHeader={setEditingHeader}
              editingHeader={editingHeader}
              handleHeaderEdit={handleHeaderEdit}
          
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: function DefaultCell({
    getValue,
    row: { index },
    column: { id },
    table,
  }) {
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

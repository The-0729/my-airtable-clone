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
      // Explicitly cast table.options.meta as MyTableMeta to avoid TS error
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
      />
    );
  },
};

export const EditableTable: React.FC<EditableTableProps> = ({
  columns: initialColumns,
  data: initialData,
  updateData,
}) => {
  const [data, setData] = useState<Person[]>(initialData);
  const [columns, setColumns] = useState<ColumnDef<Person>[]>(initialColumns);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const addColumn = () => {
    const newColumnId = `newColumn${columns.length}`;

    const newColumn: ColumnDef<Person> = {
      accessorKey: newColumnId,
      header: `Column ${columns.length + 1}`,
      cell: ({ row }) => (
        <input
          value={(row.original as any)[newColumnId] || ""}
          onChange={(e) => {
            const value = e.target.value;
            setData((oldData) =>
              oldData.map((row, index) =>
                index === row.index ? { ...row, [newColumnId]: value } : row,
              ),
            );
          }}
        />
      ),
    };

    setColumns((oldColumns) => [...oldColumns, newColumn]);

    // Add default values for new column in each row
    setData((oldData) =>
      oldData.map((row) => ({
        ...row,
        [newColumnId]: "", // Default value for the new column
      })),
    );
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
        const newRow: Person = {
          firstName: "New",
          lastName: "User",
          age: 0,
          visits: 0,
          progress: 0,
          status: "single",
        };
        setData((old) => [...old, newRow]); // ✅ Correct way to add a row
      },
    },
    debugTable: true,
  });

  return (
    <div className="p-4">
      <button
        onClick={addColumn}
        className="mb-2 rounded border bg-blue-500 px-3 py-1 text-white"
      >
        Add Column
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

"use client";

import React from "react";
import Navbar from "../NavBar/NavBar";
import { EditableTable } from "../Table/EditableTable";
import { makeData, Person } from "~/utils/makeData";
import { ColumnDef } from "@tanstack/react-table";
export default function ViewContainer() {

  const columns: ColumnDef<Person>[] = [
    { accessorKey: "firstName", header: "First Name", meta: { type: "text" } },
    { accessorKey: "lastName", header: "Last Name", meta: { type: "text" } },
    { accessorKey: "age", header: "Age", meta: { type: "number" } },
  ];

  const [data, setData] = React.useState(makeData(2));

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row,
      ),
    );
  };

  return (
    <div className="flex h-full overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-auto bg-white p-4">
        <div className="min-w-max flex flex-col h-full">
          <h1 className="mb-4 text-xl font-bold">Editable Table</h1>
          <div className="flex-1 overflow-auto">
            <EditableTable
              columns={columns}
              data={data}
              updateData={updateData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

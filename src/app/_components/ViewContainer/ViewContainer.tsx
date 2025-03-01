"use client";

import React from "react";
import Navbar from "../NavBar/NavBar";
import { EditableTable } from "../Table/EditableTable";
import { makeData, Person } from "~/utils/makeData";
import { ColumnDef } from "@tanstack/react-table";

export default function ViewContainer() {
  const columns: ColumnDef<Person>[] = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "age", header: "Age" },
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
    <div className="flex h-screen">
      <Navbar className="h-full" />
      <div className="flex flex-1 flex-col bg-white p-4 transition-all duration-300">
        <h1 className="mb-4 text-xl font-bold">Editable Table</h1>
        <EditableTable columns={columns} data={data} updateData={updateData} />
      </div>
    </div>
  );
}

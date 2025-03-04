"use client";

import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";
import { EditableTable } from "../Table/EditableTable";
import { makeData, Person } from "~/utils/makeData";
import { ColumnDef } from "@tanstack/react-table";
import ViewBar from "./ViewBar";
export default function ViewContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const columns: ColumnDef<Person>[] = [
    { accessorKey: "firstName", header: "First Name", meta: { type: "text" } },
    { accessorKey: "lastName", header: "Last Name", meta: { type: "text" } },
    { accessorKey: "age", header: "Age", meta: { type: "number" } },
    { accessorKey: "email", header: "Email", meta: { type: "email" } },
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
    <div className="flex flex-col h-full overflow-hidden">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 h-full flex  overflow-hidden bg-white">
        {isOpen && <ViewBar />}
        <div className="w-full flex flex-col max-h-[800px]  overflow-auto">
    
          <div className=" min-w-max  flex-1 overflow-auto">
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

import { ColumnDef } from "@tanstack/react-table";
import { Person } from "~/utils/makeData";

export const tableColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
    meta: { type: "text" },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    meta: { type: "text" },
  },
  {
    accessorKey: "age",
    header: "Age",
    meta: { type: "number" },
  },
];

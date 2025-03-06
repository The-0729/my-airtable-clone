import { Table } from "@tanstack/react-table";
import { Person } from "~/utils/makeData";

export interface MyTableMeta {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  addRow: () => void;
  addColumn: (type: ColumnType) => void;
  toggleColumnVisibility: (columnId: string) => void;
}

export type ColumnType = "text" | "number";

export interface ColumnTypeOption {
  label: string;
  value: ColumnType;
}

export interface ColumnMeta {
  type: ColumnType;
}

export interface TableInstance extends Table<Person> {
  options: {
    meta: MyTableMeta;
  };
}

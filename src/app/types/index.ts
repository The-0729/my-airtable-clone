export type MyTableMeta = {
  updateData: (rowIndex: number, columnId: string, value: any) => void;
  addRow: () => void;
  addColumn: (type: ColumnType) => void;
  toggleColumnVisibility: (columnId: string) => void;
};

export interface ColumnMeta {
  type: ColumnType;
}
export type ColumnType = "text" | "number";

export interface ColumnTypeOption {
  label: string;
  value: ColumnType;
}

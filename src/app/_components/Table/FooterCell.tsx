import { Table } from "@tanstack/react-table";
import { Person } from "~/utils/makeData";

// Define the Table Meta type to include addRow
type MyTableMeta = {
  addRow: () => void;
};

// Explicitly type the table prop
export const FooterCell = ({
  table,
}: {
  table: Table<Person> & { options: { meta?: any } };
}) => {
  const meta = table.options.meta;
  return (
    <div className="footer-buttons">
      <button className="add-button" onClick={meta?.addRow}>
        Add New +
      </button>
    </div>
  );
};

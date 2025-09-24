import Papa from "papaparse";
import type { Book } from "../types";

type ToolbarProps = {
  data: Book[];
  filename?: string;
};

export default function Toolbar({ data, filename = "books.csv" }: ToolbarProps) {
  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-4 my-4 justify-start">
      <button
        type="button"
        onClick={handleDownload}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition-colors duration-200"
      >
        Download CSV
      </button>
    </div>
  );
}


import type { ColumnDef } from "@tanstack/react-table";
import UploadCSV from "./components/UploadCSV";
import Toolbar from "./components/Toolbar";
import DataTable from "./components/DataTable";
import type { Book } from "./types";
import { useBooks } from "./hooks/useBooks";

export default function Home() {
  const { books, original, loading, handleUpload, handleEdit, handleReset } = useBooks();

  const columns: ColumnDef<Book>[] = [
    { accessorKey: "Title", header: "Title" },
    { accessorKey: "Author", header: "Author" },
    { accessorKey: "Genre", header: "Genre" },
    { accessorKey: "PublishedYear", header: "Year" },
    { accessorKey: "ISBN", header: "ISBN" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 flex items-center gap-2">
          📚 Book CSV App
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Upload, edit, and export your book data easily.
        </p>
      </header>

      {/* Upload Section */}
      <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload / Download CSV</h2>
        <UploadCSV onUpload={handleUpload} />
        <Toolbar data={books} filename="books.csv" />
      </section>

      {/* Data Table Section */}
      <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Books List</h2>
        <DataTable
          columns={columns}
          data={books}
          originalData={original}
          onEdit={handleEdit}
          loading={loading}
          onReset={handleReset}
        />
      </section>
    </div>
  );
}

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import type { Book } from "../types";

type DataTableProps = {
  columns: ColumnDef<Book, any>[];
  data: Book[];
  originalData: Book[]; // ✅ original copy for reset/compare
  onEdit?: (rowIndex: number, key: keyof Book, value: any) => void;
  onReset?: () => void; // ✅ reset callback
  loading?: boolean; // ✅ show spinner if CSV is parsing
};

export default function DataTable({
  columns,
  data,
  originalData,
  onEdit,
  onReset,
  loading,
}: DataTableProps) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
        <span className="ml-3 text-blue-600">Loading CSV...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <input
          placeholder="🔍 Search books..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border rounded-lg p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Reset button */}
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Reset All Edits
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow-md">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 border-b cursor-pointer select-none text-left"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" && " 🔼"}
                      {header.column.getIsSorted() === "desc" && " 🔽"}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition`}
              >
                {row.getVisibleCells().map((cell) => {
                  const colId = cell.column.id as keyof Book;
                  const currentValue = cell.getValue() as string;
                  const originalValue = originalData[row.index]?.[colId];

                  const isModified =
                    currentValue !== undefined &&
                    originalValue !== undefined &&
                    currentValue !== originalValue;

                  return (
                    <td
                      key={cell.id}
                      className={`px-3 py-2 border-b ${
                        isModified ? "bg-yellow-100" : ""
                      }`}
                    >
                      <input
                        value={currentValue}
                        onChange={(e) =>
                          onEdit?.(row.index, colId, e.target.value)
                        }
                        className="w-full bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⏮ First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next ▶
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Last ⏭
          </button>
        </div>

        {/* Row info */}
        <div className="text-sm text-gray-600">
          Showing{" "}
          <strong>
            {table.getRowModel().rows.length}
          </strong>{" "}
          of <strong>{data.length}</strong> rows | Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </div>

        {/* Page size selector */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border rounded p-1"
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

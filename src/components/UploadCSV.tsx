import type { Book } from "../types";

type UploadCSVProps = {
  onUpload: (data: Book[]) => void;
};

export default function UploadCSV({ onUpload }: UploadCSVProps) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const rows = text
      .trim()
      .split("\n")
      .map((row) => row.split(",").map((cell) => cell.trim()));

    const [headers, ...values] = rows;

    const data: Book[] = values.map((row) =>
      Object.fromEntries(row.map((cell, i) => [headers[i], cell]))
    ) as Book[];

    onUpload(data);
  };

  return (
    <div className="mb-6 flex flex-col items-start">
      <label
        htmlFor="csv-upload"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Upload CSV File
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
      />
      <p className="mt-2 text-xs text-gray-500">
        Only CSV files are supported. Make sure headers match the required
        fields.
      </p>
    </div>
  );
}

import Papa from 'papaparse';
import type { Book } from '../types';

export function parseCSVFile(file: File): Promise<Book[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Book>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // ensure keys exist
        resolve(result.data.map((row) => ({
          Title: row.Title ?? '',
          Author: row.Author ?? '',
          Genre: row.Genre ?? '',
          PublishedYear: row.PublishedYear ?? '',
          ISBN: row.ISBN ?? ''
        })));
      },
      error: (err) => reject(err),
    });
  });
}

export function downloadCSV(data: Book[], filename = 'books-edited.csv') {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

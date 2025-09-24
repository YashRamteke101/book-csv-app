import { useState } from "react";
import type { Book } from "../types";
import { generateFakeBooks } from "../utils/generateBooks";

export function useBooks(initialCount = 5000) {
  const [books, setBooks] = useState<Book[]>(generateFakeBooks(initialCount));
  const [original, setOriginal] = useState<Book[]>(books);
  const [loading, setLoading] = useState(false);

  const handleUpload = (data: Book[]) => {
    setLoading(true);
    setTimeout(() => {
      setBooks(data);
      setOriginal(data);
      setLoading(false);
    }, 1000); // simulate async upload
  };

  const handleEdit = (rowIndex: number, key: keyof Book, value: any) => {
    setBooks((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row))
    );
  };

  const handleReset = () => {
    setBooks(original);
  };

  return {
    books,
    original,
    loading,
    handleUpload,
    handleEdit,
    handleReset
  };
}

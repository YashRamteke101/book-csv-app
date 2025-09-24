# 📚 Book CSV App

A lightweight React application to **upload, edit, and download CSV files** of books. Built with **Vite**, **React 19**, **TypeScript**, **TailwindCSS**, and **TanStack Table**. Supports large datasets, inline editing, CSV export, and reset functionality.  

---

## **Features**

- Upload CSV files containing book data  
- Inline edit table data directly in the browser  
- Highlight modified cells for clarity  
- Reset all edits to original CSV data  
- Download updated CSV easily  
- Global search and sortable columns  
- Pagination with customizable page size  
- Responsive design for desktop and mobile  

---

## **Demo Screenshot**

<img width="1560" height="908" alt="image" src="https://github.com/user-attachments/assets/4b461c59-23df-49f6-a9a1-d99d9a8a2f2c" />
  

---

## Dependencies

This project uses the following libraries and tools:

- **React 19** – Frontend library for building UI  
- **Vite** – Development server and build tool  
- **TypeScript** – Static typing for safer code  
- **TailwindCSS** – Utility-first CSS framework for styling  
- **@tanstack/react-table** – Table rendering, sorting, filtering, and pagination  
- **Papaparse** – CSV parsing and generation  
- **Lodash & match-sorter** – Efficient sorting and filtering utilities  
- **@faker-js/faker** – Generate fake book data for testing  

---

## Usage Instructions

1. **Upload CSV** – Click **Upload CSV File** and select a CSV file. Required headers:  
   `Title, Author, Genre, PublishedYear, ISBN`.  
2. **Edit Inline** – Modify any table cell directly. Edited cells are highlighted.  
3. **Reset** – Click **Reset All Edits** to restore the original CSV data.  
4. **Download** – Click **Download CSV** to save the updated data.  
5. **Search** – Use the search bar to filter books globally.  
6. **Sort** – Click column headers to sort ascending/descending.  
7. **Pagination** – Use the pagination controls at the bottom to navigate pages and adjust page size.  

---

## **Installation**

Clone the repository:

```bash
git clone https://github.com/your-username/book-csv-app.git
cd book-csv-app

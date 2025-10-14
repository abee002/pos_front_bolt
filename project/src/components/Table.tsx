import React from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading,
  searchTerm,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pos-card">
      {/* Search */}
      <div className="p-6 border-b">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pos-medium" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-pos-dark-border rounded-lg focus:ring-2 focus:ring-pos-green focus:border-transparent w-full bg-white dark:bg-pos-dark-card dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-pos-dark-border">
          <thead className="bg-pos-light dark:bg-pos-dark-card">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-pos-medium dark:text-gray-400 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-pos-dark-card divide-y divide-gray-200 dark:divide-pos-dark-border">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pos-green"></div>
                    <span className="ml-2 text-pos-medium dark:text-gray-400">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-pos-medium dark:text-gray-400">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-pos-light dark:hover:bg-pos-dark-bg">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-pos-dark dark:text-white">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 border-t border-gray-200 dark:border-pos-dark-border flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 dark:border-pos-dark-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pos-light dark:hover:bg-pos-dark-bg dark:text-white"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 dark:border-pos-dark-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pos-light dark:hover:bg-pos-dark-bg dark:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
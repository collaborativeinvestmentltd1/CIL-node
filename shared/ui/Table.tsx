/**
 * Table component
 * Reusable data table component for the ecosystem
 */

import React from 'react';
import clsx from 'clsx';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  rowKey: keyof T;
  selectable?: boolean;
  selectedRows?: Set<any>;
  onSelectRow?: (row: T, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  isEmpty = false,
  emptyMessage = 'No data found',
  onRowClick,
  rowKey,
  selectable = false,
  selectedRows = new Set(),
  onSelectRow,
  onSelectAll,
}: TableProps<T>) {
  const isAllSelected = data.length > 0 && data.every((row) => selectedRows.has(row[rowKey]));

  const handleSelectAll = () => {
    onSelectAll?.(!isAllSelected);
  };

  const handleSelectRow = (row: T) => {
    onSelectRow?.(row, !selectedRows.has(row[rowKey]));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin text-accent-600">
          <svg className="h-8 w-8" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="2" />
          </svg>
        </div>
      </div>
    );
  }

  if (isEmpty || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-slate-200 bg-slate-50">
            {selectable && (
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded accent-accent-600"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={clsx(
                  'px-4 py-3 font-semibold text-slate-900',
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center'
                )}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={String(row[rowKey])}
              className={clsx(
                'border-b border-slate-200 hover:bg-slate-50 transition-colors',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {selectable && (
                <td className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row[rowKey])}
                    onChange={() => handleSelectRow(row)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 rounded accent-accent-600"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={clsx(
                    'px-4 py-3 text-slate-700',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center'
                  )}
                >
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

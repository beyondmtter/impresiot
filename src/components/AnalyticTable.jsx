"use client";

import * as React from "react";
import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define columns
const columns = [
  {
    accessorKey: "name", // Matches the "name" key in your data
    header: "Name",
  },
  {
    accessorKey: "category", // Matches the "category" key in your data
    header: "Category",
  },
  {
    accessorKey: "viewCount", // Matches the "viewCount" key in your data
    header: "View Count",
  },
  {
    accessorKey: "revenue", // Matches the "revenue" key in your data
    header: "Revenue (₹)",
  },
];


const AnalyticTable = ({ tableData }) => {
 
  const table = useReactTable({
    data: tableData, 
    columns, 
    getCoreRowModel: getCoreRowModel(), 
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          {/* Render Table Header */}
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          
          {/* Render Table Body */}
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AnalyticTable;
"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReportType, Result } from "@/lib/types";

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },

  {
    accessorKey: "time",
    header: () => <div className="text-center">Invested Time</div>,
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("time")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original;
      

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const response = await fetch("/api/report", {
                    method: "DELETE",
                    body: JSON.stringify({ reportID: report.id }),
                    headers: {
                      "content-type": "application/json",
                    },
                  });

                  const result: Result = await response.json();
                  result.success ? location.reload() : alert(result.message+"\nTry another time!");
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Delete Report
              <p className="mix-blend-screen opacity-50">[Beta]</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Edit Report
              <p className="mix-blend-screen opacity-50">[Comming soon]</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              View Report
              <p className="mix-blend-screen opacity-50">[Comming soon]</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

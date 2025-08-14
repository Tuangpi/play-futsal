import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Link } from "react-router";
import { DataTable } from "@/components/ui/DataTable";

type Court = {
  id: number;
  name: string;
  location: string;
  rate: number;
  status: "Open" | "Closed";
};

const MyCourts = () => {
  const courts: Court[] = [
    {
      id: 1,
      name: "Downtown Futsal Arena",
      location: "Yangon",
      rate: 30,
      status: "Open",
    },
    {
      id: 2,
      name: "Northside Sports Complex",
      location: "Mandalay",
      rate: 25,
      status: "Closed",
    },
  ];

  // Define table columns
  const columns = useMemo<ColumnDef<Court>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Rate (per hour)",
        accessorKey: "rate",
        cell: (info) => `$${info.getValue<number>()}`,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          return (
            <span
              className={
                row.original.status === "Open"
                  ? "text-primary font-semibold"
                  : "text-secondary font-semibold"
              }
            >
              {row.original.status}
            </span>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const court = row.original;
          return (
            <div className="space-x-2">
              <Link
                to={`/owner/my-courts/${court.id}/edit`}
                className="text-sky-400 hover:underline"
              >
                Edit
              </Link>
              <Link
                to={`/owner/my-courts/${court.id}/bookings`}
                className="text-yellow-400 hover:underline"
              >
                View Bookings
              </Link>
              <button className="text-red-400 hover:underline">Delete</button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: courts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courts</h1>
        <Link
          to="/owner/my-courts/add"
          className="bg-sky-500 px-4 py-2 rounded hover:bg-sky-600"
        >
          + Add Court
        </Link>
      </div>
      <DataTable table={table} />
    </div>
  );
};

export default MyCourts;

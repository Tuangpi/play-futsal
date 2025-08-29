import { useMemo } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Link } from "react-router";
import { DataTable } from "@/components/ui/DataTable";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Competition } from "@/types/competitions";

const getData = async () => {
  const response = await api.get("/competitions");
  return response.data;
};

const Competitions = () => {
  const { data, isLoading, isError, error } = useQuery<{ data: Competition[] }>(
    {
      queryKey: ["get-competitions"],
      queryFn: getData,
    }
  );

  const columns = useMemo<ColumnDef<Competition>[]>(
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
      // {
      //   header: "Rate (per hour)",
      //   accessorKey: "rate",
      //   cell: (info) => `$${info.getValue<number>()}`,
      // },
      // {
      //   header: "Status",
      //   accessorKey: "status",
      //   cell: ({ row }) => {
      //     return (
      //       <span
      //         className={
      //           row.original.status === "Open"
      //             ? "text-primary font-semibold"
      //             : "text-secondary font-semibold"
      //         }
      //       >
      //         {row.original.status}
      //       </span>
      //     );
      //   },
      // },
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
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courts</h1>
        <Link
          to="/host/competitions/add"
          className="bg-sky-500 px-4 py-2 rounded hover:bg-sky-600"
        >
          + Add Competition
        </Link>
      </div>
      <DataTable table={table} />
    </div>
  );
};

export default Competitions;

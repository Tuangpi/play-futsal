import api from "@/lib/axios";
import type { Status } from "@/types/status";
import { useQuery } from "@tanstack/react-query";
import type { UseFormRegister } from "react-hook-form";

const getBookingStatus = async () => {
  const response = await api.get("/booking-status");
  return response.data;
};

type Props = {
  register: UseFormRegister<any>;
  name: string;
};

const CompetitionTypeDropDown = ({ register, name }: Props) => {
  const { data, isLoading, isError } = useQuery<{ data: Status[] }>({
    queryKey: ["booking-status"],
    queryFn: getBookingStatus,
  });

  if (isLoading) {
    return (
      <select className="border p-2 w-full bg-bg" disabled>
        <option>Loading...</option>
      </select>
    );
  }

  if (isError) {
    return (
      <select className="border p-2 w-full bg-bg" disabled>
        <option>Error loading data</option>
      </select>
    );
  }

  return (
    <select {...register(name)} className="border p-2 w-full bg-bg">
      <option value="">Select competition type...</option>
      {data?.data.map((status) => (
        <option key={status.id} value={status.id}>
          {status.name.charAt(0).toUpperCase() +
            status.name.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
};

export default CompetitionTypeDropDown;

import api from "@/lib/axios";
import type { Status } from "@/types/status";
import { useQuery } from "@tanstack/react-query";
import type { UseFormRegister } from "react-hook-form";

const getCompetitionStatus = async () => {
  const response = await api.get("/competition-status");
  return response.data;
};

type Props = {
  register: UseFormRegister<any>;
  name: string;
};

const CompetitionStatusDropDown = ({ register, name }: Props) => {
  const { data, isLoading, isError } = useQuery<{ data: Status[] }>({
    queryKey: ["competition-status"],
    queryFn: getCompetitionStatus,
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
      <option value="">Select competition status...</option>
      {data?.data.map((status) => (
        <option key={status.id} value={status.id}>
          {status.name.charAt(0).toUpperCase() +
            status.name.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
};

export default CompetitionStatusDropDown;

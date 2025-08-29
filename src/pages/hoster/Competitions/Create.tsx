import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { handleApiError, type apiResponse } from "@/types/apiResponse";
import { createCompetitionSchema } from "@/schema/competitionSchema";
import type z from "zod";
import api from "@/lib/axios";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CompetitionTypeDropDown from "@/components/CompetitionTypeDropDown";
import CompetitionStatusDropDown from "@/components/CompetitionStatusDropDown";

type FormData = z.infer<typeof createCompetitionSchema>;

const createCompetition = async (data: FormData) => {
  const response = await api.post("/competitions/add", data);
  return response.data;
};

const Create = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createCompetition,
    onSuccess: () => {
      navigate("/host/competitions");
    },
    onError: (error: apiResponse) => {
      handleApiError(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createCompetitionSchema),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen">
      <h2 className="text-xl font-bold mb-4">Create Competition</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <Input {...register("name")} placeholder="Competition Name" />
          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block">Type</label>
          <CompetitionTypeDropDown register={register} name="type" />
          {errors.type && <p className="text-error">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block">Status</label>
          <CompetitionStatusDropDown register={register} name="status" />
          {errors.status && (
            <p className="text-error">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block">Start Date</label>
          <Input type="date" {...register("startDate")} />
          {errors.startDate && (
            <p className="text-error">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block">End Date</label>
          <Input type="date" {...register("endDate")} />
          {errors.endDate && (
            <p className="text-error">{errors.endDate.message}</p>
          )}
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Competition"}
        </Button>
      </form>
    </div>
  );
};

export default Create;

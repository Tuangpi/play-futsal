import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { handleApiError, type apiResponse } from "@/types/apiResponse";
import type z from "zod";
import api from "@/lib/axios";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createTeamSchema } from "@/schema/teamSchema";
import { useState } from "react";

type FormData = z.infer<typeof createTeamSchema>;

interface imageWithFormData extends FormData {
  image: File | null;
}

const createTeam = async (data: imageWithFormData) => {
  const formData = new FormData();
  formData.append("name", data.name);

  if (data.image) {
    formData.append("image", data.image);
  }
  const response = await api.post("/teams/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const CreateTeam = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<FileList | null>(null);

  const mutation = useMutation({
    mutationFn: createTeam,
    onSuccess: (data) => {
      navigate(`/player/my-team/${data.data.id}`);
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
    resolver: zodResolver(createTeamSchema),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, image: image ? image[0] : null });
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
          <label className="block mb-1">Court Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files)}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-teal-500 file:text-white hover:file:bg-teal-600"
          />

          {image && image[0] instanceof File && (
            <img
              src={URL.createObjectURL(image[0])}
              alt="Preview"
              className="mt-3 h-32 object-cover rounded"
            />
          )}
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Team"}
        </Button>
      </form>
    </div>
  );
};

export default CreateTeam;

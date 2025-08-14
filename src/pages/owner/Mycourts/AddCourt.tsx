import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { useNavigate } from "react-router";
import { handleApiError, type apiResponse } from "@/types/apiResponse";
import Input from "@/components/ui/Input";
import { courtSchema } from "@/schema/courtSchema";
import Button from "@/components/ui/Button";
import { useState } from "react";

type FormData = z.infer<typeof courtSchema>;
interface imageWithFormData extends FormData {
  image: File | null;
}

const createCourt = async (data: imageWithFormData) => {
  const formData = new FormData();
  formData.append("courtName", data.courtName);
  formData.append("location", data.location);
  formData.append("hourlyRate", String(data.hourlyRate));

  if (data.image) {
    formData.append("image", data.image);
  }
  const response = await api.post("/courts/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const AddCourt = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<FileList | null>(null);

  const mutation = useMutation({
    mutationFn: createCourt,
    onSuccess: () => {
      navigate("/owner/my-courts");
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
    resolver: zodResolver(courtSchema),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, image: image ? image[0] : null });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Court</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Court Name</label>
          <Input type="text" {...register("courtName")} />
          {errors.courtName && (
            <p className="text-shadow-warning text-sm">
              {errors.courtName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <Input type="text" {...register("location")} />
          {errors.location && (
            <p className="text-red-400 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Hourly Rate ($)</label>
          <Input
            type="number"
            step="0.01"
            {...register("hourlyRate", { valueAsNumber: true })}
          />
          {errors.hourlyRate && (
            <p className="text-red-400 text-sm">{errors.hourlyRate.message}</p>
          )}
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
          {mutation.isPending ? "Saving..." : "Save Court"}
        </Button>
      </form>
    </div>
  );
};

export default AddCourt;

import { Home, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { registerUserSchema } from "@/schema/authSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { USER_ROLE } from "@/constants/Users";
import { toast } from "react-toastify";
import { handleApiError, type apiResponse } from "@/types/apiResponse";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type FormData = z.infer<typeof registerUserSchema>;

const createData = async (data: FormData) => {
  const response = await api.post("/register", data);
  return response.data;
};

const SignUp = () => {
  const [role, setRole] = useState<USER_ROLE>("PLAYER");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const roleOptions: {
    label: string;
    value: USER_ROLE;
    icon: React.ReactNode;
  }[] = [
    { label: "Player", value: "PLAYER", icon: <User size={20} /> },
    {
      label: "Competition Host",
      value: "HOST",
      icon: <ShieldCheck size={20} />,
    },
    { label: "Court Owner", value: "OWNER", icon: <Home size={20} /> },
  ];

  const mutation = useMutation({
    mutationFn: createData,
    onSuccess: (data: apiResponse) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error: apiResponse) => {
      handleApiError(error);
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: { role: "PLAYER" },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    register("role");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-muted text-text px-4 py-8">
      <div className="w-full max-w-md bg-bg p-8 rounded-2xl shadow-xl border border-primary">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {t("signup.title")}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            type="text"
            placeholder={t("signup.email")}
            className="mb-3"
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
          <Input
            {...register("password")}
            type="password"
            placeholder={t("signup.password")}
            className="mb-3"
          />
          {errors.password && (
            <p className="text-error">{errors.password?.message}</p>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">I'm a:</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roleOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => {
                    setRole(option.value);
                    setValue("role", option.value);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 p-3 rounded-lg border transition ${
                    role === option.value
                      ? "bg-green-600 text-white border-green-700"
                      : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          {errors.role && <p className="text-error">{errors.role.message}</p>}
          <input type="hidden" {...register("role")} />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className={`${
              mutation.isPending
                ? "opacity-50 cursor-not-allowed bg-green-700"
                : ""
            }`}
          >
            {t("signup.register")}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

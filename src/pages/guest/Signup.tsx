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
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4 py-8">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {t("signup.title")}
        </h2>

        {/* Social Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-2 rounded-lg shadow">
            Sign up with Facebook
          </button>
          <button className="w-full bg-red-600 hover:bg-red-700 transition duration-200 py-2 rounded-lg shadow">
            Sign up with Google
          </button>
        </div>

        <div className="text-center text-gray-500 mb-6">or continue with</div>

        {/* Email/Password */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="text"
            placeholder={t("signup.email")}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder={t("signup.password")}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
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
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
          <input type="hidden" {...register("role")} />

          <button
            type="submit"
            disabled={mutation.isPending}
            className={`w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold text-white shadow-lg mt-2 cursor-pointer ${
              mutation.isPending
                ? "opacity-50 cursor-not-allowed bg-green-700"
                : ""
            }`}
          >
            {t("signup.register")}
          </button>
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

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { AuthUser } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { loginUserSchema } from "@/schema/authSchema";
import { handleApiError, type apiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type z from "zod";

type FormData = z.infer<typeof loginUserSchema>;

const createData = async (data: FormData) => {
  const response = await api.post("/login", data);
  return response.data;
};

const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: createData,
    onSuccess: (data) => {
      const decoded = jwtDecode<AuthUser & { exp: number }>(data.accessToken);
      setAccessToken(data.accessToken);
      navigate(`/${decoded.role.toLowerCase()}`);
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
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-muted text-text p-4">
      <div className="w-full max-w-md bg-bg p-6 rounded-xl shadow-md border-primary">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            type="text"
            placeholder="Email or Phone"
            className="mb-3"
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="mb-3"
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}

          <Button type="submit">Login</Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

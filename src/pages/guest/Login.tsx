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
      console.log(error);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Social Login */}
        <div className="mb-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded mb-2">
            Continue with Facebook
          </button>
          <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded">
            Continue with Google
          </button>
        </div>

        <div className="my-4 text-center text-gray-400">or</div>

        {/* Email/Phone Login */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="text"
            placeholder="Email or Phone"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
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

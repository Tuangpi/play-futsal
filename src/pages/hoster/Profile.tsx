import api from "@/lib/axios";
import { handleApiError, type apiResponse } from "@/types/apiResponse";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const createData = async () => {
  const response = await api.post("/logout");
  return response.data;
};

const Profile = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: apiResponse) => {
      handleApiError(error);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <div>
      <div>Profile</div>
      <button
        className="p-3 m-5 rounded-md px-5 cursor-pointer bg-red-500"
        onClick={handleLogout}
      >
        {mutation.isPending ? "logout..." : "logout"}
      </button>
    </div>
  );
};
export default Profile;

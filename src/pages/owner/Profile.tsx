import Button from "@/components/ui/Button";
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
    <div className="bg-white dark:bg-black">
      <div>Profile</div>
      <Button onClick={handleLogout}>
        {mutation.isPending ? "logout..." : "logout"}
      </Button>
    </div>
  );
};
export default Profile;

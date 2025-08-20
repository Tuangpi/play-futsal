import DarkModeToggle from "@/components/DarkModeToggle";
import I18nChange from "@/components/I18nChange";
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
    <div className="bg-bg min-h-screen">
      <div>Profile</div>
      <div className="flex gap-4 items-center">
        <I18nChange />
        <DarkModeToggle />
      </div>

      <Button onClick={handleLogout}>
        {mutation.isPending ? "logout..." : "logout"}
      </Button>
    </div>
  );
};
export default Profile;

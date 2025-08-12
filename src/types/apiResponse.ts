import { toast } from "react-toastify";
import Swal from "sweetalert2";

export interface apiResponse {
    response?: {
        data: {
            success: boolean;
            message: string;
            errors?: Record<string, string[]>;
        };
    },
    success: boolean;
    message: string;
}

export function handleApiError(error: apiResponse) {
    if (error.response?.data.message === "Validation error") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: formatErrors(error.response?.data.errors),
            confirmButtonText: "Try Again",
        });
    } else {
        toast.error(formatErrors(error.response?.data.errors) ||
            error.response?.data.message ||
            "Unknown error");
    }
}

function formatErrors(errors?: Record<string, string[]>): string {
    if (!errors) return "";
    return Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("\n");
}

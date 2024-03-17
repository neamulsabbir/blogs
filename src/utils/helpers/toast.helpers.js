import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastError = ({ message, position, autoClose }) => {
	toast.error(message, {
		draggable: false,
		closeOnClick: true,
		pauseOnHover: true,
		progress: undefined,
		hideProgressBar: false,
		theme: "light",
		autoClose: autoClose || 3000,
		position: position || "bottom-right",
	});
};

export const toastSuccess = ({ message, position, autoClose }) => {
	toast.success(message, {
		draggable: false,
		closeOnClick: true,
		pauseOnHover: true,
		progress: undefined,
		hideProgressBar: false,
		theme: "light",
		autoClose: autoClose || 3000,
		position: position || "bottom-right",
	});
};

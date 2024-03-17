import { useRef } from "react";
import useAxios from "../../../hooks/useAxios";
import { toastError, toastSuccess } from "../../../utils/helpers/toast.helpers";

/* eslint-disable react/prop-types */
export const UserProfileImage = ({ profileData, getProfileData }) => {
	const fileUploaderRef = useRef();
	const { api } = useAxios();

	const handleImageUpload = (event) => {
		event.preventDefault();

		fileUploaderRef.current.addEventListener("change", updateImageDisplay);
		fileUploaderRef.current.click();
	};

	const updateImageDisplay = async () => {
		try {
			const formData = new FormData();
			for (const file of fileUploaderRef.current.files) {
				formData.append("avatar", file);
			}

			const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`, formData);
			if (response.status === 200) {
				toastSuccess({ message: response?.data?.message });
				getProfileData();
			}
		} catch (error) {
			console.log(error);
			toastError({ message: error?.response?.data?.error });
		}
	};
	return (
		<form className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
			<div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
				{profileData?.avatar !== null ? (
					<div className="">
						<img
							className="w-32 h-32 object-cover rounded-full"
							src={`http://localhost:3000/uploads/avatar/${profileData?.avatar}`}
							alt="Client Image"
						/>
					</div>
				) : (
					<div className="inline-block">
						{profileData?.firstName && <p>{profileData?.firstName.charAt(0)}</p>}
					</div>
				)}
			</div>

			<button
				onClick={handleImageUpload}
				className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
			>
				<img src="/images/icons/edit.svg" alt="Edit" />
			</button>
			<input id="file" type="file" ref={fileUploaderRef} hidden />
		</form>
	);
};

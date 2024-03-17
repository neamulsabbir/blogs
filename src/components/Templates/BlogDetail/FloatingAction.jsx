/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toastError } from "../../../utils/helpers/toast.helpers";

export const FloatingAction = ({ data, getSingleBlogs }) => {
	const [islike, setIsLike] = useState(false);
	const { auth } = useAuth();
	const { api } = useAxios();

	const handleAction = async (type) => {
		if (!auth?.user) {
			return toastError({ message: "Please Login" });
		}

		try {
			const response =
				type === "LIKE"
					? await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${data?.id}/like`)
					: await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${data?.id}/favourite`);

			if (response?.status === 200) {
				getSingleBlogs();
				setIsLike(response?.data?.isLiked);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="floating-action">
			<ul className="floating-action-menus">
				<li onClick={() => handleAction("LIKE")}>
					<img src={islike ? "/images/icons/like_fill.png" : " /images/icons/like.svg"} alt="like" />
					<span>{data?.likes?.length}</span>
				</li>

				<li onClick={() => handleAction("FAVOURITE")}>
					<img
						src={data?.isFavourite ? "/images/icons/heart-filled.svg" : "/images/icons/heart.svg"}
						alt="Favourite"
					/>
				</li>
				<Link to="#comments">
					<li>
						<img src="/images/icons/comment.svg" alt="Comments" />
						<span>{data?.comments?.length}</span>
					</li>
				</Link>
			</ul>
		</div>
	);
};

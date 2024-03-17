/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { toastSuccess } from "../../utils/helpers/toast.helpers";
import { Avatar } from "./Avatar";

export const BlogCard = ({ blog, getBlogs }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const { thumbnail, title, content, author, likes, id } = blog;
	const navigate = useNavigate();

	const { api } = useAxios();

	const handleDelete = async () => {
		const agree = window.confirm(`Are you sure delete this block`);
		if (agree) {
			try {
				const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`);
				if (response.status === 200) {
					toastSuccess({ message: "Delete successfully" });
					getBlogs();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	const handleNavigate = () => {
		navigate(`/blog-details/${id}`);
	};

	return (
		<div className="relative">
			<div onClick={handleNavigate} className="cursor-pointer blog-card">
				<img className="blog-thumb" src={`http://localhost:3000/uploads/blog/${thumbnail}`} alt="" />
				<div className="mt-2 ">
					<h3 className="text-slate-300 text-xl lg:text-2xl">{title}</h3>

					<div className="mb-6 text-base text-slate-500 mt-1" dangerouslySetInnerHTML={{ __html: content }} />

					<div className="flex justify-between items-center">
						<div className="flex items-center capitalize space-x-2">
							<Avatar src={author?.avatar} name={author?.firstName} bgColor="bg-indigo-600" />

							<div>
								<h5 className="text-slate-500 text-sm cursor-pointer">
									<div
										onClick={(e) => {
											e.stopPropagation();
											navigate("/user-profile");
										}}
									>
										{author?.firstName} {author?.lastName}
									</div>
								</h5>
								<div className="flex items-center text-xs text-slate-700">
									<span>June 28, 2018</span>
								</div>
							</div>
						</div>

						<div className="text-sm px-2 py-1 text-slate-700">
							{likes?.length} {likes?.length > 1 ? "Likes" : "Like"}
						</div>
					</div>

					<div className="absolute right-2 top-4" onClick={(e) => e.stopPropagation()}>
						{isPopupOpen ? (
							<p className="text-[#CBD5E1] cursor-pointer" onClick={() => setIsPopupOpen(!isPopupOpen)}>
								X
							</p>
						) : (
							<>
								<button onClick={() => setIsPopupOpen(!isPopupOpen)}>
									<img src="/images/icons/3dots.svg" alt="3dots of Action" />
								</button>
							</>
						)}
					</div>
				</div>
			</div>
			{isPopupOpen && (
				<div className="action-modal-container">
					<button className="action-menu-item hover:text-lwsGreen">
						<img src="/images/icons/edit.svg" alt="Edit" />
						Edit
					</button>
					<button className="action-menu-item hover:text-red-500" onClick={handleDelete}>
						<img src="/images/icons/delete.svg" alt="Delete" />
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toastError, toastSuccess } from "../../../utils/helpers/toast.helpers";
import { Avatar } from "../../SharedFolder/Avatar";
import AllComments from "./AllComments";

/* eslint-disable react/no-unescaped-entities */
export const BlogComment = ({ comment, getSingleBlogs }) => {
	const [value, setValue] = useState("");
	const { auth } = useAuth();
	const { api } = useAxios();
	console.log(comment);

	const handleComment = async () => {
		if (!auth?.user) {
			return toastError({ message: "Please Login" });
		}

		const payload = {
			content: value,
		};
		try {
			const response = await api.post(
				`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${comment?.id}/comment`,
				payload
			);
			if (response.status === 200) {
				setValue(null);
				getSingleBlogs();
				toastSuccess({ message: "Comment added successfully" });
			}
		} catch (error) {
			console.log(error);
			toastError({ message: error?.response?.data?.error });
		}
	};
	return (
		<section id="comments">
			<div className="mx-auto w-full md:w-10/12 container">
				<h2 className="text-3xl font-bold my-8">Comments ({comment?.comments?.length})</h2>
				<div className="flex items -center space-x-4">
					{auth?.user && (
						<Link to="/user-profile">
							<Avatar src={auth?.user?.avatar} name={auth?.user?.firstName} bgColor="bg-orange-600" />
						</Link>
					)}

					<div className="w-full">
						<textarea
							onChange={(e) => setValue(e.target.value)}
							className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
							placeholder="Write a comment"
						></textarea>
						<div className="flex justify-end mt-4">
							<button
								onClick={handleComment}
								className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
							>
								Comment
							</button>
						</div>
					</div>
				</div>

				{comment?.comments?.map((el) => (
					<AllComments key={el?.id} data={el} getSingleBlogs={getSingleBlogs} blogData={comment} />
				))}
			</div>
		</section>
	);
};

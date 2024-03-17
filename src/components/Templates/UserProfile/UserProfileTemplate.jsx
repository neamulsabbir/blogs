/* eslint-disable no-undef */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { BlogCard } from "../../SharedFolder/BlogCard";
import { Loader } from "../../SharedFolder/Loader";
import { UserProfileImage } from "./UserProfileImage";

export const UserProfileTemplate = () => {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);

	const { api } = useAxios();
	const { auth } = useAuth();

	const getProfileData = async () => {
		setLoading(true);

		try {
			const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
			setUser(response?.data);
			setBlogs(response?.blogs);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProfileData();
	}, [auth]);

	if (loading) {
		return <Loader />;
	}
	return (
		<div className="mx-auto max-w-[1020px] py-8">
			<div className="container">
				<div className="flex flex-col items-center py-8 text-center">
					<UserProfileImage profileData={user} getProfileData={getProfileData} />

					<div>
						<h3 className="text-2xl font-semibold text-white lg:text-[28px]">
							{user?.firstName} {user?.lastName}
						</h3>
						<p className="leading-[231%] lg:text-lg">{user?.email}</p>
					</div>
					{user?.bio && (
						<div className="mt-4 flex items-start gap-2 lg:mt-6">
							<div className="flex-1">
								<p className="leading-[188%] text-gray-400 lg:text-lg">{user?.bio}</p>
							</div>

							<button className="flex-center h-7 w-7 rounded-full">
								<img src="/images/icons/edit.svg" alt="Edit" />
							</button>
						</div>
					)}
					<div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
				</div>

				<h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>

				{blogs?.length > 0 ? (
					blogs?.map((blog) => (
						<div key={blog?.id} className="my-6 space-y-4">
							<BlogCard blog={blog} />
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center py-28">
						<p className="mb-5 text-xl">You have no blog yet</p>
						<Link
							to="/write"
							className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200 "
						>
							Create a blog
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

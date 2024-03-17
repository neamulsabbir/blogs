import { useEffect, useState } from "react";

import { api } from "../../../../api";
import { useAuth } from "../../../../hooks/useAuth";
import { BlogCard } from "../../../SharedFolder/BlogCard";
import { Loader } from "../../../SharedFolder/Loader";
import { FavouriteBlog } from "./FavouriteBlog/FavouriteBlog";
import { PopularBlog } from "./PopularBlog/PopularBlog";

export const BlogLists = () => {
	const [data, setData] = useState([]);
	const [popularBlog, sePopularBlog] = useState([]);
	const [favouriteBlog, setFavouriteBlog] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const { auth } = useAuth();

	const getBlogs = async () => {
		try {
			setIsLoading(true);
			const res = await api.get("/blogs");
			if (res?.data) {
				setData(res?.data);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const getPopularBlogs = async () => {
		try {
			setIsLoading(true);
			const res = await api.get("/blogs/popular");
			if (res?.data) {
				sePopularBlog(res?.data);
			}
		} catch (err) {
			// toastError({ message: err?.response?.data?.error });
		} finally {
			setIsLoading(false);
		}
	};

	const getFavouriteBlogs = async () => {
		try {
			setIsLoading(true);
			const res = await api.get("/blogs/popular");
			if (res?.data) {
				setFavouriteBlog(res?.data);
			}
		} catch (err) {
			// toastError({ message: err?.response?.data?.error });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getBlogs();
	}, []);

	useEffect(() => {
		getPopularBlogs();
	}, []);

	useEffect(() => {
		getFavouriteBlogs();
	}, []);

	return (
		<div className="container">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-7 gap-4">
						<div className="space-y-3 md:col-span-5">
							{data?.blogs?.length > 0 ? (
								<>
									{data?.blogs?.map((blog) => (
										<BlogCard key={blog?.id} blog={blog} getBlogs={getBlogs} />
									))}
								</>
							) : (
								<p className="text-2xl  py-60 flex items-center justify-center">No data found</p>
							)}
						</div>
						<div className="md:col-span-2 h-full w-full space-y-5">
							<div className="sidebar-card">
								<h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">Most Popular 👍️</h3>
								{popularBlog?.blogs?.length > 0 ? (
									<>
										{popularBlog?.blogs?.map((blog) => (
											<PopularBlog key={blog?.id} blog={blog} />
										))}
									</>
								) : (
									<p className="text-base  py-28 flex items-center justify-center">No data found</p>
								)}
							</div>

							{auth?.user && (
								<div className="sidebar-card">
									<h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
										Your Favourites ❤️
									</h3>
									{popularBlog?.blogs?.length > 0 ? (
										<>
											{favouriteBlog?.blogs?.map((blog) => (
												<FavouriteBlog key={blog?.id} blog={blog} />
											))}
										</>
									) : (
										<p className="text-base  py-28 flex items-center justify-center">
											No data found
										</p>
									)}
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

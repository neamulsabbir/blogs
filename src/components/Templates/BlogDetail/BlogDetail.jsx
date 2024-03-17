/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api";
import { Loader } from "../../SharedFolder/Loader";
import { BlogComment } from "./BlogComment";
import BlogDetailAuthor from "./BlogDetailAuthor";
import { FloatingAction } from "./FloatingAction";

export const BlogDetail = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const { id } = useParams();

	const getSingleBlogs = async () => {
		try {
			setIsLoading(true);
			const res = await api.get(`/blogs/${id}`);
			if (res?.data) {
				setData(res?.data);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getSingleBlogs();
	}, [id]);

	const tagItems = data?.tags?.split(",").map((tag) => <li key={tag.trim()}>{tag.trim()}</li>);

	if (isLoading) {
		<Loader />;
	}

	return (
		<section>
			<div className="container text-center py-8">
				<h1 className="font-bold text-3xl md:text-5xl">{data?.title}</h1>
				<BlogDetailAuthor data={data} />
				<img
					className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
					src={`http://localhost:3000/uploads/blog/${data?.thumbnail}`}
					alt=""
				/>

				<ul className="tags">{tagItems}</ul>

				<div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"></div>
			</div>
			<BlogComment comment={data} getSingleBlogs={getSingleBlogs} />
			<FloatingAction data={data} getSingleBlogs={getSingleBlogs} />
		</section>
	);
};

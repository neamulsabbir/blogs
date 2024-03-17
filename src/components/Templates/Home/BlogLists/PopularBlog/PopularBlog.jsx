import { Link } from "react-router-dom";

export const PopularBlog = ({ blog }) => {
	const { title, author, likes } = blog;
	return (
		<Link to={`/blog-details/${blog?.id}`}>
			<ul className="space-y-5 my-5">
				<li>
					<h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
						{title}
					</h3>
					<p className="text-slate-600 text-sm">
						<span>by</span>
						{""} {""}
						<Link to="./profile.html">
							{author?.firstName} {author?.lastName}
						</Link>
						<span>·</span>
						{likes?.length} {likes?.length > 1 ? "Likes" : "Like"}
					</p>
				</li>
			</ul>
		</Link>
	);
};

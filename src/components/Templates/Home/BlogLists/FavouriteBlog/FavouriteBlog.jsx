import { Link } from "react-router-dom";

export const FavouriteBlog = ({ blog }) => {
	const tagList = blog?.tags
		.split(",")
		.map((tag) => `#${tag.trim()}`)
		.join(", ");
	return (
		<Link to={`/blog-details/${blog?.id}`}>
			<ul className="space-y-5 my-5">
				<li>
					<h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
						{blog?.title}
					</h3>
					<p className="text-slate-600 text-sm">{tagList}</p>
				</li>
			</ul>
		</Link>
	);
};

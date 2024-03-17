/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/helpers/formarDate";
import { Avatar } from "../../SharedFolder/Avatar";

const BlogDetailAuthor = ({ data }) => {
	return (
		<div className="flex justify-center items-center my-4 gap-4">
			<div className="flex items-center capitalize space-x-2">
				<Avatar src={data?.author?.avatar} name={data?.author?.firstName} bgColor="bg-orange-600" />

				<Link to="/user-profile">
					<h5 className="text-slate-500 text-sm">
						{data?.author?.firstName} {data?.author?.lastName}
					</h5>
				</Link>
			</div>
			<span className="text-sm text-slate-700 dot">{formatDate(data?.createdAt)}</span>
			<span className="text-sm text-slate-700 dot">
				{data?.likes?.length} {data?.likes?.length > 1 ? "Likes" : "Like"}
			</span>
		</div>
	);
};

export default BlogDetailAuthor;

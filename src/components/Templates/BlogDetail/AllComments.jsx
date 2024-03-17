import { useAuth } from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toastSuccess } from "../../../utils/helpers/toast.helpers";
import { Avatar } from "../../SharedFolder/Avatar";

const AllComments = ({ data, blogData, getSingleBlogs }) => {
	const { auth } = useAuth();
	const { api } = useAxios();

	const handleDelete = async () => {
		const agree = window.confirm(`Are you sure delete this comment`);
		if (agree) {
			try {
				const response = await api.delete(
					`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogData?.id}/comment/${data?.id}`
				);
				if (response.status === 200) {
					toastSuccess({ message: "Comment delete successfully" });
					getSingleBlogs();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div key={data?.id} className="flex justify-between items-center">
			<div className="flex items-start space-x-4 my-8">
				<Avatar src={data?.author?.avatar} name={data?.author?.firstName} bgColor="bg-orange-600" />
				<div className="w-full">
					<h5 className="text-slate -500 font-bold">
						{data?.author?.firstName} {data?.author?.lastName}
					</h5>
					<p className="text-slate-300">{data?.content}</p>
				</div>
			</div>
			{auth?.user && (
				<div>
					<button className="action-menu-item hover:text-red-500" onClick={handleDelete}>
						<img src="/images/icons/delete.svg" alt="Delete" />
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default AllComments;

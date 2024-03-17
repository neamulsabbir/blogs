import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useForm } from "../../../hooks/useForm";
import { toastError, toastSuccess } from "../../../utils/helpers/toast.helpers";
import { FormInput } from "../../SharedFolder/FormInput";
import { MultilineFormInput } from "../../SharedFolder/MultilineFormInput";
import UploadBlogThumbnail from "./UploadBlogThumbnail";
import { blogPostFormValidation } from "./blogPostFormValidation";
import { initialWriteValue, initialWriteValueError } from "./constant";

const Write = () => {
	const [previewImage, setPreviewImage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { api } = useAxios();

	const submitHandler = async () => {
		if (!values?.thumbnail) {
			toastError({ message: "Select thumbnail image" });
		} else {
			try {
				setIsLoading(true);
				const res = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs`, values);

				if (res?.data?.status === "success") {
					toastSuccess({ message: "Blog created successfully" });
					setValues({ ...initialWriteValue });
					setPreviewImage("");
				}
			} catch (err) {
				toastError({ message: err?.response?.data?.error });
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const { values, errors, handleSubmit, handleChange, setValues } = useForm({
		initialValues: initialWriteValue,
		initialErrors: initialWriteValueError,
		validate: blogPostFormValidation,
		onCallback: submitHandler,
	});
	return (
		<section>
			<div className="container">
				<form onSubmit={handleSubmit} className="createBlog">
					<UploadBlogThumbnail
						setValues={setValues}
						previewImage={previewImage}
						setPreviewImage={setPreviewImage}
					/>
					<div className="mb-6">
						<FormInput
							type="text"
							name="title"
							placeholder="Enter your blog title"
							onChange={handleChange}
							value={values?.title}
							error={!!errors?.title}
							helperTxt={errors?.title}
						/>
					</div>

					<div className="mb-6">
						<FormInput
							type="text"
							name="tags"
							placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
							onChange={handleChange}
							value={values?.tags}
							error={!!errors?.tags}
							helperTxt={errors?.tags}
						/>
					</div>

					<div className="mb-6">
						<MultilineFormInput
							type="text"
							name="content"
							placeholder="Write your blog content"
							onChange={handleChange}
							value={values?.content}
							error={!!errors?.content}
							helperTxt={errors?.content}
							rows="8"
						/>
					</div>

					<button
						disabled={isLoading}
						type="submit"
						className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
					>
						Create Blog
					</button>
				</form>
			</div>
		</section>
	);
};

export default Write;

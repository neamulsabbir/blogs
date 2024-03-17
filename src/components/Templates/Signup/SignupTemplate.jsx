/* eslint-disable no-unused-vars */

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { toastError, toastSuccess } from "../../../utils/helpers/toast.helpers";
import { FormInput } from "../../SharedFolder/FormInput";
import { Loader } from "../../SharedFolder/Loader";
import { initialSignupError, initialSignupValue } from "./constant";
import { signupValidation } from "./signupFormValidation";

export const SignupTemplate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isMatchPass, setIsMatchPass] = useState(null);

	const navigate = useNavigate();

	const submitHandler = async () => {
		if (values?.password !== values?.confirmPassword) {
			setIsMatchPass("Your password not matched");
		} else {
			try {
				setIsLoading(true);
				const res = await axios.post("http://localhost:3000/auth/register", values);

				if (res?.status === 201) {
					toastSuccess({ message: "Registered successfully" });
					navigate("/login");
					setValues(initialSignupValue);
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
		initialValues: initialSignupValue,
		initialErrors: initialSignupError,
		validate: signupValidation,
		onCallback: submitHandler,
	});

	return (
		<section className="container">
			{isLoading ? (
				<Loader />
			) : (
				<div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
					<h2 className="text-2xl font-bold mb-6">Register</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-6">
							<FormInput
								type="text"
								name="firstName"
								label="First Name"
								placeholder="First name"
								onChange={handleChange}
								value={values?.firstName}
								error={!!errors?.firstName}
								helperTxt={errors?.firstName}
							/>
						</div>

						<div className="mb-6">
							<FormInput
								type="text"
								name="lastName"
								label="Last Name"
								placeholder="Last name"
								onChange={handleChange}
								value={values?.lastName}
								error={!!errors?.lastName}
								helperTxt={errors?.lastName}
							/>
						</div>

						<div className="mb-6">
							<FormInput
								type="email"
								name="email"
								label="Email"
								placeholder="Write your email"
								onChange={handleChange}
								value={values?.email}
								error={!!errors?.email}
								helperTxt={errors?.email}
							/>
						</div>

						<div className="mb-6">
							<FormInput
								type="password"
								name="password"
								label="Password"
								placeholder="Write your password"
								onChange={handleChange}
								value={values?.password}
								error={!!errors?.password}
								helperTxt={errors?.password}
							/>
						</div>

						<div className="mb-6">
							<FormInput
								type="password"
								name="confirmPassword"
								label="Confirm Password"
								placeholder="Write your password"
								onChange={handleChange}
								value={values?.confirmPassword}
								error={!!errors?.confirmPassword}
								helperTxt={errors?.confirmPassword}
							/>
							<p className="text-red-400 text-xs">{isMatchPass}</p>
						</div>

						<div className="mb-6">
							<button
								type="submit"
								className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
							>
								Create Account
							</button>
						</div>
						<p className="text-center">
							Already have account?{" "}
							<Link to="/login" className="text-indigo-600 hover:underline">
								Login
							</Link>
						</p>
					</form>
				</div>
			)}
		</section>
	);
};

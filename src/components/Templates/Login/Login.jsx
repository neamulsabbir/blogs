/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";
import { toastError } from "../../../utils/helpers/toast.helpers";
import { FormInput } from "../../SharedFolder/FormInput";
import { Loader } from "../../SharedFolder/Loader";
import { initialSigninError, initialSigninValue } from "./constant";
import { signinValidation } from "./signinFormValidation";

export const LoginTemplate = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();

	const submitHandler = async () => {
		setLoading(true);
		try {
			const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, values);

			if (response.status === 200) {
				const { token, user } = response.data;
				if (token) {
					const authToken = token.accessToken;
					const refreshToken = token.refreshToken;

					setAuth({ user, authToken, refreshToken });
					localStorage.setItem("userData", JSON.stringify({ user, authToken, refreshToken }));

					navigate("/");
				}
			}
		} catch (error) {
			toastError({ message: error?.response?.data?.error });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Check if the user is already authenticated
		if (auth?.user) {
			navigate("/"); // Redirect to the home page if already authenticated
		}

		// Retrieve stored user data from localStorage
		const storedUserData = localStorage.getItem("userData");

		if (storedUserData) {
			setAuth(JSON.parse(storedUserData));
		}
	}, [auth, navigate, setAuth]);

	const { values, errors, handleSubmit, handleChange, setValues } = useForm({
		initialValues: initialSigninValue,
		initialErrors: initialSigninError,
		validate: signinValidation,
		onCallback: submitHandler,
	});

	if (loading) {
		<Loader />;
	}
	return (
		<section className="container">
			<div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
				<h2 className="text-2xl font-bold mb-6">Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<FormInput
							type="email"
							name="email"
							label="Email"
							placeholder="First name"
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
							placeholder="Password"
							onChange={handleChange}
							value={values?.password}
							error={!!errors?.password}
							helperTxt={errors?.password}
						/>
					</div>

					<div className="mb-6">
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
						>
							Login
						</button>
					</div>

					<p className="text-center">
						Don&apos;t have an account?{" "}
						<Link to="/signup" className="text-indigo-600 hover:underline">
							Register
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

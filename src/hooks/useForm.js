import { useState } from "react";
import { isNullProperties } from "../utils/helpers/validation.helpers";

export const useForm = (props) => {
	const { initialValues, initialErrors = {}, validate = null, onCallback } = props;
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialErrors);

	const handleChange = (e) => {
		const { name, type, value } = e.target;
		if (validate !== null) {
			const errorsData = validate({ [name]: value });
			setErrors((prevState) => ({ ...prevState, ...errorsData }));
		}

		if (type === "checkbox") {
			const { checked } = e.target;
			setValues((prevState) => ({ ...prevState, [name]: checked }));
		} else {
			setValues((prevState) => ({ ...prevState, [name]: value }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate !== null) {
			const errorsData = validate(values);
			setErrors((prevState) => ({ ...prevState, ...errorsData }));
			if (errorsData && isNullProperties(errorsData)) onCallback(values);
		} else {
			onCallback(values);
		}
	};

	return {
		values,
		errors,
		setValues,
		setErrors,
		handleChange,
		handleSubmit,
	};
};

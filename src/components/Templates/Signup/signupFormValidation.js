import { formatValidatorKey } from "../../../utils/helpers/format.helpers";
import { initialSignupError, initialSignupValue } from "./constant";

export const signupValidation = (values = initialSignupValue) => {
	const errors = {};

	if (values && Object.keys(values).length > 0) {
		for (const [key, value] of Object.entries(values)) {
			if (key in initialSignupError) {
				if (!value) {
					errors[key] = `${formatValidatorKey(key)} is required`;
				} else {
					errors[key] = null;
				}
			}
		}
	}

	return errors;
};

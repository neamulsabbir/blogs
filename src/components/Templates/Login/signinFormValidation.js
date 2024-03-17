import { formatValidatorKey } from "../../../utils/helpers/format.helpers";
import { initialSigninError, initialSigninValue } from "./constant";

export const signinValidation = (values = initialSigninValue) => {
	const errors = {};

	if (values && Object.keys(values).length > 0) {
		for (const [key, value] of Object.entries(values)) {
			if (key in initialSigninError) {
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

import { formatValidatorKey } from "../../../utils/helpers/format.helpers";
import { initialWriteValue, initialWriteValueError } from "./constant";

export const blogPostFormValidation = (values = initialWriteValue) => {
	const errors = {};

	if (values && Object.keys(values).length > 0) {
		for (const [key, value] of Object.entries(values)) {
			if (key in initialWriteValueError) {
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

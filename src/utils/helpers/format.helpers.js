export const formatReadable = (value) => {
	return value.replace(/([A-Z])/g, " $1");
};

export const formatValidatorKey = (value) => {
	const val = formatReadable(value);
	return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};

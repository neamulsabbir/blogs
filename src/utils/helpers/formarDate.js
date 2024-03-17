export function formatDate(input) {
	if (!input) return ""; // Check if input is not provided

	const date = new Date(input);

	if (isNaN(date.getTime())) return ""; // Check if input is not a valid date

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const monthIndex = date.getMonth();
	const monthName = monthNames[monthIndex];
	const day = date.getDate();
	const year = date.getFullYear();

	let finalDate = `${monthName} ${day}, ${year}`;
	return finalDate;
}

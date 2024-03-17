export const FormInput = ({ label, bgColor, helperTxt, error, ...rest }) => {
	return (
		<div>
			{label && <p className="font-medium mb-2">{label}</p>}
			<input
				{...rest}
				className={`${bgColor ? "bg-gray-100" : "bg-white"} ${
					error && "!border !border-red-400"
				} placeholder:text-xs placeholder:text-gray-500 w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
			/>
			{helperTxt && <p className="text-red-400 mt-1 text-xs">{helperTxt}</p>}
		</div>
	);
};

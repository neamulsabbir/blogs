import React from "react";

export const Avatar = ({ src, name, bgColor }) => {
	return (
		<div>
			{src !== null ? (
				<div className="">
					<img
						className={`avater-img`}
						src={`http://localhost:3000/uploads/avatar/${src}`}
						alt="Client Image"
					/>
				</div>
			) : (
				<div className="inline-block">
					{name && <p className={`avater-img ${bgColor}  text-white `}>{name.charAt(0)}</p>}
				</div>
			)}
		</div>
	);
};

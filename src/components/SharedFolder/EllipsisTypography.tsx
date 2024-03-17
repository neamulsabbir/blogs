import React from "react";

export const EllipsisTypography = ({ lineClamp, children, ...rest }) => {
	return (
		<div className={`w-full overflow-hidden break-all line-clamp-${lineClamp}`} {...rest}>
			{children}
		</div>
	);
};

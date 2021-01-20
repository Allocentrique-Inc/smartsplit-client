import * as React from "react"

function SendIcon(props) {
	return (
		<svg
			width={22}
			height={22}
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M21 1l-7 20-4-9-9-4 20-7z"
				stroke="#2DA84F"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

export default SendIcon

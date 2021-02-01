import * as React from "react"

function RedTrash(props) {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.293 3.293A1 1 0 0110 3h4a1 1 0 011 1v1H9V4a1 1 0 01.293-.707zM7 5V4a3 3 0 013-3h4a3 3 0 013 3v1h4a1 1 0 110 2h-1v13a3 3 0 01-3 3H7a3 3 0 01-3-3V7H3a1 1 0 010-2h4zM6 7v13a1 1 0 001 1h10a1 1 0 001-1V7H6z"
				fill="#AC1616"
			/>
		</svg>
	)
}

export default RedTrash

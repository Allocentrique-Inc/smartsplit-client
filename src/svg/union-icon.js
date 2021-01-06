import * as React from "react"

function UnionIcon(props) {
	return (
		<svg
			width={20}
			height={22}
			viewBox="0 0 20 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 1a1 1 0 10-2 0v1H7V1a1 1 0 00-2 0v1H3a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3h-2V1zm3 7V5a1 1 0 00-1-1h-2v1a1 1 0 11-2 0V4H7v1a1 1 0 01-2 0V4H3a1 1 0 00-1 1v3h16zM2 10h16v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9z"
				fill="#8DA0B3"
			/>
		</svg>
	)
}

export default UnionIcon

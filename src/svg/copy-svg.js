import * as React from "react"

function CopySVG(props) {
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
				d="M3.293 3.293A1 1 0 014 3h9a1 1 0 011 1v1a1 1 0 102 0V4a3 3 0 00-3-3H4a3 3 0 00-3 3v9a3 3 0 003 3h1a1 1 0 100-2H4a1 1 0 01-1-1V4a1 1 0 01.293-.707zM10 11a1 1 0 011-1h9a1 1 0 011 1v9a1 1 0 01-1 1h-9a1 1 0 01-1-1v-9zm1-3a3 3 0 00-3 3v9a3 3 0 003 3h9a3 3 0 003-3v-9a3 3 0 00-3-3h-9z"
				fill="#8DA0B3"
			/>
		</svg>
	)
}

export default CopySVG

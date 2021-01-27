import * as React from "react"

function DownloadSVG(props) {
	return (
		<svg
			width={20}
			height={20}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11 1a1 1 0 10-2 0v9.586L5.707 7.293a1 1 0 00-1.414 1.414l5 5 .006.007a.996.996 0 00.698.286h.006c.272 0 .518-.11.697-.286l.008-.008 5-4.999a1 1 0 00-1.415-1.414L11 10.586V1zM1 12a1 1 0 011 1v4a1 1 0 001 1h14a1 1 0 001-1v-4a1 1 0 112 0v4a3 3 0 01-3 3H3a3 3 0 01-3-3v-4a1 1 0 011-1z"
				fill="#2DA84F"
			/>
		</svg>
	)
}

export default DownloadSVG

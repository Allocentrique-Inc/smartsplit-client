import * as React from "react"

function FileIcon(props) {
	return (
		<svg
			width={18}
			height={22}
			viewBox="0 0 18 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 0a3 3 0 00-3 3v16a3 3 0 003 3h12a3 3 0 003-3V8.414c0-.081-.005-.162-.015-.242a1.004 1.004 0 00-.41-.99 2.005 2.005 0 00-.16-.182L11 .586a1.988 1.988 0 00-.182-.161.999.999 0 00-.99-.41A2 2 0 009.586 0H3zm6 2H3a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V9h-5a2 2 0 01-2-2V2zm5.586 5L11 3.414V7h3.586z"
				fill="#8DA0B3"
			/>
		</svg>
	)
}

export default FileIcon

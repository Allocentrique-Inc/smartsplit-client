import * as React from "react"

function ModifierSVG(props) {
	return (
		<svg
			width={14}
			height={14}
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.138.528a.667.667 0 00-.942 0l-2 2L.528 9.196a.667.667 0 00-.195.471V13c0 .368.298.666.666.666h3.334c.176 0 .346-.07.471-.195l6.667-6.667 2-2a.667.667 0 000-.942L10.138.528zM11 5.39l1.057-1.057-2.39-2.39L8.61 3 11 5.39zM7.667 3.942l2.39 2.391-6 6h-2.39v-2.39l6-6z"
				fill="#2DA84F"
			/>
		</svg>
	)
}

export default ModifierSVG

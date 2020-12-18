import * as React from "react"

function LockSVG(props) {
	return (
		<svg
			width={61}
			height={62}
			viewBox="0 0 61 62"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle cx={30.5} cy={31} r={30.125} fill="#F5F2F3" />
			<path
				d="M39.537 29.494H21.462a3.013 3.013 0 00-3.013 3.012V43.05a3.013 3.013 0 003.013 3.013h18.075a3.012 3.012 0 003.012-3.013V32.506a3.012 3.012 0 00-3.012-3.012zM22.969 29.494v-6.025a7.53 7.53 0 1115.062 0v6.025"
				stroke="#8DA0B3"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

export default LockSVG

import React from "react"
import { Svg, Path, Rect } from "react-native-svg"

export default function LogoAddRound(props) {
	return <Svg
		width="56" height="56"
		viewBox="0 0 120 120"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Rect x="32" y="24" width="56" height="56" rx="28" fill="#2DA84F" />
		
		<Path
			d="M60 45V59"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M53 52H67"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round" 
			strokeLinejoin="round"
		/>
	</Svg>
}

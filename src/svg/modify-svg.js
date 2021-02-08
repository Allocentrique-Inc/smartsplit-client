import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ModifierSVG(props) {
	return (
		<Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.138 1.528a.667.667 0 00-.942 0l-2 2-6.667 6.667a.667.667 0 00-.195.471V14c0 .368.298.666.666.666h3.334c.176 0 .346-.07.471-.195l6.667-6.667 2-2a.667.667 0 000-.942l-3.334-3.334zM12 6.39l1.057-1.057-2.39-2.39L9.61 4 12 6.39zM8.667 4.942l2.39 2.391-6 6h-2.39v-2.39l6-6z"
				fill="#2DA84F"
			/>
		</Svg>
	)
}

export default ModifierSVG

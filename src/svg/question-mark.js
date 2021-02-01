import * as React from "react"
import Svg, { Path } from "react-native-svg"

function QuestionMark(props) {
	return (
		<Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6 12A6 6 0 106 0a6 6 0 000 12zm0-3.417c.368 0 .667.299.667.667v.083a.667.667 0 01-1.334 0V9.25c0-.368.299-.667.667-.667zm-.729-5.069a1.333 1.333 0 012.01 1.152c0 .313-.244.64-.704.946a4.032 4.032 0 01-.831.419l-.01.004a.667.667 0 00.422 1.264l.041-.014-.04.014.003-.001.007-.003.024-.008.006-.002a5.222 5.222 0 00.33-.134c.211-.094.497-.236.788-.43.54-.36 1.296-1.033 1.296-2.054a2.667 2.667 0 00-5.182-.888.667.667 0 101.258.442c.104-.297.31-.547.582-.707z"
				fill="#8DA0B3"
			/>
		</Svg>
	)
}

export default QuestionMark

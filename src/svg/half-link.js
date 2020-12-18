import React from "react"
import Svg, { Path, G } from "react-native-svg"
import { Colors } from "../theme"

export default function HalfLinkIcon(props) {
	const color = props.color || Colors.action

	return (
		<Svg width={20} height={16} {...props}>
			<Path fill="none" d="M-1 -1H21V17H-1z" />
			<G strokeWidth={0}>
				<Path
					fill={color}
					d="M4 10.7c-.8-.8-1.2-1.8-1.2-2.9S3.2 5.7 4 5c1.5-1.5 4.1-1.5 5.7 0l4.9 4.9c.4.4 1 .4 1.4 0s.4-1 0-1.4l-4.9-4.9C9.9 2.5 8.4 1.8 6.8 1.8s-3.1.7-4.2 1.8S.8 6.2.8 7.8s.6 3.1 1.8 4.2l4.9 4.9c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L4 10.7z"
					transform="rotate(45 10 11)"
				/>
				<Path
					fill={color}
					d="M9 10c-.4.4-.4 1 0 1.4l8.5 8.5c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L10.4 10c-.4-.4-1.1-.4-1.4 0z"
					transform="rotate(45 10 11)"
				/>
			</G>
		</Svg>
	)
}

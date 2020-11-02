import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../../theme"

export default function YoutubeIcon(props) {
	const color = props.color || Colors.tertiary
	const { ...nextProps } = props

	return (
		<Svg
			{...nextProps}
			width="23"
			height="14"
			viewBox="0 0 23 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M22.0469 2.19059C21.7932 1.33412 21.0502 0.658824 20.1078 0.428235C18.3863 0 11.5 0 11.5 0C11.5 0 4.61366 0 2.89208 0.411765C1.96787 0.642353 1.20675 1.33412 0.953046 2.19059C0.5 3.75529 0.5 7 0.5 7C0.5 7 0.5 10.2612 0.953046 11.8094C1.20675 12.6659 1.94975 13.3412 2.89208 13.5718C4.63178 14 11.5 14 11.5 14C11.5 14 18.3863 14 20.1078 13.5882C21.0502 13.3576 21.7932 12.6824 22.0469 11.8259C22.4999 10.2612 22.4999 7.01647 22.4999 7.01647C22.4999 7.01647 22.518 3.75529 22.0469 2.19059ZM14.5 7L9.5 4V10L14.5 7Z"
				fill={color}
			/>
		</Svg>
	)
}

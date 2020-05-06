import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../../src/theme"

export default function CapsLock(props) {
	const color = props.color || Colors.tertiary

	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.6644 1.25259C12.2687 0.900828 11.6673 0.918499 11.2929 1.2929L3.29292 9.2929C3.00692 9.57889 2.92137 10.009 3.07615 10.3827C3.23093 10.7564 3.59557 11 4.00003 11H7.00003V14C7.00003 14.5523 7.44774 15 8.00003 15H16C16.5523 15 17 14.5523 17 14V11H21C21.4152 11 21.7872 10.7435 21.9347 10.3554C22.0823 9.9673 21.9747 9.52842 21.6644 9.25259L12.6644 1.25259ZM6.41424 9L12.0404 3.37384L18.3698 9H16C15.4477 9 15 9.44772 15 10V13H9.00003V10C9.00003 9.44772 8.55231 9 8.00003 9H6.41424ZM8 17C7.44772 17 7 17.4477 7 18V22C7 22.5523 7.44772 23 8 23H16C16.5523 23 17 22.5523 17 22V18C17 17.4477 16.5523 17 16 17H8ZM9 21V19H15V21H9Z"
				fill="#8DA0B3"
			/>
		</Svg>
	)
}

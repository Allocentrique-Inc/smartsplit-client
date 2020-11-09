import React from "react"
import { View } from "react-native"
import { OverlayPortal } from "./scrollable"

export function UnScrollable(props) {
	const { children, style, ...nextProps } = props
	const containerRef = React.createRef()

	function onRef(ref) {
		if (ref)
			// parfois la ref est null pour aucune raison, et ça cause des
			containerRef.current = ref // problèmes bizarred et subtils.
	}

	return (
		<OverlayPortal.Provider containerRef={containerRef}>
			<View
				{...nextProps}
				ref={(ref) => onRef(ref)}
				style={[{ flex: 1 }, style]}
			>
				{children}
				<OverlayPortal.Exit />
			</View>
		</OverlayPortal.Provider>
	)
}

export default UnScrollable

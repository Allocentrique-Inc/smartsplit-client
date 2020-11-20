import React from "react"
import { ScrollView } from "react-native"
import { createPortal } from "../portals"

/**
 * seems like this and overlay should be in a separate file
 * @type {{Context, Provider, Entrance, Exit, ExitProvider}}
 */
export const OverlayPortal = createPortal("ScrollableOverlay")
export class Overlay extends React.PureComponent {
	static Context = OverlayPortal.Context
	static Portal = OverlayPortal.Entrance
	static Container = OverlayPortal.Exit
	static Provider = OverlayPortal.Provider
	static ProviderContainer = OverlayPortal.ExitProvider

	render() {
		if (this.props.render === false) return null

		return (
			<OverlayPortal.Entrance>
				{this.props.visible !== false && this.props.children}
			</OverlayPortal.Entrance>
		)
	}
}

export function Scrollable(props) {
	const { children, style, autoScrollToTop, ...nextProps } = props
	const containerRef = React.createRef()

	function onRef(ref) {
		if (ref)
			// parfois la ref est null pour aucune raison, et ça cause des
			containerRef.current = ref // problèmes bizarred et subtils.
		if (autoScrollToTop) {
			containerRef.current.scrollTo({ y: 0, animation: false })
		}
	}

	return (
		<OverlayPortal.Provider containerRef={containerRef}>
			<ScrollView
				{...nextProps}
				ref={(ref) => onRef(ref)}
				style={[{ flex: 1 }, style]}
			>
				{children}
				<OverlayPortal.Exit />
			</ScrollView>
		</OverlayPortal.Provider>
	)
}

export default Scrollable

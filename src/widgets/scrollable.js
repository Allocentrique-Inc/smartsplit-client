import React from "react"
import { ScrollView } from "react-native"
import { createPortal } from "../portals"

const OverlayPortal = createPortal("ScrollableOverlay")
export class Overlay extends React.PureComponent {
	static Context   = OverlayPortal.Context
	static Portal    = OverlayPortal.Entrance
	static Container = OverlayPortal.Exit
	static Provider  = OverlayPortal.Provider
	static ProviderContainer = OverlayPortal.ExitProvider
	
	render() {
		if(this.props.render === false)
			return null
		
		return <OverlayPortal.Entrance>
			{this.props.visible !== false && this.props.children}
		</OverlayPortal.Entrance>
	}
}
	

export function Scrollable(props) {
	const { children, ...nextProps } = props
	const containerRef = React.createRef()
	
	return <OverlayPortal.Provider containerRef={containerRef}>
		<ScrollView {...nextProps} ref={containerRef}>
			{children}
			<OverlayPortal.Exit />
		</ScrollView>
	</OverlayPortal.Provider>
}

export default Scrollable

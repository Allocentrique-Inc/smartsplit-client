import React from "react"
import { Platform, Web } from "../platform"
import { Column } from "../layout"
import { Scrollable } from "../widgets/scrollable"
import Navbar from "../smartsplit/public/navbar-web"

export default function PublicPageLayout({
	as,
	style,
	children,
	navigation,
	...props
}) {
	const Component = as || Column
	const nextStyle =
		Platform.OS === "web"
			? { maxWidth: 464, alignSelf: "center", ...style }
			: style

	return (
		<>
			<Web component={Navbar}>{navigation}</Web>
			<Scrollable>
				<Component style={nextStyle} padding="group" {...props}>
					{children}
				</Component>
			</Scrollable>
		</>
	)
}

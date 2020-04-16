import React from "react"
import { Platform as RNPlatform } from "react-native"

export { RNPlatform }

export function Platform(props) {
	const { all, web, native, android, ios, children, ...nextProps } = props

	const component = {
		web: web || all,
		android: android || native || all,
		ios: ios || native || all,
	}[RNPlatform.OS]

	if (!component) {
		return null
	} else if (typeof component === "function") {
		return React.createElement(component, nextProps, children)
	} else {
		return children
	}
}

export function Web({ component, ...props }) {
	return Platform({ web: component || true, ...props })
}

export function Native({ component, ...props }) {
	return Platform({ native: component || true, ...props })
}

export function Android({ component, ...props }) {
	return Platform({ android: component || true, ...props })
}

export function IOS({ component, ...props }) {
	return Platform({ ios: component || true, ...props })
}

Platform.OS = RNPlatform.OS
Platform.select = RNPlatform.select
Platform.web = RNPlatform.OS === "web"
Platform.native = RNPlatform.OS !== "web"
Platform.android = RNPlatform.OS === "android"
Platform.ios = RNPlatform.OS === "ios"

import { StyleSheet } from "react-native"
import { Metrics } from "../theme"

const Components = {}
for(let [key, value] of Object.entries(Metrics.spacing)) {
	Components[key] = {
		margin: value
	}
}

const Spacings = {}
for(let [key, value] of Object.entries(Metrics.spacing)) {
	Spacings[key] = {
		flexBasis: value
	}
}

const Sizes = {}
for(let [key, value] of Object.entries(Metrics.size)) {
	Sizes[key] = {
		height: value
	}
}

const Padding = {}
for(let [key, value] of Object.entries(Metrics.size)) {
	Padding[key] = {
		padding: value
	}
}

const MetricsStyles = {
	components: StyleSheet.create(Components),
	spacing: StyleSheet.create(Spacings),
	sizes: StyleSheet.create(Sizes),
	padding: StyleSheet.create(Padding),
}

export default MetricsStyles

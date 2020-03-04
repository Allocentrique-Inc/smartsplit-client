import { StyleSheet } from "react-native"
import { Metrics } from "../theme"

const Components = {}
for(let [key, value] of Object.entries(Metrics.spacing.components)) {
	Components[key] = {
		margin: value
	}
}

const Sizes = {}
for(let [key, value] of Object.entries(Metrics.size)) {
	Sizes[key] = {
		height: value
	}
}

const MetricsStyles = {
	components: StyleSheet.create(Components),
	sizes: StyleSheet.create(Sizes),
}

export default MetricsStyles

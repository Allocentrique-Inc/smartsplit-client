import React from "react"
import Svg, { G, Path } from "react-native-svg"
import {
	degreesToRadians,
	lightenDarkenColor,
	rotatePoint,
} from "../utils/utils"
export function usePieChartSlices(data, maxRange, clockwise, size) {
	const angleRange = maxRange ? maxRange : 360
	const shareAngle =
		(clockwise ? -1 : 1) * degreesToRadians(angleRange / getShareTotal(data))
	const center = {
		x: size / 2,
		y: size / 2,
	}
	const radius = size / 2

	let start = {
		x: center.x,
		y: center.y - radius,
	}

	return data.map((dataPoint) => {
		const end = rotatePoint(start, center, dataPoint.share * shareAngle)
		const slice = (
			<PieChartSlice
				start={start}
				end={end}
				center={center}
				radius={radius}
				angle={dataPoint.share * shareAngle}
				color={dataPoint.color}
				clockwise={clockwise}
				key={dataPoint.key}
			/>
		)
		start = end
		return slice
	})
}

export function getShareTotal(data) {
	let total = 0
	for (let dataPoint of data) {
		total += dataPoint.share
	}
	return total
}

export function PieChart(props) {
	const { data, clockwise, size, children, maxRange } = props
	const slices = data
		? usePieChartSlices(data, maxRange, clockwise, size)
		: null

	return (
		<Svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{slices}
			{children && <G>{children}</G>}
		</Svg>
	)
}

function PieChartSlice(props) {
	const {
		start,
		end,
		center,
		radius,
		angle,
		rotation,
		clockwise,
		color,
		focus,
		...nextProps
	} = props
	const data = `M${center.x},${center.y} L${start.x},${
		start.y
	} A${radius},${radius} ${rotation ? rotation : 0} ${
		Math.abs(angle) > Math.PI ? 1 : 0
	},${clockwise ? 0 : 1} ${end.x},${end.y} z`
	return (
		<Path
			d={data}
			fill={focus ? lightenDarkenColor(color, 10) : color}
			stroke="white"
			strokeWidth="1"
			{...nextProps}
		/>
	)
}

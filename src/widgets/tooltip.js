import React, { useState, useEffect, useMemo } from "react"
import { useStates } from "../utils/react"
import { View } from "react-native"
import { Svg, Path } from "react-native-svg"
import { Layer } from "../layout"
import { Overlay } from "../portals"
import { Text } from "../text"
import { Colors } from "../theme"

const ARROW_SIZE = 10

export default function RelativeTooltip({
	relativeTo,
	children,
	viewProps = {},
	...nextProps
}) {
	const [rel, setRelativePosition] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	})

	useEffect(() => {
		relativeTo.current.measure((x, y, width, height, pageX, pageY) => {
			setRelativePosition({ x: pageX, y: pageY, width, height })
		})
	}, [relativeTo])

	return (
		<PopoverTooltip
			x={rel.x + rel.width / 2}
			y={rel.y + rel.height / 2}
			{...nextProps}
		>
			{children}
		</PopoverTooltip>
	)
}

export function PopoverTooltip({
	visible,
	arrow,
	x,
	y,
	width,
	height,
	children,
	viewProps = {},
	...nextProps
}) {
	const [side, align] = (arrow || "").split("-")
	const [layout, setLayout] = useState({ width: 0, height: 0 })

	function handleLayout(event) {
		setLayout(event.nativeEvent.layout)

		if (viewProps.onLayout) {
			viewProps.onLayout(event)
		}
	}

	if (side === "bottom") y -= layout.height + ARROW_SIZE * 2
	if (side === "right") x -= layout.width + ARROW_SIZE * 2

	if (side === "bottom" || side === "top") {
		y += ARROW_SIZE

		if (align === "center") {
			x -= layout.width / 2
		} else if (align === "right") {
			x -= layout.width
		}
	} else if (side === "left" || side === "right") {
		x += ARROW_SIZE

		if (align === "center") {
			y -= layout.height / 2
		} else if (align === "bottom") {
			y -= layout.height
		}
	}

	const style = {
		position: "absolute",
		left: x,
		top: y,
		width: width,
		height: height,
	}

	return (
		<Overlay.Portal>
			{visible && (
				<Tooltip
					viewProps={{
						...viewProps,
						style: [style, viewProps.style],
						onLayout: handleLayout,
					}}
					arrow={arrow}
					{...nextProps}
				>
					{children}
				</Tooltip>
			)}
		</Overlay.Portal>
	)
}

export function Tooltip({
	arrow = "bottom-center",
	text,
	children,
	viewProps = {},
}) {
	const [layout, setLayout] = useState({ width: 20, height: 20 })

	function handleLayout(event) {
		setLayout(event.nativeEvent.layout)

		if (viewProps.onLayout) {
			viewProps.onLayout(event)
		}
	}

	const size = ARROW_SIZE
	const [path, viewBox] = useMemo(() => {
		const [side, align] = arrow.split("-")
		const line = ["M", size, size]
		let viewBox = [0, 0, layout.width, layout.height]
		const width = layout.width - size - size
		const height = layout.height - size - size

		// Haut
		if (side === "top") {
			const drawArrow = ["l", size, -size, "l", size, size]

			if (align === "right") {
				line.push("h", width - size - size)
			} else if (align === "center") {
				line.push("h", width / 2 - size)
			}

			line.push(...drawArrow)
		}

		line.push("H", layout.width - size)

		// Droite
		if (side === "right") {
			const drawArrow = ["l", size, size, "l", -size, size]

			if (align === "bottom") {
				line.push("v", height - size - size)
			} else if (align === "center") {
				line.push("v", height / 2 - size)
			}

			line.push(...drawArrow)
		}

		line.push("V", layout.height - size)

		// Bas
		if (side === "bottom") {
			const drawArrow = ["l", -size, size, "l", -size, -size]

			if (align === "left") {
				line.push("h", -width + size + size)
			} else if (align === "center") {
				line.push("h", -width / 2 + size)
			}

			line.push(...drawArrow)
		}

		line.push("H", size)

		// Gauche
		if (side === "left") {
			const drawArrow = ["l", -size, -size, "l", size, -size]

			if (align === "top") {
				line.push("v", -height + size + size)
			} else if (align === "center") {
				line.push("v", -height / 2 + size)
			}

			line.push(...drawArrow)
		}

		line.push("V", size)

		return [line.join(" "), viewBox.join(" ")]
	}, [layout, size, arrow])

	return (
		<View
			{...viewProps}
			style={[viewProps.style, { padding: size }]}
			onLayout={handleLayout}
		>
			<Svg
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
				}}
				viewBox={viewBox}
			>
				<Path
					stroke={Colors.stroke}
					fill={Colors.background.underground}
					d={path}
				/>
			</Svg>

			<View style={{ flex: 1, alignItems: "stretch" }}>
				{children || (
					<Layer padding="component">
						<Text>{text}</Text>
					</Layer>
				)}
			</View>
		</View>
	)
}

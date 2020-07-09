import React, { useState, useEffect, useLayoutEffect, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import CopyrightIcon from "../../svg/copyright"
import {
	getShareTotal,
	PieChart,
	usePieChartSlices,
} from "../../widgets/pie-chart"
import Svg, { Circle, G, Line, Text as TextSvg } from "react-native-svg"
import { Colors, Metrics } from "../../theme"
import {
	formatPercentage,
	rotatePoint,
	translatePoint,
	vectorOf,
} from "../../utils/utils"
import { useFocusGroup } from "../../utils/hooks"
import { useDispatch } from "react-redux"
import { Overlay } from "../../portals"
import RelativeTooltip, { PopoverTooltip } from "../../widgets/tooltip"
import { Text } from "../../text"

const TooltipStyles = StyleSheet.create({
	frame: {
		backgroundColor: Colors.background.underground_reversed,
	},
	text: {},
})

const TooltipInitialState = {
	vector: {
		x: null,
		y: null,
	},
	percent: null,
	name: null,
}
export default function SplitChart(props) {
	const { data } = props
	const shareTotal = getShareTotal(data)
	const shareHolders = useState(extractUserData(data))[0]
	const size = 4 * Metrics.size.huge
	const copyrightIconSize = size / 3
	const copyrightIconCenter = {
		x: copyrightIconSize / 2,
		y: copyrightIconSize / 2,
	}
	const chartCenter = {
		x: size / 2,
		y: size / 2,
	}
	const copyrightIconVector = vectorOf(copyrightIconCenter, chartCenter)
	const scale = copyrightIconSize / 128
	const preSlices = usePieChartSlices(data, null, false, size)
	const [slices, currentFocus] = useFocusGroup(
		preSlices,
		handleFocus,
		handleBlur
	)
	const [tooltipData, setTooltipData] = useState(TooltipInitialState)
	const centerVectors = generateSharecenterVectors(slices, chartCenter)

	function handleFocus(key) {
		const shareHolder = shareHolders.get(key)
		setTooltipData({
			vector: centerVectors.get(key),
			percent: (shareHolder.share / shareTotal) * 100,
			name: shareHolder.name,
		})
	}

	function handleBlur() {
		setTooltipData(TooltipInitialState)
	}

	return (
			<View>
				<Overlay.ProviderContainer>
					<PieChart size={size}>
						{Array.from(slices)}
						<Circle
							cx={chartCenter.x}
							cy={chartCenter.y}
							r={size / 4}
							fill={Colors.primary_reversed}
						/>
						<G
							translate={`${copyrightIconVector.x} ${copyrightIconVector.y}`}
							scale={scale}
						>
							<CopyrightIcon />
						</G>
					</PieChart>

					<PopoverTooltip
						arrow="bottom-center"
						interactive={false}
						visible={!!currentFocus}
						x={tooltipData.vector.x + chartCenter.x}
						y={tooltipData.vector.y + chartCenter.y}
						width={200}
						height={100}
						backgroundColor={Colors.background.underground_reversed}
					>
						<Text reversed bold>
							{tooltipData.name}
						</Text>
						<Text reversed>{formatPercentage(tooltipData.percent)}</Text>
					</PopoverTooltip>
				</Overlay.ProviderContainer>
			</View>
	)
}

function generateSharecenterVectors(slices, absChartCenter) {
	const centers = new Map()
	slices.forEach((slice, key) => {
		const sliceProps = slice.props
		const relArcCenter = rotatePoint(
			sliceProps.start,
			sliceProps.center,
			sliceProps.angle / 2
		)
		centers.set(key, vectorOf(absChartCenter, relArcCenter, 3 / 4))
	})
	return centers
}

function extractUserData(data) {
	const shareHolders = new Map()
	data.forEach((user) => {
		shareHolders.set(user.key, {
			name: user.name,
			share: user.share,
		})
	})
	return shareHolders
}

export function DualSplitChart(props) {
	const { dataLeft, dataRight, titleLeft, titleRight } = props
	const chartSize = 4 * Metrics.size.huge
	const containerSize = chartSize + Metrics.spacing.large
	const copyrightIconSize = chartSize / 3
	const copyrightIconCenter = {
		x: copyrightIconSize / 2,
		y: copyrightIconSize / 2,
	}
	const containerCenter = {
		x: containerSize / 2,
		y: containerSize / 2,
	}

	const centerVector = vectorOf(copyrightIconCenter, containerCenter)
	const scale = copyrightIconSize / 128
	const rightPreSlices = usePieChartSlices(dataLeft, 180, false, chartSize)
	const leftPreSlices = usePieChartSlices(dataRight, 180, true, chartSize)
	const [rightSlices, rightCurrentFocus] = useFocusGroup(rightPreSlices)
	const [leftSlices, leftCurrentFocus] = useFocusGroup(leftPreSlices)

	return (
		<Svg
			width={containerSize}
			height={containerSize}
			viewBox={`0 0 ${containerSize} ${containerSize}`}
			fill="none"
		>
			<G>
				<PieChart size={chartSize} maxRange={180}>
					{Array.from(leftSlices)}
				</PieChart>
			</G>
			<Line
				x1={containerSize / 2}
				y1={0}
				x2={containerSize / 2}
				y2={chartSize}
				stroke={Colors.stroke}
				strokeWidth={1}
			/>
			<G translate={`${Metrics.spacing.large} 0`}>
				<PieChart size={chartSize} maxRange={180}>
					{Array.from(rightSlices)}
				</PieChart>
			</G>
			<Circle
				cx={containerCenter.x}
				cy={containerCenter.y}
				r={chartSize / 4}
				fill={Colors.primary_reversed}
			/>
			<G translate={`${centerVector.x} ${centerVector.y}`} scale={scale}>
				<CopyrightIcon />
			</G>
			{}
			{titleLeft && (
				<TitleText
					textAnchor="end"
					x={chartSize / 2}
					y={chartSize + Metrics.spacing.large}
				>
					{titleLeft.toUpperCase()}
				</TitleText>
			)}
			{titleRight && (
				<TitleText
					x={chartSize / 2 + Metrics.spacing.large}
					y={chartSize + Metrics.spacing.large}
				>
					{titleRight.toUpperCase()}
				</TitleText>
			)}
		</Svg>
	)
}

function TitleText(props) {
	const { children, ...nextProps } = props
	return (
		<TextSvg
			{...nextProps}
			fill={Colors.primary}
			stroke={Colors.primary}
			fontSize="12"
			fontWeight="bold"
			fontFamily="sans-serif"
			letterSpacing={1}
		>
			{children}
		</TextSvg>
	)
}

import React, { useState, useEffect, useLayoutEffect, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import {
	getShareTotal,
	PieChart,
	usePieChartSlices,
} from "../../widgets/pie-chart"
import Svg, { Circle, G, Line, Text as TextSvg } from "react-native-svg"
import { Colors, Metrics } from "../../theme"
import { formatPercentage, rotatePoint, vectorOf } from "../../utils/utils"
import { useFocusGroup } from "../../utils/hooks"
import { Overlay } from "../../portals"
import { PopoverTooltip } from "../../widgets/tooltip"
import { Text } from "../../text"
import { Column } from "../../layout"

export default function SplitChart({ data, logo }) {
	const size = 4 * Metrics.size.huge
	const chartCenter = { x: size / 2, y: size / 2 }
	const Logo = useCenterLogo(size, chartCenter, logo)
	const preSlices = usePieChartSlices(data, null, false, size)
	const [TooltipWrapper, handlers] = useTooltips(data, preSlices, chartCenter)
	const [slices, currentFocus] = useFocusGroup(
		preSlices,
		handlers.handleFocus,
		handlers.handleBlur
	)
	return (
		<TooltipWrapper visible={!!currentFocus}>
			<PieChart size={size}>
				{Array.from(slices)}
				{Logo}
			</PieChart>
		</TooltipWrapper>
	)
}

export function DualSplitChart(props) {
	const { dataLeft, dataRight, titleLeft, titleRight, logo } = props
	const chartSize = 4 * Metrics.size.huge
	const containerSize = chartSize + Metrics.spacing.large
	const containerCenter = { x: containerSize / 2, y: containerSize / 2 }
	const leftChartCenter = { x: chartSize / 2, y: chartSize / 2 }
	const rightChartCenter = {
		x: chartSize / 2 + Metrics.spacing.large * 4,
		y: chartSize / 2,
	}
	const Logo = useCenterLogo(chartSize, containerCenter, logo)
	const rightPreSlices = usePieChartSlices(dataLeft, 180, false, chartSize)
	const leftPreSlices = usePieChartSlices(dataRight, 180, true, chartSize)
	const [LeftTooltipWrapper, leftHandlers] = useTooltips(
		dataLeft,
		leftPreSlices,
		leftChartCenter
	)
	const [RightTooltipWrapper, rightHandlers] = useTooltips(
		dataRight,
		rightPreSlices,
		rightChartCenter
	)

	const [rightSlices, rightCurrentFocus] = useFocusGroup(
		rightPreSlices,
		rightHandlers.handleFocus,
		rightHandlers.handleBlur
	)
	const [leftSlices, leftCurrentFocus] = useFocusGroup(
		leftPreSlices,
		leftHandlers.handleFocus,
		leftHandlers.handleBlur
	)

	return (
		<LeftTooltipWrapper visible={!!leftCurrentFocus}>
			<RightTooltipWrapper visible={!!rightCurrentFocus}>
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
					{Logo}
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
			</RightTooltipWrapper>
		</LeftTooltipWrapper>
	)
}

const TooltipInitialState = {
	vector: {
		x: null,
		y: null,
	},
	percent: null,
	name: null,
}

function useCenterLogo(size, center, Logo) {
	if (!Logo) return null

	const logoSize = size / 3
	const logoCenter = {
		x: logoSize / 2,
		y: logoSize / 2,
	}
	const logoVector = vectorOf(logoCenter, center)
	const scale = logoSize / 128
	return (
		<>
			<Circle
				cx={center.x}
				cy={center.y}
				r={size / 4}
				fill={Colors.primary_reversed}
			/>
			<G translate={`${logoVector.x} ${logoVector.y}`} scale={scale}>
				<Logo />
			</G>
		</>
	)
}

function useTooltips(data, slices, center) {
	const shareTotal = getShareTotal(data)
	const shareHolders = useState(extractUserData(data))[0]
	const [tooltipData, setTooltipData] = useState(TooltipInitialState)
	const centerVectors = generateShareCenterVectors(slices, center)
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

	return [
		({ visible, children }) => (
			<View>
				<Overlay.ProviderContainer>
					{children}
					<PopoverTooltip
						arrow="bottom-center"
						interactive={false}
						visible={visible}
						x={tooltipData.vector.x + center.x}
						y={tooltipData.vector.y + center.y}
						width={200}
						height={100}
						backgroundColor={Colors.background.underground_reversed}
					>
						<Column of="tiny" style={{ padding: Metrics.spacing.inside }}>
							<Text reversed bold>
								{tooltipData.name}
							</Text>
							<Text reversed>{formatPercentage(tooltipData.percent)}</Text>
						</Column>
					</PopoverTooltip>
				</Overlay.ProviderContainer>
			</View>
		),
		{ handleFocus, handleBlur },
	]
}

function generateShareCenterVectors(slices, absChartCenter) {
	const centers = new Map()
	for (let slice of slices) {
		const props = slice.props
		const relArcCenter = rotatePoint(props.start, props.center, props.angle / 2)
		centers.set(slice.key, vectorOf(absChartCenter, relArcCenter, 3 / 4))
	}
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

import React, { useState } from "react"
import { View } from "react-native"
import { observer } from "mobx-react"
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

const SplitChart = observer(({ data, logo, size = 4 * Metrics.size.huge }) => {
	const chartCenter = { x: size / 2, y: size / 2 }
	const preSlices = usePieChartSlices(data, null, true, size)
	const [TooltipWrapper, handlers] = useTooltips(data, preSlices, chartCenter)
	const [slices, currentFocus] = useFocusGroup(
		preSlices,
		handlers.handleFocus,
		handlers.handleBlur
	)
	return (
		<TooltipWrapper visible={!!currentFocus}>
			<PieChart size={size}>
				{Array.from(slices.values())}
				<CenterLogo size={size} center={chartCenter} logo={logo} />
			</PieChart>
		</TooltipWrapper>
	)
})

export function DualSplitChart({
	dataLeft,
	dataRight,
	titleLeft,
	titleRight,
	logo,
	size = 4 * Metrics.size.huge,
}) {
	const containerSize = size + Metrics.spacing.large
	const chartCenter = { x: containerSize / 2, y: size / 2 }
	const leftChartCenter = { x: size / 2, y: size / 2 }
	const rightChartCenter = {
		x: size / 2 + Metrics.spacing.large * 4,
		y: size / 2,
	}
	const rightPreSlices = usePieChartSlices(dataRight, 180, true, size)
	const leftPreSlices = usePieChartSlices(dataLeft, 180, false, size)
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
						<PieChart size={size} maxRange={180}>
							{Array.from(leftSlices.values())}
						</PieChart>
					</G>
					<Line
						x1={containerSize / 2}
						y1={0}
						x2={containerSize / 2}
						y2={size}
						stroke={Colors.stroke}
						strokeWidth={1}
					/>
					<G x={Metrics.spacing.large}>
						<PieChart size={size} maxRange={180}>
							{Array.from(rightSlices.values())}
						</PieChart>
					</G>
					<CenterLogo size={size} center={chartCenter} logo={logo} />
					{titleLeft && (
						<TitleText
							textAnchor="end"
							x={size / 2}
							y={size + Metrics.spacing.large}
						>
							{titleLeft.toUpperCase()}
						</TitleText>
					)}
					{titleRight && (
						<TitleText
							x={size / 2 + Metrics.spacing.large}
							y={size + Metrics.spacing.large}
						>
							{titleRight.toUpperCase()}
						</TitleText>
					)}
				</Svg>
			</RightTooltipWrapper>
		</LeftTooltipWrapper>
	)
}

function CenterLogo({ size, center, logo }) {
	if (!logo) return null

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
			<G x={logoVector.x} y={logoVector.y} scale={scale}>
				{React.createElement(logo)}
			</G>
		</>
	)
}

const TooltipInitialState = {
	vector: {
		x: undefined,
		y: undefined,
	},
	percent: undefined,
	name: undefined,
}

function useTooltips(data, slices, center) {
	const shareTotal = getShareTotal(data)

	const [tooltipData, setTooltipData] = useState(TooltipInitialState)
	const centerVectors = generateShareCenterVectors(slices, center)
	function handleFocus(key) {
		const shareHolder = data.filter((shareHolder) => shareHolder.key === key)[0]
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

export default SplitChart

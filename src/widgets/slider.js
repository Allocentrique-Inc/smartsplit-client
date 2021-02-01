import React, { useRef, useState, useEffect } from "react"
import ProgressBar from "./progress-bar"
import { Colors, Metrics } from "../theme"
import {
	View,
	StyleSheet,
	PanResponder,
	TouchableWithoutFeedback,
} from "react-native"
import { action, observable, reaction, toJS, trace } from "mobx"
import { observer } from "mobx-react"
import { assignEnumProps, capValueWithinRange } from "../utils/utils"
import { useInterpolators } from "../utils/hooks"

const getStyles = (disabled) =>
	StyleSheet.create({
		handleContainer: {
			position: "absolute",
			top: Metrics.spacing.xsmall,
			left: -Metrics.spacing.small,
			cursor: "pointer",
		},

		handle: {
			height: Metrics.size.xsmall,
			width: Metrics.size.xsmall,
			backgroundColor: Colors.background.ground,
			borderWidth: 1,
			borderRadius: 50,
			borderColor: Colors.stroke,
		},

		touchBarContainer: {
			flex: 1,
			paddingTop: Metrics.spacing.small,
			paddingBottom: Metrics.spacing.small,
			cursor: disabled ? "not-allowed" : "pointer",
		},

		barContainer: {
			backgroundColor: Colors.background.hell,
			borderWidth: 1,
			borderColor: Colors.stroke,
			borderRadius: 1000,
			flex: 1,
		},

		bar: {
			borderRadius: 1000,
		},
	})

const Slider = observer(
	({
		min = 0,
		max = 100,
		value,
		onChange,
		disabled,
		color,
		step,
		vertical,
	}) => {
		// trace(true)
		const [barLayout] = useState(() =>
			observable({
				px: 0,
				py: 0,
				width: 0,
				height: 0,
			})
		)

		const [interpolators] = useState(() =>
			observable({
				valueToDp: () => 0,
				dpToValue: () => 0,
			})
		)

		const [sliderState] = useState(() =>
			observable({
				handlePosition: interpolators.valueToDp(value),
				offset: 0,
			})
		)
		const styles = getStyles(disabled)

		// const dpStep = step ? valueToDp(step) : 1
		const containerRef = useRef(null)
		const panResponder = useRef(
			PanResponder.create({
				onMoveShouldSetPanResponderCapture: () => true,
				onPanResponderGrant: (evt) => initHandleMove(evt),
				onPanResponderMove: (_, gestureState) => onHandleMove(gestureState),
				onPanResponderRelease: onTouchRelease,
			})
		).current

		function onBarLayout() {
			containerRef.current.measure((fx, fy, width, height, px, py) => {
				// console.log("ONBARLAYOUT", width, height, px, py)
				assignEnumProps(barLayout, { px, py, width, height })
				// if (value && value > 0) sliderState.handlePosition = valueToDp(value)
				const [fun1, fun2] = useInterpolators(
					[min, max],
					[0, vertical ? barLayout.height : barLayout.width]
				)
				interpolators.valueToDp = fun1
				interpolators.dpToValue = fun2
				// console.log("whoohooo", barLayout)

				if (value && value > 0)
					sliderState.handlePosition = interpolators.valueToDp(value)
			})
		}

		function initHandleMove(e) {
			// console.log("BAARRRLOAYOUT ANFLW MOC", barLayout)

			sliderState.offset = vertical
				? e.nativeEvent.pageY - barLayout.py
				: e.nativeEvent.pageX - barLayout.px
		}

		function onHandleMove(gestureState) {
			const position = capValueWithinRange(
				(vertical ? gestureState.dy : gestureState.dx) + sliderState.offset,
				[0, vertical ? barLayout.height : barLayout.width]
			)
			sliderState.handlePosition = position
			// console.log("DP TO VALUE POSITION", interpolators.dpToValue(position) )
			onChange(interpolators.dpToValue(position))

			// Trigger onChange only when accumulated distance is
			// around a multiple of dpStep
			// if (Math.abs(gestureState.dx % dpStep) < 0.5) {
			// }
		}

		function onBarPressIn(e) {
			if (disabled) return
			const position = vertical
				? e.nativeEvent.pageY - barLayout.py
				: e.nativeEvent.pageX - barLayout.px
			sliderState.handlePosition = position
			onChange(interpolators.dpToValue(position))
		}

		function onTouchRelease() {
			sliderState.offset = 0
		}

		return (
			<>
				<TouchableWithoutFeedback onPressIn={onBarPressIn}>
					<View
						style={styles.touchBarContainer}
						ref={containerRef}
						onLayout={onBarLayout}
					>
						<ProgressBar
							size="xsmall"
							progress={
								(interpolators.dpToValue(sliderState.handlePosition) / max) *
								100
							}
							barStyle={styles.bar}
							style={styles.barContainer}
							color={color}
						/>
					</View>
				</TouchableWithoutFeedback>
				{!disabled && (
					<View
						style={[
							styles.handleContainer,
							{
								transform: [{ translateX: sliderState.handlePosition }],
							},
						]}
						{...panResponder.panHandlers}
					>
						<View style={styles.handle} />
					</View>
				)}
			</>
		)
	}
)

export default Slider

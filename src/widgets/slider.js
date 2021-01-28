import React, { useRef, useState, useEffect } from "react"
import ProgressBar from "./progress-bar"
import { Colors, Metrics } from "../theme"
import {
	View,
	StyleSheet,
	PanResponder,
	TouchableWithoutFeedback,
} from "react-native"
import { action, observable, reaction, toJS } from "mobx"
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
		const [barLayout, setBarLayout] = useState({
				px: 0,
				py: 0,
				width: 0,
				heigth: 0,
			})
		const [touchOffset, setTouchOffset] = useState(0)
		const [handlePosition, setHandlePosition] = useState(0)
		
		console.log("SLIDER LAYOUT", barLayout)

		const styles = getStyles(disabled)

		const [valueToDp, dpToValue] = useInterpolators(
			[min, max],
			[0, vertical ? barLayout.height : barLayout.width]
		)
		const dpStep = step ? valueToDp(step) : 1
		const containerRef = useRef(null)
		const panResponder = useRef(
			PanResponder.create({
				onMoveShouldSetPanResponderCapture: () => true,
				onPanResponderGrant: (evt) => initHandleMove(evt),
				onPanResponderMove: (_, gestureState) => onHandleMove(gestureState),
				onPanResponderRelease: () => setTouchOffset(0),
			})
		).current

		useEffect(() => {
			const position = capValueWithinRange(valueToDp(value), [
				0,
				vertical ? barLayout.height : barLayout.width,
			])
			setHandlePosition(position)
		}, [value])

		// reaction(
		// 	() => value,
		// 	() => {
		// 		const position = capValueWithinRange(valueToDp(value), [
		// 			0,
		// 			vertical ? barLayout.height : barLayout.width,
		// 		])
		// 		setHandlePosition(position)
		// 	}
		// )
		// Update interpolators and dpStep on bar layout change
		// reaction(
		// 	() => {
		// 		return { ...barLayout }
		// 	},
		// 	() => {
		// 		;[valueToDp, dpToValue] = useInterpolators(
		// 			[min, max],
		// 			[0, vertical ? barLayout.height : barLayout.width]
		// 		)
		// 		dpStep = step ? valueToDp(step) : 1
		// 	}
		// )


		function onBarLayout () {
			containerRef.current.measure((fx, fy, width, height, px, py) => {
				console.log("ONBARLAYOUT", width, height, px, py)
				setBarLayout({width, height, px, py})
				if (value && value > 0) setHandlePosition(valueToDp(value))
			})
		}

		function initHandleMove(e) {
			setTouchOffset(
				vertical
					? e.nativeEvent.pageY - barLayout.py
					: e.nativeEvent.pageX - barLayout.px
			)
		}

		function onHandleMove(gestureState) {
			const position = capValueWithinRange(
				(vertical ? gestureState.dy : gestureState.dx) + touchOffset.get(),
				[0, vertical ? barLayout.height : barLayout.width]
			)
			setHandlePosition(position)

			// Trigger onChange only when accumulated distance is
			// around a multiple of dpStep
			if (Math.abs(gestureState.dx % dpStep) < 0.5) {
				onChange(dpToValue(position))
			}
		}

		function onBarPressIn(e) {
			if (disabled) return
			setHandlePosition(
				vertical
					? e.nativeEvent.pageY - barLayout.py
					: e.nativeEvent.pageX - barLayout.px
			)
			onChange(dpToValue(handlePosition))
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
							progress={(dpToValue(handlePosition) / max) * 100}
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
								transform: [{ translateX: handlePosition }],
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

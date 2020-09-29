import React, { useRef, useState, useLayoutEffect } from "react"
import ProgressBar from "./progress-bar"
import { Colors, Metrics } from "../theme"
import {
	View,
	StyleSheet,
	PanResponder,
	Animated,
	TouchableWithoutFeedback,
} from "react-native"
import { observable, observe } from "mobx"
import { observer } from "mobx-react"
import { assignEnumProps, capValueWithinRange } from "../utils/utils"
import { useInterpolator } from "../utils/hooks"

const Styles = StyleSheet.create({
	handleContainer: {
		position: "absolute",
		top: Metrics.spacing.xsmall,
		left: -Metrics.spacing.small,
	},

	handle: {
		height: Metrics.size.xsmall,
		width: Metrics.size.xsmall,
		backgroundColor: Colors.background.ground,
		borderWidth: 1,
		borderRadius: 50,
		borderColor: Colors.stroke,
		cursor: "pointer",
	},

	touchBarContainer: {
		width: "100%",
		paddingTop: Metrics.spacing.small,
		paddingBottom: Metrics.spacing.small,
		cursor: "pointer",
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
		onChange = () => {},
		disabled,
		color,
		vertical,
	}) => {
		const [barLayout] = useState(() =>
			observable({
				px: 0,
				py: 0,
				width: 0,
				heigth: 0,
			})
		)
		let [valueToDp, dpToValue] = useInterpolator(
			[min, max],
			[0, vertical ? barLayout.height : barLayout.width]
		)
		const [touchOffset] = useState(() => observable.box(0))
		const containerRef = useRef(null)
		const [handlePosition] = useState(() => observable.box(0))
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
				assignEnumProps(barLayout, { px, py, width, height })
				valueToDp = useInterpolator(
					[min, max],
					[0, vertical ? barLayout.height : barLayout.width]
				)[0]
				dpToValue = useInterpolator(
					[min, max],
					[0, vertical ? barLayout.height : barLayout.width]
				)[0]
				if (value && value > 0) handlePosition.set(valueToDp(value))
			})
		}

		function initHandleMove(e) {
			touchOffset.set(
				vertical
					? e.nativeEvent.pageY - barLayout.py
					: e.nativeEvent.pageX - barLayout.px
			)
		}

		function onHandleMove(gestureState) {
			const distance =
				(vertical ? gestureState.dy : gestureState.dx) + touchOffset.get()
			handlePosition.set(
				capValueWithinRange(distance, [
					0,
					vertical ? barLayout.height : barLayout.width,
				])
			)
		}

		function onTouchRelease() {
			onChange(dpToValue(handlePosition.get()))
			touchOffset.set(0)
		}

		function onBarPressIn(e) {
			if (disabled) return
			handlePosition.set(
				vertical
					? e.nativeEvent.pageY - barLayout.py
					: e.nativeEvent.pageX - barLayout.px
			)
		}

		return (
			<>
				<TouchableWithoutFeedback onPressIn={onBarPressIn}>
					<View
						style={Styles.touchBarContainer}
						ref={containerRef}
						onLayout={onBarLayout}
					>
						<ProgressBar
							size="xsmall"
							progress={dpToValue(handlePosition.get())}
							barStyle={Styles.bar}
							style={Styles.barContainer}
							color={color}
						/>
					</View>
				</TouchableWithoutFeedback>
				{!disabled && (
					<View
						style={[
							Styles.handleContainer,
							{
								transform: [{ translateX: handlePosition.get() }],
							},
						]}
						{...panResponder.panHandlers}
					>
						<View style={Styles.handle} />
					</View>
				)}
			</>
		)
	}
)

export default Slider

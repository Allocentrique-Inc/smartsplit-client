import React, { useState, useEffect } from "react"
import { Svg, Path, Circle } from "react-native-svg"
import { Colors } from "../theme"
/**
 * a rotating loader SVG
 */
export default class AutocompleteLoading extends React.Component {
	constructor(props) {
		super(props)
		if (props.color) this.setState({ ...this.state, color: props.color })
	}
	state = {
		rotation: 0,
		color: Colors.action,
	}
	interval
	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState({
				rotation: this.state.rotation === 360 ? 0 : this.state.rotation + 5,
			})
		}, 10)
	}
	componentWillUnmount() {
		clearInterval(this.interval)
	}

	// we use an effect to mimic the animation which is not support yet
	// in svg-react-native, so we're doing it manually
	render() {
		return (
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					margin: "auto",
					background: "transparent",
					display: "block",
					shapeRendering: "auto",
				}}
				width="24"
				height="24"
				viewBox="0 0 100 100"
				rotation={this.state.rotation}
				preserveAspectRatio="xMidYMid"
			>
				<Circle
					cx="50"
					cy="50"
					fill="none"
					stroke={this.state.color}
					strokeWidth="10"
					r="35"
					strokeDasharray={[164.93361431346415, 56.97787143782138]}
				/>
			</Svg>
		)
	}
}

import React, { useState } from "react"
import {
	TouchableOpacity,
	Platform,
	Text,
	View,
	StyleSheet,
} from "react-native"
import styled from "styled-components/native"
import DateTimePicker from "@react-native-community/datetimepicker" //For mobile
import DatePicker from "react-datepicker" //For web
import "react-datepicker/dist/react-datepicker-cssmodules.css"

const DatePickerStyle = StyleSheet.create({
	container: {
		display: "block",
		width: "100%",
	},
	reactDatepickerWrapper: {
		display: "block",
		width: "100%",
	},
	reactDatepickerInputContainer: {
		display: "block",
		width: "100%",
	},
})

export const WebDatePicker = () => {
	const [startDate, setStartDate] = useState(new Date())
	return (
		<DatePicker
			style={DatePickerStyle.reactDatepickerWrapper}
			selected={startDate}
			onChange={(date) => setStartDate(date)}
		/>
	)
}

const DatePickerContainer = styled.TouchableOpacity`
	background-color: ${Platform.OS === "ios" ? "#00000066" : "transparent"};
	position: absolute;
	justify-content: flex-end;
	width: 100%;
	height: 100%;
`

const DatePickerHeader = styled.View`
	width: 100%;
	padding: 16px;
	justify-content: flex-end;
	align-items: flex-end;
	background-color: white;
	border-bottom-width: 1;
	border-color: grey;
`

export class MobileDatePicker extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			date: new Date(this.props.date),
		}
	}

	render() {
		const { onClose, onChange } = this.props
		const { date } = this.state

		return (
			<DatePickerContainer onPress={onClose}>
				{Platform.OS === "ios" && (
					<DatePickerHeader>
						<TouchableOpacity onPress={onClose}>
							<Text>Done</Text>
						</TouchableOpacity>
					</DatePickerHeader>
				)}
				<DateTimePicker
					value={date}
					mode="date"
					display="default"
					onChange={(e, d) => {
						if (Platform.OS === "ios") {
							this.setState({ date: d })
							onChange(d)
						} else {
							onClose(d)
						}
					}}
					style={{ backgroundColor: "white" }}
				/>
			</DatePickerContainer>
		)
	}
}

export default function DatePickers(props) {
	return (
		<View>
			{Platform.OS === "web" ? <WebDatePicker /> : <MobileDatePicker />}
		</View>
	)
}

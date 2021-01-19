import React, { useState } from "react"
import {
	TouchableOpacity,
	Platform,
	Text,
	View,
	StyleSheet,
} from "react-native"
import { useTranslation } from "react-i18next"
import styled from "styled-components/native"
import DateTimePicker from "@react-native-community/datetimepicker" //For mobile
import { DateInput } from "semantic-ui-calendar-react" // For web
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { Colors } from "../../theme"
import { observer } from "mobx-react"

const DatePickerStyle = StyleSheet.create({
	container: {
		borderRadius: 2,
		borderColor: Colors.stroke,
	},
})

/* export const WebDatePicker = () => {
	const { DateInput } = SemanticUiCalendarReact
	const [startDate, setStartDate] = useState(new Date())
	return (
		<DatePicker
			style={DatePickerStyle.container}
			selected={startDate}
			onChange={(date) => setStartDate(date)}
		/>
	)
} */

export const WebDatePicker = (props) => {
	const { i18n } = useTranslation()
	let defaultProps = {
		name: "date",
		dateFormat: "DD-MM-YYYY",
		placeholder: "DD-MM-YYYY",
		localization: i18n.language,
	}

	const newProps = { ...defaultProps, ...props }

	return (
		<DateInput
			//style={DatePickerStyle.container}
			{...newProps}
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

const DatePickers = observer(function (props) {
	return (
		<View>
			{Platform.OS === "web" ? (
				<WebDatePicker {...props} />
			) : (
				<MobileDatePicker />
			)}
		</View>
	)
})
export default DatePickers

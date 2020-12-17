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
import "semantic-ui-css/semantic.min.css"
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { Colors } from "../../theme"

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
	const [value, setValue] = useState(new Date()) //new créer un nouvel objet, comme constructor, par défaut existe dans browser JS
	const handleChange = (event, { name, value }) => {
		if (name === "date") {
			setValue(value)
		}
	}
	const { t, i18n } = useTranslation()
	return (
		<DateInput
			//style={DatePickerStyle.container}
			name="date"
			dateFormat="DD-MM-YYYY"
			placeholder="DD-MM-YYYY"
			value={value}
			onChange={handleChange}
			icon={null}
			localization={i18n.language}
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
	const [date, setDate] = useState(new Date()) //En attendant de binder
	return (
		<View>
			{Platform.OS === "web" ? (
				<WebDatePicker value={date} onChange={(v) => setDate(v)} />
			) : (
				<MobileDatePicker />
			)}
		</View>
	)
}

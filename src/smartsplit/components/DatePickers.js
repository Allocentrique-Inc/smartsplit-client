import React, { useState } from "react"
import { observer } from "mobx-react"
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
import { Colors } from "../../theme"
import { titleCase } from "../../utils/utils"
import Label from "../../forms/label"
const DatePickerStyle = StyleSheet.create({
	container: {
		borderRadius: 2,
		borderColor: Colors.stroke,
		color: Colors.inactive,
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

export const WebDatePicker = observer((props) => {
	const { field, onChange, label, subLabel, label_hint, tooltip } = props

	const [value, setValue] = useState(null) //new créer un nouvel objet, comme constructor, par défaut existe dans browser JS

	const { t, i18n } = useTranslation()

	const handleChange = (event, { name, value }) => {
		//console.log(`${name}: ${value}`)
		//name === "date" ? setValue(value) : t("forms:placeholders.date")
		if (name === "date") field ? field.setValue(value) : setValue(value)
		if (onChange) {
			onChange(value)
		}
		/* 	if (name === "date") {
			if (field) field.setValue(value)
			else t("forms:placeholders.date")
		} */
	}

	return (
		<Label
			label={label}
			subLabel={subLabel}
			label_hint={label_hint}
			tooltip={tooltip}
		>
			<DateInput
				//style={DatePickerStyle.container}
				name="date"
				dateFormat="DD-MM-YYYY"
				placeholder={t("forms:placeholders.date")}
				//label={t("document:creation.date")}
				value={field ? field.value : value}
				onChange={handleChange}
				icon={null}
				localization={i18n.language}
			/>
		</Label>
	)
})

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
					placeholder={t("forms:placeholders.date")}
					label={t("document:creation.date")}
				/>
			</DatePickerContainer>
		)
	}
}

export default function DatePickers(props) {
	const { field, onChange, label, subLabel, label_hint, tooltip } = props
	const [date, setDate] = useState(null) //En attendant de binder
	return (
		<View>
			{Platform.OS === "web" ? (
				<WebDatePicker
					field={field}
					onChange={onChange}
					label={label}
					subLabel={subLabel}
					label_hint={label_hint}
					tooltip={tooltip}
				/>
			) : (
				<MobileDatePicker />
			)}
		</View>
	)
}

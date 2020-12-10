import { observer } from "mobx-react"
import { toJS } from "mobx"
import React from "react"
import { useTranslation } from "react-i18next"
import { useStorePath, useStores } from "../../mobX"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Row, Flex, Hairline, Spacer } from "../../layout"
import { Text, Heading, Paragraph } from "../../text"
import XIcon from "../../svg/x"
import { CardStyles } from "../../widgets/card"
import { Colors, Metrics } from "../../theme"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
	frame: {
		backgroundColor: Colors.background.underground,
	},
	frame_error: {
		borderWidth: 1,
		borderColor: Colors.error,
		borderStyle: "solid",
	},
	frame_yourself: {
		borderWidth: 1,
		borderColor: Colors.secondaries.teal,
	},
})

const frameStyle = [CardStyles.frame, Styles.frame]

const InstrumentTag = observer((props) => {
	const { instrument, field, index } = props
	console.log(toJS(instrument))
	return (
		<Row of="component" padding="tiny" style={frameStyle} key={instrument.id}>
			<Column of="inside" flex={1} padding="tiny">
				<Text bold size="tiny">
					{instrument.value.name}
				</Text>
			</Column>
			<Column of="inside" padding="tiny">
				<TouchableWithoutFeedback onPress={() => field.remove(index)}>
					<View>
						<XIcon />
					</View>
				</TouchableWithoutFeedback>
			</Column>
		</Row>
	)
})

export default InstrumentTag

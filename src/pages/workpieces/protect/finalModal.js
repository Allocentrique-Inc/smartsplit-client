import { observer } from "mobx-react"
import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Column, Row } from "../../../layout"
import { Heading, Paragraph } from "../../../text"
import HighFiveSVG from "../../../svg/high-five"

const Styles = StyleSheet.create({
	column: {
		alignItems: "center",
		flex: 12,
	},
	paragraph: {
		paddingTop: 20,
		textAlign: "center",
	},
})

const FinalModal = observer(function (props) {
	const { t } = useTranslation()
	const workpiece = props.workpiece
	return (
		<Column flex={12}>
			<Row al>
				<Column style={Styles.column}>
					<View>
						<HighFiveSVG />
					</View>
				</Column>
			</Row>
			<Row>
				<Column style={Styles.column}>
					<Heading level={4}>{t("protect:finalHeading")}</Heading>
					<Paragraph style={Styles.paragraph}>
						{t("protect:finalContent")}
					</Paragraph>
				</Column>
			</Row>
		</Column>
	)
})
export default FinalModal

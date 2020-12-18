import { observer } from "mobx-react"
import { StyleSheet, View } from "react-native"
import { Column, Row } from "../../../layout"
import { Paragraph } from "../../../text"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import ProgressBar from "../../../widgets/progress-bar"
import WaitingSVG from "../../../svg/waiting-svg"

const Styles = StyleSheet.create({
	heading: {
		paddingTop: "30px",
	},
	paragraph: {
		paddingTop: "20px",
	},
})

const WaitingModal = observer(function (props) {
	const { t } = useTranslation()

	return (
		<Column flex={12}>
			<Row>
				<Column flex={12} align="center">
					<View>
						<WaitingSVG />
					</View>
				</Column>
			</Row>
			<Row>
				<Column flex={4} />
				<Column flex={4}>
					<ProgressBar size="tiny" progress={50} />
				</Column>
				<Column flex={4} />
			</Row>
			<Row style={Styles.heading}>
				<Column flex={12} align="center">
					<Paragraph style={Styles.paragraph}>
						{t("protect:contentProgress")}
					</Paragraph>
				</Column>
			</Row>
		</Column>
	)
})
export default WaitingModal

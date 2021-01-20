import { observer } from "mobx-react"
import Layout from "../../layout"
import React from "react"
import { useCurrentWorkpiece } from "../../context"
import { useTranslation } from "react-i18next"
import { Column, Row } from "../../../../layout"
import { Navbar } from "../../../../smartsplit/components/navbar"
import { Colors, Metrics } from "../../../../theme"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import ArrowLeft from "../../../../svg/arrow-left"
import AlbumArt from "../../../../smartsplit/media/albumArt"
import UserAvatar from "../../../../smartsplit/user/avatar"
import ChevronDown from "../../../../svg/chevron-down"
import Button from "../../../../widgets/button"
import { Heading, Text } from "../../../../text"

const Styles = StyleSheet.create({
	navBarCol: {
		borderBottomColor: "#DCDFE1",
		borderBottomWidth: 2,
	},
})

function NavbarCertificateFinal({ title, onBack, actions, style }) {
	return (
		<Row of="component" align="center" style={[Styles.outerContainer, style]}>
			<Row style={Styles.innerContainer} of="component" valign="center">
				<TouchableWithoutFeedback onPress={onBack}>
					<View>
						<ArrowLeft />
					</View>
				</TouchableWithoutFeedback>
				<Row of="component" valign="center">
					<Text>{title}</Text>
				</Row>
				<View style={{ marginLeft: "auto" }}>{actions}</View>
			</Row>
		</Row>
	)
}

const SummaryPage = observer((props) => {
	const workpiece = useCurrentWorkpiece()
	const { t } = useTranslation()
	return (
		<View>
			<Row style={{ width: "100%" }}>
				<Column flex={2} style={[Styles.navBarCol]}>
					<Row of="component" padding="component" valign="center">
						<TouchableWithoutFeedback>
							<View>
								<ArrowLeft />
							</View>
						</TouchableWithoutFeedback>
					</Row>
				</Column>
				<Column flex={8} style={[Styles.navBarCol]}>
					<Row of="component" padding="component" valign="center">
						<AlbumArt />
						<Text bold>Hello</Text>
					</Row>
				</Column>

				<Column flex={2} style={[Styles.navBarCol]}></Column>
			</Row>
			<Row style={{ width: "100%", paddingTop: 10 }}>
				<Column flex={2}></Column>
				<Column flex={8}>
					<Row>
						<Column flex={4} style={{ paddingLeft: 16 }}>
							<Heading level={3}>Hello</Heading>
						</Column>
						<Column flex={4}>
							<Row>
								<Button paddingLeft={5} secondary text="btn1" />
								<Button paddingLeft={5} secondary text="btn2" />
								<Button text="btn3" />
							</Row>
						</Column>
					</Row>
				</Column>
				<Column flex={2}></Column>
			</Row>
		</View>
	)
})
export default SummaryPage

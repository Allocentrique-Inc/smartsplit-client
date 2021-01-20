import { Column, Row } from "../../layout"
import React from "react"
import LinkIcon from "../../svg/link-icon"
import { Heading, Text } from "../../text"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Colors } from "../../theme"

const Styles = StyleSheet.create({
	LinkRowTitle: {
		color: "#176D25",
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		backgroundColor: "#DFF8E3",
	},
	hairline: {
		height: "100%",
		width: 1,
		backgroundColor: "rgb(220, 223, 225)",
	},
})

function HairlineMaxWidth() {
	return <View style={Styles.hairline} />
}

export function LinkRow(props) {
	const { data } = props
	return (
		<Row>
			<Column flex={2}>
				<View>
					<LinkIcon />
				</View>
				<View style={Styles.hairline} />
			</Column>
			<Column flex={10}>
				<Row>
					<Column>
						<Row>
							<Heading level={3}>{data.title}</Heading>
							<Text style={Styles.LinkRowTitle} bold>
								Master
							</Text>
						</Row>
						<Row>
							<Column>
								<Text secondary>Par Inscience, Valaire, Robert Meuric</Text>
								<TouchableWithoutFeedback>
									<View>
										<Text action bold>
											Voir le permalien
										</Text>
									</View>
								</TouchableWithoutFeedback>
							</Column>
						</Row>
					</Column>
				</Row>
				<Row>
					<Column flex={10}>
						<Row>
							<Column flex={3}>
								<Text bold>Fichier source</Text>
							</Column>
							<Column flex={7}>
								<Text secondary>Fantome-Final-Master.wav</Text>
							</Column>
						</Row>
						<Row>
							<Column flex={3}>
								<Text bold>Format</Text>
							</Column>
							<Column flex={7}>
								<Text secondary>WAV 44,1 kHz</Text>
							</Column>
						</Row>
						<Row>
							<Column flex={3}>
								<Text bold>Version de travail</Text>
							</Column>
							<Column flex={7}>
								<Text secondary>Master</Text>
							</Column>
						</Row>
						<Row>
							<Column flex={3}>
								<Text bold>Inscrite par</Text>
							</Column>
							<Column flex={7}>
								<Text secondary>Debbie Herbie Tebbs</Text>
							</Column>
						</Row>
						<Row>
							<Column flex={3}>
								<Text bold>Date d’inscription</Text>
							</Column>
							<Column flex={7}>
								<Text secondary>7 Février 2019 à 12h34 UTC</Text>
							</Column>
						</Row>
					</Column>
				</Row>
				<Row>
					<TouchableWithoutFeedback>
						<View>
							<Text action bold>
								Voir le permalien
							</Text>
						</View>
					</TouchableWithoutFeedback>
				</Row>
			</Column>
		</Row>
	)
}

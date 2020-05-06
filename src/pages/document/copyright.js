import React from "react"
import { View } from "react-native"

import { Heading, Paragraph, Text } from "../../text"
import TypographyStyles from "../../styles/typography"
import { Group, Hairline, Flex, Row, Column } from "../../layout"
import { Colors, Typography, Metrics } from "../../theme"
import LayerStyles from "../../styles/layers"
import MediaStyles from "../../smartsplit/media/styles"
import { Dropdown } from "../../widgets/dropdown"
import { TabStyles } from "../../widgets/tabs"
import CopyrightIcon from "../../../assets/svg/copyright"
import ImageIcon from "../../../assets/svg/image"
import LogoutIcon from "../../../assets/svg/logout"

/* export const ButtonStyles = StyleSheet.create({

}) */

export default function CopyrightShare(props) {
	return (
		<Group of="component">
			<Row of="component">
				<View style={[MediaStyles.cover, props.style]} margin="medium">
					<ImageIcon small color={Colors.stroke} />
				</View>
				<Flex>
					<Text>[Nom de la pièce musicale]</Text>
					<Heading level="5" color="primary">
						Documentation
					</Heading>
				</Flex>
				<LogoutIcon color={Colors.action} />
			</Row>

			<Hairline />

			<Row>
				<CopyrightIcon size={Metrics.size.medium} />
				<Text action heavy>
					CRÉATION
				</Text>
			</Row>

			<Paragraph>
				Ici, on crée les crédits qui décrivent ta pièce. Tu vas pouvoir indiquer
				qui a fait quoi, quand, où et avec quels instrument.
			</Paragraph>

			<Column layer="underground">
				<Text tertiary heavy>
					AIDE
				</Text>
				<Row>
					<Dropdown placeholder="C'est quoi un créateur ?" />
				</Row>
			</Column>

			<Column>
				<Heading level="5">Date de création</Heading>

				<Row>
					<Heading level="5">Auteurs</Heading>
				</Row>
				<Dropdown placeholder="Qui a écrit les paroles de cette pièce musicale ?" />

				<Row>
					<Heading level="5">Compositeurs</Heading>
				</Row>
				<Dropdown placeholder="Qui a composé la musique de cette pièce musicale ?" />
			</Column>
		</Group>
	)
}

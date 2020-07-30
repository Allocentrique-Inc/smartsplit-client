import React from "react"
import { Heading, Paragraph, Text } from "../../text"
import { Group, Hairline, Flex, Row, Column } from "../../layout"
import { Colors, Metrics } from "../../theme"
import { Dropdown } from "../../widgets/dropdown"
import CircledC from "../../svg/circled-c"
import LogoutIcon from "../../svg/logout"
import AlbumArt from "../../smartsplit/media/albumArt"

export default function CopyrightShare(props) {
	return (
		<Group of="component">
			<Row of="component">
				<AlbumArt style={props.style} margin="medium" />
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
				<CircledC size={Metrics.size.medium} />
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

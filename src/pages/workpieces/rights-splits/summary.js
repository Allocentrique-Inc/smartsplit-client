import React from "react"
import { useTranslation } from "react-i18next"
import { SummaryLayout } from "../layout"
import {
	Section,
	Group,
	Hairline,
	Flex,
	Row,
	Column,
	Spacer,
} from "../../../layout"
import { Text, Heading } from "../../../text"
import Button from "../../../widgets/button"
import UserAvatar from "../../../smartsplit/user/avatar"
import EyeIcon from "../../../svg/eye"
import Help from "../../../svg/help-circle-full"

export default function SplitSummary({ user, workpiece, artistName }) {
	const [t] = useTranslation()
	return (
		<SummaryLayout
			buttons={
				<>
					<Button primary text="Envoyer mon vote" />
				</>
			}
		>
			<Column of="group">
				<Column of="tiny">
					<Heading level="2">Valider le split de {workpiece}</Heading>
					<Text secondary normal>
						Crée par {user} · Mis à jour il y a
					</Text>
					<Spacer of="section" />

					<Heading level="5">Version 1</Heading>
					<Text secondary normal>
						Créee par {artistName}
					</Text>
				</Column>
				<CopyrightSection />
				<PerformanceSection />
				<RecordingSection />
				<ConfidentialitySection />
			</Column>
		</SummaryLayout>
	)
}

export function CopyrightSection() {
	return (
		<Column of="component" padding="group">
			<Heading level="5">Droits d'auteur</Heading>
			<Hairline />

			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text normal>Quest Love</Text>
						<Flex />
						<Text bold>88,8%</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente de décision
							<Flex />
						</Text>
					</Row>
					<Row>
						<Button danger text="Refuser" />
						<Flex />
						<Button primary bold text="Accepté" />
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							Inscience
						</Text>
						<Flex />
						<Text bold secondary>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text bold action>
							Approuvé
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							Erykah Badu
						</Text>
						<Flex />
						<Text bold secondary>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente d'envoi
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							J-Zone
						</Text>
						<Flex />
						<Text bold secondary>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente d'envoi
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							Ringo Starr
						</Text>
						<Flex />
						<Text bold secondary>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente d'envoi
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
		</Column>
	)
}

export function PerformanceSection() {
	return (
		<Column of="component" padding="group">
			<Heading level="5">Interprétation</Heading>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							Inscience
						</Text>
						<Flex />
						<Text bold normal>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text action bold>
							Approuvé
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							Erykah Badu
						</Text>
						<Flex />
						<Text bold normal>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente d'envoi
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							J-Zone
						</Text>
						<Flex />
						<Text bold snormal>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente d'envoi
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
		</Column>
	)
}

export function RecordingSection() {
	return (
		<Column of="component" padding="group">
			<Heading level="5">Enregistrement sonore</Heading>
			<Hairline />

			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text normal>Quest Love</Text>
						<Flex />
						<Text bold>88,8%</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente de décision
							<Flex />
						</Text>
					</Row>
					<Row>
						<Button danger text="Refuser" />
						<Flex />
						<Button primary bold text="Accepté" />
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							Inscience
						</Text>
						<Flex />
						<Text bold secondary>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text bold action>
							Approuvé
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
			<Hairline />
			<Row of="component">
				<Column>
					<UserAvatar size="small" />
					<Flex />
				</Column>
				<Column flex={1}>
					<Row>
						<Text secondary normal>
							Sunday Sauuce Records
						</Text>
						<Flex />
						<Text bold secondary>
							88,8%
						</Text>
					</Row>
					<Row>
						<Text secondary normal>
							Auteur, Compositeur, Arrangeur
						</Text>
						<Flex />
						<Text secondary normal>
							En attente d'envoi
							<Flex />
						</Text>
					</Row>
				</Column>
			</Row>
			<Hairline />
		</Column>
	)
}

export function ConfidentialitySection() {
	return (
		<Column of="component" padding="group">
			<Heading level="5">Confidentialité</Heading>
			<Hairline />

			<Row of="component">
				<Column>
					<EyeIcon />
				</Column>
				<Column>
					<Text normal>Inscience veut rendre ce partage de droits public</Text>
					<Row>
						<Button danger text="Refuser" />
						<Flex />
						<Button primary bold text="Accepté" />
					</Row>
				</Column>
				<Column>
					<Help />
				</Column>
			</Row>
		</Column>
	)
}

import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import {
	Column,
	Row,
	Flex,
	Hairline,
	Spacer,
	NoSpacer,
	Group,
} from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import LinkIcon from "../../../svg/link"
import SpotifyIcon from "../../../svg/workpieces/spotify"
import GooglePlayIcon from "../../../svg/workpieces/google-play"
import ITunesIcon from "../../../svg/workpieces/itunes"
import AmazonIcon from "../../../svg/workpieces/amazon"
import YoutubeIcon from "../../../svg/workpieces/youtube"
import SoundcloudIcon from "../../../svg/workpieces/soundcloud"
import PandoraIcon from "../../../svg/workpieces/pandora"
import DeezerIcon from "../../../svg/workpieces/deezer"
import HighFive from "../../../../assets/svg/high-five.svg"
import { SearchAndTag, Dropdown, TextField } from "../../../forms"
import AddPlatformDropdown from "../../../smartsplit/components/add-platform-dropdown"
import { DialogModal } from "../../../widgets/modal"

const Styles = StyleSheet.create({
	logo: {
		marginRight: Metrics.spacing.logo,
	},
	link: {
		marginRight: Metrics.spacing.link,
	},
})

export default function Links() {
	const { t } = useTranslation()
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()
	const [endModal, setEndModal] = useState(false)

	function saveAndQuit() {
		history.push("/dashboard/")
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function navigateToInterpretation() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
	}

	return (
		<Layout
			workpiece={workpiece}
			title={workpiece}
			path={[t("document:navbar.document"), t("document:navbar.pages.lyrics")]}
			progress={62.5}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveClose")}
					onClick={saveAndQuit}
				/>
			}
			formNav={
				<>
					<Row flex={1}>
						<Button
							secondary
							text={t("general:buttons.back")}
							onClick={navigateToSummary}
						/>
						<Flex />
						<Button
							primary
							text={t("general:buttons.end")}
							onClick={() => setEndModal(true)}
						/>
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<LinksForm />
			<EndModal visible={endModal} onRequestClose={() => setEndModal(false)} />
		</Layout>
	)
}

export function LinksForm(props) {
	const { t } = useTranslation()

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold valign="center">
						<LinkIcon />
						{t("document:links.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:links.title")}</Heading>
					<Paragraph>{t("document:links.paragraph")}</Paragraph>

					<Spacer of="group" />

					<Row valign="center">
						<Column flex={0.5}>
							<SpotifyIcon />
						</Column>
						<Column flex={2}>
							<Text primary>Spotify</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="spotify"
							placeholder={t("document:links.addLink")}
						/>
					</Row>

					<Row valign="center">
						<Column flex={0.5}>
							<GooglePlayIcon />
						</Column>
						<Column flex={2}>
							<Text primary>Google Play</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="google"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
					<Row valign="center">
						<Column flex={0.5}>
							<ITunesIcon />
						</Column>
						<Column flex={2}>
							<Text primary>Apple Music</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="itunes"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
					<Row valign="center">
						<Column flex={0.5}>
							<AmazonIcon />
						</Column>
						<Column flex={2}>
							<Text primary>Amazon</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="amazon"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
					<Row valign="center">
						<Column flex={0.5}>
							<YoutubeIcon style={Styles.logo} />
						</Column>
						<Column flex={2}>
							<Text primary style={Styles.link}>
								Youtube
							</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="youtube"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
					<Row valign="center">
						<Column flex={0.5}>
							<PandoraIcon />
						</Column>
						<Column flex={2}>
							<Text primary>Pandora</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="pandora"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
					<Row valign="center">
						<Column flex={0.5}>
							<SoundcloudIcon style={Styles.logo} />
						</Column>
						<Column flex={2}>
							<Text primary style={Styles.link}>
								Soundcloud
							</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="soundcloud"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
					<Row valign="center">
						<Column flex={0.5}>
							<DeezerIcon style={Styles.logo} />
						</Column>
						<Column flex={2}>
							<Text primary style={Styles.link}>
								Deezer
							</Text>
						</Column>
						<TextField
							style={{ flex: 5 }}
							name="soundcloud"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
					<AddPlatformDropdown placeholder={t("document:links.addPlatform")} />
				</Column>
				<Flex />
				<Column of="group" flex={4}>
					<Column of="component" padding="component" layer="underground">
						<Column of="inside">
							<Text small bold tertiary>
								{t("document:help")}
							</Text>
							<Hairline />
						</Column>
						<Heading level={4}>Lorem ipsum dolor sit amet </Heading>
						<Text secondary>
							Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
							dolor sit amet.
						</Text>
					</Column>
				</Column>
			</Row>
		</>
	)
}

export function EndModal(props) {
	const { t } = useTranslation()
	const submit = () => form.current.submit()

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("document:finalModal.header")}
			buttons={
				<>
					<Button text={t("general:buttons.seeSummary")} onClick={submit} />
				</>
			}
		>
			<Group of="group" style={{ maxWidth: 560, alignSelf: "center" }}>
				{/* To Do: Heading avec var passée dans traduction s'affiche pas dans modale */}
				<Heading level={4}>{t("document:finalModal.title")}</Heading>
				<View style={{ alignItems: "center" }}>
					<HighFive />
				</View>
				<Paragraph>{t("document:finalModal.paragraph")}</Paragraph>
			</Group>
		</DialogModal>
	)
}

import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { useHistory, useParams } from "react-router"
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
import { observer } from "mobx-react"
import { useDocsModel } from "../../../mobX/hooks"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.medium,
	},
	link: {
		marginRight: Metrics.spacing.link,
	},
})

export default observer(function Links(props) {
	const { modalVisible, closeModal } = props
	const { t } = useTranslation()
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: DocStreamingModel = useDocsModel(workpieceId, "streaming")
	console.log(model)
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
		<>
			<LinksForm model={model} />
			<EndModal visible={modalVisible} onRequestClose={closeModal} />
		</>
	)
})

export function LinksForm(props) {
	const { t } = useTranslation()

	const { model } = props

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold style={Styles.category}>
						<LinkIcon style={Styles.logo} />
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
							value={model.links["spotify"]}
							onChange={(v) => {
								model.links.setItem("spotify", v)
							}}
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
	const history = useHistory()
	const { workpiece_id } = useParams()
	const workpiece = useCurrentWorkpiece()
	function navigateToSummary() {
		history.push(`/workpieces/${workpiece_id}`)
	}

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("document:finalModal.header")}
			buttons={
				<>
					<Button
						text={t("general:buttons.seeSummary")}
						onClick={navigateToSummary}
						/* 						onClick={() => {
							console.log(t("document:finalModal.title"))
						}} */
					/>
				</>
			}
		>
			<Group
				of="group"
				style={{ maxWidth: 560, alignSelf: "center", textAlign: "center" }}
			>
				<View style={{ alignItems: "center" }}>
					<HighFive />
				</View>
				<Heading level={4}>
					{t("document:finalModal.title", { workpiece: workpiece.data.title })}
				</Heading>
				<Paragraph>{t("document:finalModal.paragraph")}</Paragraph>
			</Group>
		</DialogModal>
	)
}

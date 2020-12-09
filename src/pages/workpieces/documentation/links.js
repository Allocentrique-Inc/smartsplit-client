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
import TidalIcon from "../../../svg/workpieces/tidal"
import HighFive from "../../../../assets/svg/high-five.svg"
import { SearchAndTag, Dropdown, TextField } from "../../../forms"
import AddPlatform from "../../../smartsplit/components/AddPlatformDropdown"
import { DialogModal } from "../../../widgets/modal"
import { observer } from "mobx-react"
import { useDocsModel } from "../../../mobX/hooks"
import { titleCase } from "../../../utils/utils"
import { urlValidator } from "../../../mobX/models/validators"

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
	//console.log(model)
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

const LinkRow = observer((props) => {
	const { model, Icon, name } = props
	const { t } = useTranslation()
	const [focus, setFocus] = useState(false)
	const [wasBlurred, setWasBlurred] = useState(false)
	return (
		<Row valign="center">
			<Column flex={0.5}>
				<Icon />
			</Column>
			<Column flex={2}>
				<Text primary>{name.substr(0, 1).toUpperCase() + name.substr(1)}</Text>
			</Column>
			<TextField
				style={{ flex: 5 }}
				placeholder={t("document:links.addLink")}
				value={model.links.value[name]}
				onBlur={() => {
					setFocus(false)
					setWasBlurred(true)
				}}
				onFocus={() => {
					setFocus(true)
				}}
				error={
					(!focus || wasBlurred) &&
					model.links.value[name] &&
					urlValidator(model.links.value[name])
						? t("errors:invalidUrl")
						: false
				}
				onChangeText={(v) => {
					model.links.setItem(name, v)
					console.log(model.toJS())
				}}
			/>
		</Row>
	)
})

export const LinksForm = observer((props) => {
	const { t } = useTranslation()

	const { model } = props

	const defaultLinks = [
		"spotify",
		"google",
		"apple",
		"amazon",
		"youtube",
		"pendora",
		"soundcloud",
		"deezer",
	]

	const icons = {
		spotify: SpotifyIcon,
		google: GooglePlayIcon,
		apple: ITunesIcon,
		amazon: AmazonIcon,
		youtube: YoutubeIcon,
		pendora: PandoraIcon,
		soundcloud: SoundcloudIcon,
		deezer: DeezerIcon,
		tidal: TidalIcon,
	}

	const [searchPlatforms, setSearchPlatforms] = useState("")

	const fakeSearchResults = [
		{
			id: "123",
			name: "Tidal",
		},
		{
			id: "1234",
			name: "My Space From the Death",
		},
		{
			id: "12345",
			name: "Napster",
		},
	]

	const platformResults = fakeSearchResults

	const searchResultsPlatforms = platformResults.map((platform) => {
		return {
			id: platform.id,
			name: titleCase(platform.name),
		}
	})

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
					{Object.keys(model.links.value).map((name) => (
						<LinkRow
							name={name}
							Icon={
								icons[name.toLowerCase()] ? icons[name.toLowerCase()] : LinkIcon
							}
							model={model}
							key={`link-${name}`}
							value={model.links.value[name]}
						/>
					))}

					{/* <Row valign="center">
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
					</Row> */}
					<AddPlatform
						noIcon={false}
						searchResults={searchResultsPlatforms.filter(
							(p) =>
								p.name.toLowerCase().indexOf(searchPlatforms.toLowerCase()) > -1
						)}
						search={searchPlatforms}
						onSearchChange={setSearchPlatforms}
						selection={model.otherPlatforms.array}
						onSelect={(selection) => {
							console.log(selection)
							model.links.setItem(selection.name, "")
						}}
						/* 	onUnselect={
							(selection) => model.otherPlatforms.remove(selection)
						} */
					/>
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
})

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

import React from "react"
import { useTranslation } from "react-i18next"
import { View, StyleSheet } from "react-native"
import { useSubpath } from "../../../appstate/react"
import { useStorePath } from "../../../appstate/react"
import { Row, Flex, Hairline, Spacer, Column } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Button from "../../../widgets/button"
import Cover from "../../../smartsplit/media/cover"
import LogoSmartSplit from "../../../svg/logo-smartsplit"
import UserAvatar from "../../../smartsplit/user/avatar"
import ChevronDown from "../../../svg/chevron-down"
import ArrowRight from "../../../svg/arrow-right"
import PenIcon from "../../../svg/pen"
import AmazonIcon from "../../../svg/workpieces/amazon"
import GooglePlayIcon from "../../../svg/workpieces/google-play"
import ITunesIcon from "../../../svg/workpieces/itunes"
import SoundcloudIcon from "../../../svg/workpieces/soundcloud"
import SpotifyIcon from "../../../svg/workpieces/spotify"
import YoutubeIcon from "../../../svg/workpieces/youtube"
import UnlockDownloadIcon from "../../../svg/workpieces/unlock-download"
import LockDownloadIcon from "../../../svg/workpieces/lock-download"
import { Metrics, Colors } from "../../../theme"
import MetricsStyles from "../../../styles/metrics"

export function SheetNavbar() {
	return (
		<Row
			valign="center"
			layer="underground"
			of="group"
			padding="component"
			style={{ alignItems: "center" }}
		>
			<LogoSmartSplit />
			<Flex />
			<Row of="inside" valign="center">
				<UserAvatar size="small" />
				<ChevronDown />
			</Row>
		</Row>
	)
}

const TagStyle = StyleSheet.create({
	frame: {
		marginRight: 0,
		backgroundColor: Colors.background.hell,
		padding: Metrics.spacing.tiny,
		marginRight: Metrics.spacing.small,
		borderRadius: Metrics.borderRadius.forms,
	},
})

function PathSpacer({ of }) {
	return (
		<View
			style={{
				paddingLeft: Metrics.spacing[of],
				paddingRight: Metrics.spacing[of],
			}}
		>
			<ArrowRight />
		</View>
	)
}

export function SheetHeader(props) {
	const [t] = useTranslation()
	const {
		songTitle,
		artistName,
		featuredArtist,
		albumTitle,
		workpiece,
		path = [],
		tag,
	} = props

	return (
		<Column
			of="component"
			padding="component"
			valign="center"
			style={{ width: 944, maxWidth: "100%" }}
		>
			<Row of="component" spacer={PathSpacer} valign="center">
				<Text bold>{artistName}</Text>
				<Text bold>{albumTitle}</Text>
				<Text secondary bold>
					{songTitle} ({tag})
				</Text>
			</Row>

			<Row valign="center">
				<Column>
					<Cover style={MetricsStyles.spacing["huge"]} />
				</Column>

				<Column of="component" flex={1}>
					<Heading level={1}>
						{songTitle} ({tag})
					</Heading>
					<Row valign="center">
						<Text small style={TagStyle.frame}>
							{tag}
						</Text>
						<Text normal secondary padding="small">
							{t("workpieceSheet:by")}
						</Text>
						<Text action bold>
							{artistName}{" "}
						</Text>
						<Text normal secondary>
							feat.{" "}
						</Text>

						<Text action bold>
							{featuredArtist}
						</Text>
						<Flex />

						<Button
							small
							secondaryWithIcon
							bold
							icon={
								<PenIcon
									color={Colors.action}
									style={MetricsStyles.spacing["xtiny"]}
								/>
							}
							text={t("general:buttons.access")}
						/>
					</Row>
					<Hairline />
					<Row>
						<Text secondary small>
							{t("general:update")}
						</Text>
					</Row>
				</Column>
			</Row>
		</Column>
	)
}
export function CreationSection(props) {
	const { category, creationDate, authors, composers, mixers, editors } = props

	const CommaSpacer = () => <Text secondary>{", "}</Text>

	return (
		<Column of="group" flex={7}>
			<Heading level={3}>{category}</Heading>
			<Row>
				<Column of="group" padding="inside" flex={5}>
					<Text secondary>Date de création</Text>
					<Text secondary>Auteurs (paroles)</Text>
					<Text secondary>Compositeurs (musique)</Text>
					<Text secondary>Arrangeurs (musique)</Text>
					<Text secondary>Éditeurs</Text>
				</Column>
				<Column of="group" padding="inside" flex={9}>
					<Text normal>{creationDate}</Text>
					<Row of="none" spacer={CommaSpacer}>
						{authors.map((author) => (
							<Text action bold>
								{author}
							</Text>
						))}
					</Row>
					<Row of="none" spacer={CommaSpacer}>
						{composers.map((composer) => (
							<Text action bold>
								{composer}
							</Text>
						))}
					</Row>

					<Row of="none" spacer={CommaSpacer}>
						{mixers.map((mixer) => (
							<Text action bold>
								{mixer}
							</Text>
						))}
					</Row>
					<Row of="none" spacer={CommaSpacer}>
						{editors.map((editor) => (
							<Text action bold>
								{editor}
							</Text>
						))}
					</Row>
				</Column>
			</Row>
		</Column>
	)
}

export function GeneralInfoSection(props) {
	const { length, bmp, genres, styles, influences } = props
	return (
		<Column of="group">
			<Heading level={4}>{props.category}</Heading>
			<Row>
				<Column of="group" padding="inside" flex={1}>
					<Text secondary>Durée</Text>
					<Text secondary>BMP</Text>
					<Text secondary>Genre</Text>
					<Text secondary>Styles</Text>
					<Text secondary>Influences</Text>
				</Column>
				<Column of="group" padding="inside" flex={2}>
					<Text normal>{length}</Text>
					<Text normal>{bmp}</Text>
					<Text normal>{genres}</Text>
					<Text normal>{styles}</Text>
					<Text normal>{influences}</Text>
				</Column>
			</Row>
		</Column>
	)
}

export function ListeningSection(props) {
	return (
		<Column of="group">
			<Heading level={4}>{props.category}</Heading>
			<Row of="inside" valign="center">
				<ITunesIcon />
				<YoutubeIcon />
				<AmazonIcon />
				<GooglePlayIcon />
				<SoundcloudIcon />
				<SpotifyIcon />
			</Row>
		</Column>
	)
}

export function DownloadsSection(props) {
	const { downloadType, action } = props
	const copyLink = "Copier le lien"
	return (
		<Column of="group">
			<Heading level={4}>{props.category}</Heading>
			<Row>
				<UnlockDownloadIcon />
				<Column>
					<Text secondary>{downloadType}</Text>
					<Row>
						<Text bold action>
							{action}
						</Text>
						<Text secondary bold>
							·
						</Text>
						<Text bold action>
							{copyLink}
						</Text>
					</Row>
				</Column>
			</Row>
			<LockDownloadIcon />
		</Column>
	)
}

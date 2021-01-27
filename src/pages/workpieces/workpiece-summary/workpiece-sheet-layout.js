import React, { useRef } from "react"
import { useTranslation } from "react-i18next"
import { View, StyleSheet } from "react-native"
import { useSubpath } from "../../../appstate/react"
import { useStorePath } from "../../../appstate/react"
import { Row, Flex, Hairline, Column, Spacer } from "../../../layout"
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
import { joinElements } from "../../../utils/react"
import { observer } from "mobx-react"

export const SheetNavbar = observer((props) => {
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
})

const TagStyle = StyleSheet.create({
	frame: {
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

export const SheetHeader = observer((props) => {
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

	function getName(user) {
		return `${user.firstName} ${user.lastName} ${
			user.artistName ? ` (${user.artistName})` : ""
		}`
	}

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
})

export const CreationSection = observer((props) => {
	const { category, creationDate, authors, composers, mixers, editors } = props
	const CommaSpacer = () => <Text secondary>{", "}</Text>
	const [t] = useTranslation()
	const { firstName, lastName, artistName } = props

	function getName(user) {
		return `${user.firstName} ${user.lastName} ${
			user.artistName ? ` (${user.artistName})` : ""
		}`
	}

	return (
		<Column of="group">
			<Heading level={3}>{category}</Heading>
			<Column of="group">
				<Row>
					<Text secondary style={{ flex: 5 }}>
						{t("workpieceSheet:creation.date")}
					</Text>
					<Text normal style={{ flex: 9 }}>
						{creationDate}
					</Text>
				</Row>
				<Row>
					<Text secondary style={{ flex: 5 }}>
						{t("workpieceSheet:creation.authors")}
					</Text>
					<Row of="none" style={{ flex: 9 }}>
						<Text>
							{joinElements(
								authors.map((author) => (
									<Text action bold>
										{author}
									</Text>
								)),
								<Text secondary>{", "}</Text>
							)}
						</Text>
					</Row>
				</Row>
				<Row>
					<Text secondary style={{ flex: 5 }}>
						{t("workpieceSheet:creation.composers")}
					</Text>
					<Row of="none" style={{ flex: 9 }}>
						<Text>
							{joinElements(
								composers.map((composer) => (
									<Text action bold>
										{composer}
									</Text>
								)),
								<Text secondary>{", "}</Text>
							)}
						</Text>
					</Row>
				</Row>
				<Row>
					<Text secondary style={{ flex: 5 }}>
						{t("workpieceSheet:creation.arrangers")}
					</Text>
					<Row of="none" style={{ flex: 9 }}>
						<Text>
							{joinElements(
								mixers.map((mixer) => (
									<Text action bold>
										{mixer}
									</Text>
								)),
								<Text secondary>{", "}</Text>
							)}
						</Text>
					</Row>
				</Row>
				<Row>
					<Text secondary style={{ flex: 5 }}>
						{t("workpieceSheet:creation.publishers")}
					</Text>
					<Row of="none" style={{ flex: 9 }}>
						<Text>
							{joinElements(
								editors.map((editor) => (
									<Text action bold>
										{editor}
									</Text>
								)),
								<Text secondary>{", "}</Text>
							)}
						</Text>
					</Row>
				</Row>
			</Column>
		</Column>
	)
})

export const GeneralInfoSection = observer((props) => {
	const { length, bmp, genres, styles, influences } = props
	const [t] = useTranslation()

	return (
		<Column of="group">
			<Heading level={4}>{props.category}</Heading>
			<Row>
				<Text secondary style={{ flex: 1 }}>
					{t("workpieceSheet:info.length")}
				</Text>
				<Text normal style={{ flex: 3 }}>
					{length}
				</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 1 }}>
					BMP
				</Text>
				<Text normal style={{ flex: 3 }}>
					{bmp}
				</Text>
			</Row>

			<Row>
				<Text secondary style={{ flex: 1 }}>
					Genre
				</Text>
				<Text normal style={{ flex: 3 }}>
					{genres}
				</Text>
			</Row>

			<Row>
				<Text secondary style={{ flex: 1 }}>
					Styles
				</Text>
				<Text normal style={{ flex: 3 }}>
					{styles}
				</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 1 }}>
					Influences
				</Text>
				<Text normal style={{ flex: 3 }}>
					{influences}
				</Text>
			</Row>
		</Column>
	)
})

const Performance = (props) => {
	const ColonSpacer = () => <Text>{" : "}</Text>
	const [t] = useTranslation()

	return (
		<Column of="component">
			{props.artists.map((artist) => (
				<Row>
					<Text action bold style={{ flex: 4 }}>
						{artist.name}
					</Text>
					<Column of="inside" style={{ flex: 12 }}>
						<Row style={{ alignSelf: "left" }}>
							<Text small style={TagStyle.frame}>
								{artist.tag}
							</Text>
						</Row>
						{artist.roles.map((role) => (
							<Row of="inside">
								<Text>
									{role.title}
									{ColonSpacer}
								</Text>
								<Text secondary>{role.properties}</Text>
							</Row>
						))}
					</Column>
				</Row>
			))}
		</Column>
	)
}

export const PerformanceSection = observer((props) => {
	const [t] = useTranslation()
	const { artists } = props
	const category = t("workpieceSheet:performance.header")

	return (
		<Column of="group">
			<Heading level={3}>{category}</Heading>
			<Performance artists={artists} />
		</Column>
	)
})

export const ListeningSection = observer((props) => {
	return (
		<Column of="group">
			<Heading level={4}>{props.category}</Heading>
			<Row of="inside" valign="center">
				<ITunesIcon color={Colors.action} />
				<YoutubeIcon color={Colors.action} />
				<AmazonIcon color={Colors.action} />
				<GooglePlayIcon color={Colors.action} />
				<SoundcloudIcon color={Colors.action} />
				<SpotifyIcon color={Colors.action} />
			</Row>
		</Column>
	)
})

const CopyToClipElement = ({ text }) => {
	const myRef = React.useRef(null)
	const [data, setData] = React.useState(text)
	React.useEffect(() => setData(text), [text])

	React.useEffect(() => {
		if (myRef.current && data) {
			myRef.current.select()
			document.execCommand("copy")
			setData(null)
			console.log(myRef)
		}
	}, [data, myRef.current])

	const [t] = useTranslation()
	return (
		<>
			{data && (
				<Text secondary small ref={myRef}>
					{t("workpieceSheet:download.copied")}
				</Text>
			)}
		</>
	)
}

export function DownloadsRow(props) {
	const { downloadTitle, download } = props
	const [t] = useTranslation()
	const FileTypes = {
		public: {
			icon: <UnlockDownloadIcon />,
			action: t("workpieceSheet:download.download"),
			dot: "·",
			link: t("workpieceSheet:download.copy"),
		},
		private: {
			icon: <LockDownloadIcon />,
			action: t("workpieceSheet:download.access"),
		},
	}
	const downloadType = FileTypes[download === true ? "public" : "private"]

	const [copyText, setCopyText] = React.useState("")
	const data = [t("workpieceSheet:download.copy")]

	return (
		<Column of="component">
			<Row valign="center">
				<Column style={{ paddingRight: Metrics.spacing.component }}>
					{downloadType.icon}
				</Column>
				<Column>
					<Row>
						<Text secondary style={{ flex: 3 }}>
							{downloadTitle}
						</Text>
					</Row>
					<Row style={{ flex: 3 }}>
						<Text bold action>
							{downloadType.action}
						</Text>
						<Text secondary bold>
							{" "}
							{downloadType.dot}{" "}
						</Text>

						{data.map((text) => (
							<Text bold action onClick={() => setCopyText(text)}>
								{/* {downloadType.link} */}
								{text}
							</Text>
						))}
						<CopyToClipElement text={copyText} />
					</Row>
				</Column>
			</Row>
		</Column>
	)
}

export const DownloadsSection = observer((props) => {
	const [t] = useTranslation()
	return (
		<Column of="group">
			<Heading level={4}>{props.category}</Heading>

			<Column of="component">
				<DownloadsRow
					downloadTitle={t("workpieceSheet:download.visual")}
					download={true}
				/>
				<DownloadsRow
					downloadTitle={t("workpieceSheet:download.audio")}
					download={true}
				/>
				<DownloadsRow
					downloadTitle={t("workpieceSheet:download.partition")}
					download={false}
				/>
				<DownloadsRow
					downloadTitle={t("workpieceSheet:download.midi")}
					download={false}
				/>
			</Column>
		</Column>
	)
})

export const RecordingSection = observer((props) => {
	const [t] = useTranslation()
	const {
		track,
		isrc,
		director,
		tech,
		mix,
		master,
		production,
		studio,
		address,
	} = props
	return (
		<Column of="group">
			<Heading level={3}>{props.category}</Heading>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:recording.title")}
				</Text>
				<Text style={{ flex: 9 }}>{track}</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					ISRC
				</Text>
				<Text style={{ flex: 9 }}>{isrc}</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:recording.director")}
				</Text>
				<Text style={{ flex: 9 }}>{director}</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:recording.tech")}
				</Text>
				<Text style={{ flex: 9 }}>{tech}</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:recording.mix")}
				</Text>
				<Text style={{ flex: 9 }}>{mix}</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:recording.mastering")}
				</Text>
				<Text style={{ flex: 9 }}>{master}</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:recording.production")}
				</Text>
				<Text style={{ flex: 9 }}>{production}</Text>
			</Row>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:recording.studio")}
				</Text>
				<Column of="inside" style={{ flex: 9 }}>
					<Text>{studio}</Text>
					<Text secondary>{address}</Text>
				</Column>
			</Row>
		</Column>
	)
})

export const LyricsSection = observer((props) => {
	const [t] = useTranslation()
	return (
		<Column of="group">
			<Heading level={4}>{props.category}</Heading>
			<Row valign="center">
				<Column>
					<UnlockDownloadIcon />
				</Column>
				<Column padding="component">
					<Text action bold style={{ flex: 3 }}>
						{t("workpieceSheet:lyrics.check")}
					</Text>
				</Column>
			</Row>
		</Column>
	)
})

export const ReleaseSection = observer((props) => {
	const [t] = useTranslation()
	const { releaseDate, format, productTitle } = props
	return (
		<Column of="group">
			<Heading level={3}>{props.category}</Heading>
			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:release.date")}
				</Text>
				<Text style={{ flex: 9 }}>{releaseDate}</Text>
			</Row>

			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:release.format")}
				</Text>
				<Text style={{ flex: 9 }}>{format}</Text>
			</Row>

			<Row>
				<Text secondary style={{ flex: 5 }}>
					{t("workpieceSheet:release.title")}
				</Text>
				<Text style={{ flex: 9 }}>{productTitle}</Text>
			</Row>
		</Column>
	)
})

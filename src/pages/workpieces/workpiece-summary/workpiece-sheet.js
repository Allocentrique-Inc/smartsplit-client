import React from "react"
import { toJS } from "mobx"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { Row, Flex, Hairline, Spacer, Column } from "../../../layout"
import {
	SheetNavbar,
	SheetHeader,
	CreationSection,
	PerformanceSection,
	GeneralInfoSection,
	ListeningSection,
	DownloadsSection,
	RecordingSection,
	LyricsSection,
	ReleaseSection,
} from "./workpiece-sheet-layout"
import { useCurrentWorkpiece } from "../context"
import Scrollable from "../../../widgets/scrollable"
import { sections } from "./sections"
import { useDocsModel } from "../../../mobX/hooks"
import { useStorePath } from "../../../mobX"

export function getArtistName(user) {
	const { firstName, lastName, artistName } = user
	if (artistName) return artistName
	else return firstName + " " + lastName
}
function getFeaturedArtists(performers): string {
	let featured = new Array()
	let _performers = JSON.parse(JSON.stringify(performers))
	_performers.forEach((performer) => {
		if (performer.type === "featured")
			featured.push(getArtistName(performer.user))
	})
	return featured.join(", ")
}
const WorkpieceSheet = observer((props) => {
	const [t, i18n] = useTranslation()
	const lang = i18n.language
	const workpiece = useCurrentWorkpiece()
	const model = useDocsModel(workpiece.id)
	const user = useStorePath("auth", "user", "data")
	const summary = workpiece.docSummary
	const workInfo = workpiece.data
	console.log(toJS(summary))
	console.log(toJS(workInfo))
	if (!summary) return null
	return (
		<Scrollable>
			<SheetNavbar />
			<Hairline />

			<Column of="group">
				<Column of="group" flex={1} layer="underground" align="center">
					<SheetHeader
						artistName={getArtistName(user)}
						albumTitle={"Album"}
						songTitle={workInfo.title}
						//path={["Inscience", "Album Name", "Love You Baby"]}
						tag={t("document:pieceType.original")}
						featuredArtists={
							getFeaturedArtists(summary.performance.performers) || null
						}
					/>
				</Column>
			</Column>
			<Spacer of="section" />
			<Column of="group" align="center">
				<Row style={{ maxWidth: 944 }}>
					<Column of="group" flex={7}>
						<CreationSection
							category={t("workpieceSheet:creation.header")}
							creationDate={summary.creation.date}
							authors={summary.creation.authors}
							composers={summary.creation.composers}
							mixers={[]}
							editors={summary.creation.publishers}
						/>
						<PerformanceSection artists={summary.performance.performers} />
						<RecordingSection
							category={t("workpieceSheet:recording.header")}
							track={workInfo.title}
							info={summary.recording}
						/>
						<ReleaseSection
							category={t("workpieceSheet:release.header")}
							releaseDate={summary.release.date}
							format={summary.release.format}
							productTitle={"NO ALBUM FIELD YET"}
						/>
					</Column>
					<Flex flex={1} />
					<Column of="group" flex={4}>
						<GeneralInfoSection
							category={t("workpieceSheet:info.header")}
							length={summary.info.length}
							bpm={summary.info.BPM}
							mainGenre={summary.info.mainGenre}
							secondaryGenres={summary.info.secondaryGenres}
							influences={summary.info.influences}
						/>
						<ListeningSection category={t("workpieceSheet:stream.header")} />
						<DownloadsSection category={t("workpieceSheet:download.header")} />
						<LyricsSection category={t("workpieceSheet:lyrics.header")} />
					</Column>
				</Row>
			</Column>
			<Spacer of="section" />
		</Scrollable>
	)
})

export default WorkpieceSheet

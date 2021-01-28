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
function getFeaturedArtists(performers) {
	let featured = []
	let _performers = JSON.parse(JSON.stringify(performers))
	_performers.forEach((performer) => {
		if (performer.type === "featured") featured.push()
	})
	return featured
}
const WorkpieceSheet = observer((props) => {
	const [t] = useTranslation()
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
						tag={sections.header.tag}
						featuredArtists={getFeaturedArtists(summary.performance.performers)}
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
							mixers={sections.creation.mixers}
							editors={sections.creation.editors}
						/>
						<PerformanceSection {...sections.performance} />
						<RecordingSection
							category={t("workpieceSheet:recording.header")}
							track={sections.recording.track}
							isrc={sections.recording.isrc}
							director={sections.recording.director}
							tech={sections.recording.tech}
							mix={sections.recording.mix}
							master={sections.recording.master}
							production={sections.recording.production}
							studio={sections.recording.studio}
							address={sections.recording.address}
						/>
						<ReleaseSection
							category={t("workpieceSheet:release.header")}
							releaseDate={sections.release.releaseDate}
							format={sections.release.format}
							productTitle={sections.release.productTitle}
						/>
					</Column>
					<Flex flex={1} />
					<Column of="group" flex={4}>
						<GeneralInfoSection
							category={t("workpieceSheet:info.header")}
							length={sections.general.length}
							bmp={sections.general.bmp}
							genres={sections.general.genres}
							styles={sections.general.styles}
							influences={sections.general.influences}
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

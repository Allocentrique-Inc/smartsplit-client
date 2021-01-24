import React from "react"
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

export default function WorkpieceSheet(props) {
	const [t] = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const model = useDocsModel(workpiece.id)
	const summary = model.summary
	const workInfo = workpiece.data
	console.log(toJS(summary))
	console.log(toJS(workInfo))
	return (
		<Scrollable>
			<SheetNavbar />
			<Hairline />

			<Column of="group">
				<Column of="group" flex={1} layer="underground" align="center">
					<SheetHeader
						artistName={sections.header.name}
						albumTitle={sections.header.albumTitle}
						songTitle={sections.header.songTitle}
						//path={["Inscience", "Album Name", "Love You Baby"]}
						tag={sections.header.tag}
						featuredArtist={sections.header.featuredArtist}
					/>
				</Column>
			</Column>
			<Spacer of="section" />
			<Column of="group" align="center">
				<Row style={{ maxWidth: 944 }}>
					<Column of="group" flex={7}>
						<CreationSection
							category={t("workpieceSheet:creation.header")}
							creationDate={sections.creation.creationDate}
							authors={sections.creation.authors}
							composers={sections.creation.composers}
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
							category={t("workpieceSheet:general.header")}
							length={sections.general.length}
							bmp={sections.general.bmp}
							genres={sections.general.genres}
							styles={sections.general.styles}
							influences={sections.general.influences}
						/>
						<ListeningSection category={t("workpieceSheet:listening.header")} />
						<DownloadsSection />
						<LyricsSection category={t("workpieceSheet:lyrics.header")} />
					</Column>
				</Row>
			</Column>
			<Spacer of="section" />
		</Scrollable>
	)
}

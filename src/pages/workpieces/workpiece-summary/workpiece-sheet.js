import React from "react"
import { useTranslation } from "react-i18next"
import { Row, Flex, Hairline, Spacer, Column } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import {
	SheetNavbar,
	SheetHeader,
	CreationSection,
	GeneralInfoSection,
	ListeningSection,
	DownloadsSection,
} from "./workpiece-sheet-layout"
import { useCurrentWorkpiece } from "../context"
import Scrollable from "../../../widgets/scrollable"

export default function WorkpieceSheet(props) {
	const [t] = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const creationDate = "8 juillet 2019"
	const authors = ["Inscience", "Lores"] //, "Quest Love", "Jean-Pierre Cool"
	const composers = [
		"Inscience",
		"Stéphane Lebrou",
		/* 	"Jocelyn Therious",
		"Jean-Pierre Cool", */
	]
	const mixers = [
		"Inscience",
		"Stéphane Lebrou",
		/* 		"Jocelyn Therioux",
		"Jean-Pierre Cool", */
	]
	const editors = ["Sync.mu", "Lepdup"]

	return (
		<Scrollable>
			<SheetNavbar />
			<Hairline />

			<Column of="group">
				<Column of="group" flex={1} layer="underground" align="center">
					<SheetHeader
						artistName="Inscience"
						albumTitle="Album Name"
						songTitle="Love You Baby"
						//path={["Inscience", "Album Name", "Love You Baby"]}
						tag="Remix"
						featuredArtist="Featured Artist"
					/>
				</Column>
				<Column align="center">
					<Row of="group" style={{ maxWidth: 944 }}>
						<CreationSection
							category="Création"
							creationDate={creationDate}
							authors={authors}
							composers={composers}
							mixers={mixers}
							editors={editors}
						/>

						<Flex flex={1} />
						<Column of="group" flex={4}>
							<GeneralInfoSection
								category="Informations générales"
								length="3:12"
								bmp="120"
								genres="Rock"
								styles="Rockabilly, Dubtrap, British Rock, Black Metal"
								influences="The Rolling Stones, Ivy and the Pearls, Frankie and the Lights, Kanye West, Apollo Brown"
							/>
							<ListeningSection category="Écouter" />

							<DownloadsSection
								category="Téléchargements"
								downloadType="Visuel de l'œuvre"
								action="Télécharger"
							/>
							<DownloadsSection
								downloadType="Fichier audio"
								action="Télécharger"
							/>
						</Column>
					</Row>
				</Column>
			</Column>
		</Scrollable>
	)
}

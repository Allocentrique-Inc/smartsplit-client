import React, { useState } from "react"
import { DialogModal } from "../../widgets/modal"
import { Group, Hairline, Column, Row } from "../../layout"
import { Button, RoundButton } from "../../widgets/button"
import { RadioButton, CheckBox } from "../../forms"
import { Text } from "../../text"
import PlayIcon from "../../../assets/svg/play"
import WorkStyles from "./styles"

import Cover from "../media/cover"

export default function ACRCloudModal(props) {
	const [checkRights, setCheckRights] = useState(false)

	function handleValidate() {
		if (!checkRights) return

		if (props.onValidate) props.onValidate({})
	}

	return (
		<DialogModal
			key="acrcloud"
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title="Fichier déjà existant sur les plateformes de diffusion"
			buttons={
				<>
					<Button tertiary text="Annuler" onClick={props.onRequestClose} />
					<Button
						disabled={!checkRights}
						text="Valider"
						onClick={handleValidate}
					/>
				</>
			}
		>
			<Group of="component">
				<Text secondary>
					Ton fichier{" "}
					<Text bold secondary>
						The song - copy (2) final v4 FINAL VERSION.mp3
					</Text>{" "}
					correspond à{" "}
				</Text>
				<Text small secondary>
					Trouvé sur Spotify, Apple Music, Deezer et 5 autres
				</Text>

				<ACRMatchLabel title="Quarantine Life" artist="Example" />

				<Hairline />

				<Text secondary>
					Veux-tu importer les informations associées à cette pièce musicale?
				</Text>

				<Column of="component" style={WorkStyles.acrcloud_modal_checkboxes}>
					<ImportMusicDataCheckbox
						label="Genres musicaux"
						undertext="Nom du genre, Nom du genre, Nom du genre"
					/>

					<ImportMusicDataCheckbox
						label="Lien vers les paroles"
						undertext="Description"
					/>

					<ImportMusicDataCheckbox
						label="Liens d'écoute"
						undertext="Description"
					/>

					<ImportMusicDataCheckbox
						label="Autre chose"
						undertext="Description"
					/>
				</Column>

				<Hairline />

				<RadioButton checked={checkRights} onChange={setCheckRights}>
					<Text secondary>
						Je possède les droits sur la pièce musicale téléversée ainsi que sur
						la version trouvée sur les plateformes de diffusion.
					</Text>
				</RadioButton>
			</Group>
		</DialogModal>
	)
}

function ImportMusicDataCheckbox(props) {
	const { label, undertext, ...nextProps } = props

	return (
		<CheckBox {...nextProps}>
			<Column of="tiny">
				<Text>{label}</Text>
				<Text small secondary>
					{undertext}
				</Text>
			</Column>
		</CheckBox>
	)
}

export function ACRMatchLabel(props) {
	return (
		<Row of="component" padding="component" layer="underground">
			<Cover />

			<Column flex={1}>
				<Text small secondary>
					{props.artist}
				</Text>
				<Text heavy>{props.title}</Text>
			</Column>

			<RoundButton>
				<PlayIcon color="white" />
			</RoundButton>
		</Row>
	)
}

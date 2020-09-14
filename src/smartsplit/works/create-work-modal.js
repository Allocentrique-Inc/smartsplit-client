import React, { useState } from "react"
import { useHistory } from "react-router"
import { useStorePath } from "../../mobX"
import ACRCloudModal from "./acrcloud-modal"
import { DialogModal } from "../../widgets/modal"
import { Button } from "../../widgets/button"
import { Group, Column, Row } from "../../layout"
import {
	TextField,
	RadioButton,
	RadioGroup,
	RadioGroupButton,
} from "../../forms"

import ArtistSelectDropdown from "../artist/select"
import RightHolderTag from "../rightholders/tag"
import WorkpieceModel from "../../mobX/models/workpieces/WorkpieceModel"
import { Text } from "../../text"

export default function CreateWorkModal(props) {
	const history = useHistory()
	const workpieces = useStorePath("workpieces")
	const model: WorkpieceModel = useStorePath("workpieces", "model")
	console.log(workpieces)
	//const [acrModal, setAcrModal] = useState(false)
	//	const [workName, setWorkName] = useState("")
	//	const [workType, setWorkType] = useState(null)
	///	const [workOriginalArtist, setWorkOriginalArtist] = useState("")

	//	const [isSaving, setIsSaving] = useState(false)
	//	const [error, setError] = useState(null)

	// const workArtistLabel =
	// 	workType === "remix" || workType === "cover"
	// 		? `${workName} (${workOriginalArtist}), remixé par`
	// 		: `${workName}, par`

	return (
		<DialogModal
			key="create-work"
			size="medium"
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title="Créer une pièce musicale"
			buttons={
				<>
					<Button tertiary text="Annuler" onClick={props.onRequestClose} />
					<Button
						text="C'est parti!"
						onClick={async () => {
							let newPiece = await workpieces.submit()
							if (newPiece) {
								//	props.onRequestClose();
								console.log(newPiece)
								props.onRequestClose()
								history.push("/workpieces/" + newPiece.workpiece_id)
							}
						}}
						disabled={model.busy}
					/>
				</>
			}
		>
			<Group of="group">
				<TextField
					field={model.title}
					undertext="Ne pas include de « featuring » dans le titre"
				/>
				{/*
				<RadioGroup
					label="Cette oeuvre est..."
					value={workType}
					onChange={setWorkType}
				>
					<RadioGroupButton value="original" label="une création originale" />
					<RadioGroupButton value="remix" label="un remix" />
					<RadioGroupButton value="cover" label="une reprise (cover)" />
				</RadioGroup>

				{(workType === "remix" || workType === "cover") && (
					<TextField
						value={workOriginalArtist}
						onChangeText={setWorkOriginalArtist}
						label="Artiste ou groupe originel"
					/>
				)}

				{workType !== null && (
					<Column of="component">
						<ArtistSelectDropdown
							label={workArtistLabel}
							placeholder="Artiste ou groupe"
						/>

						<TextField
							label="Fichier"
							placeholder="ou déposer le fichier ici"
							undertext="Format WAV ou MP3 seulement. 100 Mo maximum."
						/>

						<ArtistSelectDropdown
							label="Qui a collaboré sur cette pièce musicale?"
							placeholder="Ajouter un ou plusieurs collaborateurs"
							undertext="Ces collaborateurs seront automatiquement ajoutés au partage de droit. Vous pourrez toujours les retirer du partage."
						/>

						<Row of="component">
							<RightHolderTag name="Jean-Gabriel Gill-Couture" initials="JG" />
							<RightHolderTag name="Alex A" initials="AA" />
						</Row>
					</Column>
				)}*/}

				{model.saveError && <Text error>{model.saveError}</Text>}
			</Group>

			{/*<ACRCloudModal
				visible={acrModal}
				onRequestClose={() => setAcrModal(false)}
				onValidate={() => setAcrModal(false)}
			/>*/}
		</DialogModal>
	)
}

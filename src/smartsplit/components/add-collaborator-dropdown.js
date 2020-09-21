import React, { useState } from "react"
import Autocomplete from "../../forms/autocomplete"
import PlusCircle from "../../svg/plus-circle"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { useTranslation } from "react-i18next"
import EditModal from "../rightholders/edit-modal"

import { useRightHolderSearch } from "../../appstate/react/right-holders"
import { AddCollaboratorModal } from "../collaborators/AddCollaboratorsModal"
import { useStorePath } from "../../appstate/react"
import { useStores } from "../../mobX"
import { observer } from "mobx-react"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

function AddCollaboratorDropdown(props) {
	console.log(props)
	const { t } = useTranslation()
	const { collaborators } = useStores()
	const results = useRightHolderSearch(props.search || "")
	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				placeholder={t("rightSplits:dropdowns.addCollab")}
				{...props}
				searchResults={results.map((rh) => (
					<Row key={rh.rightHolder_id}>
						<Text>
							{rh.firstName} {rh.lastName}
						</Text>
					</Row>
				))}
				onSelect={(result) => props.onSelect(result.key)}
			>
				<TouchableWithoutFeedback onPress={() => collaborators.new()}>
					<Row of="component" padding="component" style={Styles.actionFrame}>
						<PlusCircle />
						<Text bold action>
							{t("forms:labels.dropdowns.createCollaborator")}
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			</Autocomplete>
			<AddCollaboratorModal
				visible={collaborators.editing}
				onRequestClose={() => collaborators.cancel()}
				onAdded={(result) => {
					props.onSelect(result.key)
				}}
			/>
		</>
	)
}
export default observer(AddCollaboratorDropdown)

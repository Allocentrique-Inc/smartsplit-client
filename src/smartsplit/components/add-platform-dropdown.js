import React, { useState } from "react"
import Autocomplete from "../../forms/autocomplete"
import PlusCircle from "../../svg/plus-circle"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { useTranslation } from "react-i18next"
import EditModal from "../rightholders/edit-modal"
import { AddCollaboratorModal } from "../../pages/dashboard/collaborators"
import { useRightHolderSearch } from "../../appstate/react/right-holders"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

export default function AddPlatformDropdown(props) {
	const { t } = useTranslation()
	const [terms, setTerms] = useState("")
	const results = useRightHolderSearch(terms)
	const { platform } = props
	return (
		<>
			<Autocomplete
				icon={PlusCircle}
				{...props}
				searchResults={results.map(() => (
					<Row key={platform}>
						<Text>{platform}</Text>
					</Row>
				))}
				onSelect={(result) => props.onSelect(result.key)}
			>
				<TouchableWithoutFeedback>
					<Row of="component" padding="component" style={Styles.actionFrame}>
						<PlusCircle />
						<Text bold action>
							{t("document:links.createPlatform")}
						</Text>
					</Row>
				</TouchableWithoutFeedback>
			</Autocomplete>
		</>
	)
}

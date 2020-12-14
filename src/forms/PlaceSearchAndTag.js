import React, { useState } from "react"
import { Column, Row } from "../layout"
import { View, StyleSheet } from "react-native"
import { Text } from "../text"
import { Metrics } from "../theme"
import { Tag } from "../widgets/tag"
import Autocomplete from "./autocomplete"
import Search from "../../assets/svg/search.svg"
import { Field, FieldType } from "../mobX/BaseModel"
import { action } from "mobx"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { googlePlaceAutocomplete, googlePlaceDetails } from "../../api/google"
import PlaceTag from "../smartsplit/components/PlaceTag";

const Styles = StyleSheet.create({
	tag: {
		marginRight: Metrics.spacing.small,
		marginBottom: Metrics.spacing.small,
	},
	tagContainer: {
		marginRight: -Metrics.spacing.small,
		marginBottom: -Metrics.spacing.small,
	},
})
/**
 * Component for doing search and tag with Google Search
 *
 * this component works ONLY on fields thus field prop is required
 * optionally, label and error can be passed to override the model's label and error values if needed
 *
 * @type {function(*): *}
 */
const PlaceSearchAndTag = observer((props) => {
	const { t } = useTranslation()
	const [term, setTerm] = useState("")
	const [searchResults, setSearchResults] = useState([])
	let {
		field,
		label,
		error,
		selection
		...nextProps
	} = props
	if (field) {
		if (field.type !== FieldType.collection)
			throw new Error(
				"Search and tag must be mapped to a field of type collection"
			)
		label = label?label:t(field.label)
		error = error?error:t(field.error)
		selection = field.array
	}
	const [search, setSearch] = useState("")
	const renderSelectedItems = () => {
		//ToDo: Si n'entre rien dans le champ ne pas ajouter de tag en cliquant sur Ajouter
		return (
			<Row wrap style={Styles.tagContainer}>
				{selection.map((place,i) => (
					<PlaceTag place={place} field={field} index={i}/>
				))}
			</Row>
		)
	}
	return (
		<Column of="component">
			<Autocomplete
				label={label}
				error={error}
				icon={Search}
				search={search}
				onUnselect={(place)=>{
	
						let index = -1
						field.array.forEach((entry,i)=>{if(entry.id === place.id) index =i})
						if(index>-1)
							field.removeItem(index)
			
				}}
				onSelect={async (place) => {
					// if entry already exists, ignore it
					if (field.array.filter((entry) => entry.id === place.id).length)
						return
					// otherwise we add it directly
					if(field)
						field.add(place)
					const response = await googlePlaceDetails(place.id)
					if (response.OK) {
              field.array.forEach((entry, index) =>{
                if (entry.id === response.result.place_id) {
                  field.setItem(index, {
                    ...entry,
                    address: response.result.formatted_address,
                  })
                }
              })
					}
				}}
				onSearchChange={async (text) => {
					setSearch(text)
					const response = await googlePlaceAutocomplete(search)
					let results = []
					if (response.OK) {
						results = response.predictions.map((place) => ({
							id: place.place_id,
							name: place.description,
							address: "",
						}))
					}
					setSearchResults(results)
				}}
				{...nextProps}
			/>
			{selection && selection.length > 0 && renderSelectedItems()}
		</Column>
	)
})
export default PlaceSearchAndTag

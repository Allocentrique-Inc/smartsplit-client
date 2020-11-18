import React from "react"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import { Label, TextDropdown } from "../../forms"
import { labelProps } from "../../forms/label"
import { Layer, Column } from "../../layout"
import { Text } from "../../text"
import FormStyles from "../../styles/forms"
import { highlightMatchedStrings } from "../../utils/utils"

export default class AddGenreDropdown extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			searchText: props.searchText || "",
			value: props.defaultValue || props.value || null,
			genres: props.genres, // TODO: Plus tard, base de donnée + API
			focused: false,
		}
		this.state.text = props.genres[this.state.value] || ""
	}

	handleSearchChange = (text) => {
		this.setState({ searchText: text })

		if (this.props.onSearchChange) this.props.onSearchChange(text)
	}

	handleSelectionChange = (key, value) => {
		this.setState({
			value: key,
			text: value,
			searchText: value,
		})
		if (this.props.onSelect) this.props.onSelect({ id: key, name: value })
	}

	handleFocus = () => {
		this.setState({
			focused: true,
			searchText: this.state.text,
		})
	}

	handleBlur = () => this.setState({ focused: false })

	addSearchAsNew = () => {
		this.setState({
			value: null,
			text: this.state.searchText,
		})
	}

	render() {
		//filtre puis map, retournent array
		const genres = this.state.genres
			.filter((g) => compareGenres(g.name, this.state.searchText))
			// i = index
			.map((g, i) => (
				<GenreDropdownRow
					key={i}
					genreKey={g.id}
					value={g.name}
					onSelect={this.handleSelectionChange}
					search={this.state.searchText}
				/>
			))
		const addNew = (
			<TouchableWithoutFeedback onPress={this.addSearchAsNew}>
				<Layer padding="inside">
					<Text>
						Ajouter <Text bold>{this.state.searchText}</Text>
					</Text>
				</Layer>
			</TouchableWithoutFeedback>
		)

		return (
			<TextDropdown
				placeholder={this.props.placeholder}
				value={this.state.focused ? this.state.searchText : this.state.text}
				onChangeText={this.handleSearchChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				{...labelProps(this.props)}
			>
				<Layer layer="overground_moderate">
					<ScrollView style={FormStyles.select_scroll}>
						{genres}
						{this.state.searchText ? addNew : null}
					</ScrollView>
				</Layer>
			</TextDropdown>
		)
	}
}

export function GenreDropdownRow(props) {
	//console.log(props)
	function handleSelect() {
		props.onSelect(props.genreKey, props.value)
	}

	return (
		<TouchableWithoutFeedback onPress={handleSelect}>
			<Layer padding="inside">
				<Text>{highlightMatchedStrings(props.value, props.search)}</Text>
			</Layer>
		</TouchableWithoutFeedback>
	)
}

export function compareGenres(a, b) {
	//console.log(typeof a)
	//console.log(typeof b)
	//console.log(a)
	//console.log(b)
	return a.toLowerCase().indexOf(b.toLowerCase()) > -1
}

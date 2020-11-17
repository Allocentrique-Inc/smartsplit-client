import React from "react"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import { Label, TextDropdown } from "../../forms"
import { labelProps } from "../../forms/label"
import { Layer, Column } from "../../layout"
import { Text } from "../../text"
import FormStyles from "../../styles/forms"

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
		const genres = []

		for (let key in this.state.genres) {
			let genre = this.state.genres[key]

			if (!compareGenres(genre, this.state.searchText)) continue

			genres.push(
				<GenreDropdownRow
					key={key}
					genreKey={key}
					value={genre}
					onSelect={this.handleSelectionChange}
				/>
			)
		}

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
	function handleSelect() {
		props.onSelect(props.genreKey, props.value)
	}

	return (
		<TouchableWithoutFeedback onPress={handleSelect}>
			<Layer padding="inside">
				<Text>{props.value}</Text>
			</Layer>
		</TouchableWithoutFeedback>
	)
}

export function compareGenres(a = "", b = "") {
	return a.toLowerCase().indexOf(b.toLowerCase()) > -1
}

import React from "react"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import { Label, TextDropdown } from "../../components/forms/form-controls"
import { labelProps } from "../../components/forms/form-controls/wrapper"
import { Layer, Column } from "../../layout"
import { Text } from "../../text"
import FormStyles from "../../styles/forms"

export default class ArtistSelectDropdown extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			searchText: props.searchText || "",
			value: props.defaultValue || props.value || null,
			artists: props.artists, // TODO: Plus tard, base de donnée + API
			focused: false,
		}
		this.state.text = props.artists[this.state.value] || ""
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
		const artists = []

		for (let key in this.state.artists) {
			let artist = this.state.artists[key]

			if (!compareArtists(artist, this.state.searchText)) continue

			artists.push(
				<ArtistDropdownRow
					key={key}
					artistKey={key}
					value={artist}
					onSelect={this.handleSelectionChange}
				/>
			)
		}

		const addNew = (
			<TouchableWithoutFeedback onPress={this.addSearchAsNew}>
				<Layer padding="inside">
					<Text>
						Ajouter <Text bold>{this.state.searchText}</Text> comme nouvel
						artiste ou groupe
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
						{artists}
						{this.state.searchText ? addNew : null}
					</ScrollView>
				</Layer>
			</TextDropdown>
		)
	}
}

ArtistSelectDropdown.defaultProps = {
	artists: {
		1: "Example",
		2: "Artiste",
		3: "Groupe",
		4: "Mister Valaire",
	},
}

export function ArtistDropdownRow(props) {
	function handleSelect() {
		props.onSelect(props.artistKey, props.value)
	}

	return (
		<TouchableWithoutFeedback onPress={handleSelect}>
			<Layer padding="inside">
				<Text>{props.value}</Text>
			</Layer>
		</TouchableWithoutFeedback>
	)
}

export function compareArtists(a, b) {
	return a.toLowerCase().includes(b.toLowerCase())
}

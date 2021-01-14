import React from "react"
import { ScrollView, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { withTranslation } from "react-i18next"
import { Label, TextDropdown } from "../../forms"
import { labelProps } from "../../forms/label"
import { Layer, Column, Row } from "../../layout"
import { Text } from "../../text"
import { Colors } from "../../theme"
import FormStyles from "../../styles/forms"
import { highlightMatchedStrings } from "../../utils/utils"
import PlusCircle from "../../svg/plus-circle"
import { toJS } from "mobx"
import { searchEntities } from "../../../api/entities"

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

class AddGenreDropdown extends React.PureComponent {
	state = {
		searchText: "",
		value: null,
		genres: [],
		focused: false,
		loading: false,
		text: "",
	}
	constructor(props) {
		super(props)
		this.state = {
			searchText: "",
			value: props.field.value || null,
			genres: [],
			focused: false,
			loading: false,
			text: props.field.value.name || "",
		}
	}
	componentDidMount() {
		this.handleSearchChange(this.state.text)
	}

	handleSearchChange = async (text) => {
		this.setState({ searchText: text, loading: true })
		let response = await searchEntities("musical-genres", text)
		this.setState({ genres: response, loading: false })
	}

	handleSelectionChange = (genre) => {
		this.setState({
			value: genre,
			text: genre.name,
			searchText: genre.name,
		})
		if (this.props.field) this.props.field.setValue(genre)
		//if (this.props.onSelect) this.props.onSelect({ id: key, name: value })
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
		const { t, i18n } = this.props
		const quotation = i18n.language === "en" ? '"' : "« "
		const quotationEnd = i18n.language === "en" ? '"' : " »"

		/* 		const addNew = (
			<TouchableWithoutFeedback onPress={this.addSearchAsNew}>
				<Row of="component" padding="component" style={Styles.actionFrame}>
					<PlusCircle />
					<Text bold action>
						{t("document:add")}
						{this.state.searchText ? quotation : null}
						{this.state.searchText}
						{this.state.searchText ? quotationEnd : null}
					</Text>
				</Row>
			</TouchableWithoutFeedback>
		) */

		return (
			<TextDropdown
				label={t("document:infos.mainGenre")}
				placeholder={t("document:infos.addGenre")}
				value={this.state.focused ? this.state.searchText : this.state.text}
				onChangeText={this.handleSearchChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				//{...labelProps(this.props)}
			>
				<Layer layer="overground_moderate">
					<ScrollView style={FormStyles.select_scroll}>
						{this.state.genres.map((g, i) => (
							<GenreDropdownRow
								key={i}
								genreKey={g.entity_id}
								value={g.name}
								onSelect={() => this.handleSelectionChange(g)}
								search={this.state.searchText}
							/>
						))}
						{/* {this.state.searchText ? addNew : null} */}
						{/* {addNew} */}
					</ScrollView>
				</Layer>
			</TextDropdown>
		)
	}
}

export default withTranslation()(AddGenreDropdown)

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

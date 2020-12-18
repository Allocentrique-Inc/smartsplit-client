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

const Styles = StyleSheet.create({
	actionFrame: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
	},
})

class AddDistributorDropdown extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			searchText: props.searchText || "",
			value: props.defaultValue || props.value || null,
			distributors: props.distributors, // TODO: Plus tard, base de donnée + API
			focused: false,
		}
		this.state.text = props.distributors[this.state.value] || ""
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
		const { t, i18n } = this.props
		const distributors = this.state.distributors
			.filter((g) => compareDistributors(g.name, this.state.searchText))
			.map((g, i) => (
				<DistributorDropdownRow
					key={i}
					distributorKey={g.id}
					value={g.name}
					onSelect={this.handleSelectionChange}
					search={this.state.searchText}
				/>
			))

		return (
			<TextDropdown
				label={t("document:release.supports.distribution")}
				placeholder={t("document:release.supports.addDistribution")}
				value={this.state.focused ? this.state.searchText : this.state.text}
				onChangeText={this.handleSearchChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
			>
				<Layer layer="overground_moderate">
					<ScrollView style={FormStyles.select_scroll}>
						{distributors}
					</ScrollView>
				</Layer>
			</TextDropdown>
		)
	}
}

export default withTranslation()(AddDistributorDropdown)

export function DistributorDropdownRow(props) {
	function handleSelect() {
		props.onSelect(props.distributorKey, props.value)
	}

	return (
		<TouchableWithoutFeedback onPress={handleSelect}>
			<Layer padding="inside">
				<Text>{highlightMatchedStrings(props.value, props.search)}</Text>
			</Layer>
		</TouchableWithoutFeedback>
	)
}

export function compareDistributors(a, b) {
	return a.toLowerCase().indexOf(b.toLowerCase()) > -1
}

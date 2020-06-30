import React, { useState } from "react"
import { Platform } from "react-native"
import { DialogModal } from "../../widgets/modal"
import { useTranslation } from "react-i18next"
import { Group, Column, Row } from "../../layout"
import {
	Form,
	FormSubmit,
	LabelText,
	TextField,
	CheckBox,
	PasswordField,
	RadioButton,
	RadioGroup,
	RadioGroupButton,
	Dropdown,
	Select,
	PhoneNumberField,
	DateField,
	useImagePicker,
} from "../../forms"
import { Text } from "../../text"
import Button from "../../widgets/button"
import { SearchAndTag } from "../../forms/search-and-tag"
import Tooltip, { TooltipIcon } from "../../widgets/tooltip"

export default function InviteNewUserModal(props) {
	const [t] = useTranslation()

	const {
		users,
		firstName,
		lastName,
		artistName,
		email,
		workPiece,
		workTitle,
	} = props

	const [search, setSearch] = useState("")
	const [selected, setSelected] = useState([])

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("newUserInvite:title")}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={props.onRequestClose}
					/>
					<Button text={t("general:buttons.save")} onClick={props.onSubmit} />
				</>
			}
		>
			<Group
				of="group"
				style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
			>
				<Form
					values={{ firstName } + { lastName }}
					onSubmit={(values) =>
						alert("Submit " + JSON.stringify(values, null, 4))
					}
				>
					<Column of="group">
						<Row of="component">
							<TextField
								value={firstName}
								label={t("forms:labels.legalFirstName")}
							/>

							<TextField
								value={lastName}
								label={t("forms:labels.legalLastName")}
							/>
						</Row>

						<TextField
							value={artistName}
							label={t("forms:labels.artistName")}
							undertext={t("forms:undertexts.artistName")}
						/>

						<TextField value={email} label={t("forms:labels.email")} />

						<SearchAndTag
							label={t("forms:labels.groups")}
							searchResults={props.searchResults}
							searchInput={search}
							onSearchChange={setSearch}
							selectedItems={selected}
							onSelect={(selection) => setSelected([...selected, selection])}
							onUnselect={(selection) =>
								setSelected(selected.filter((i) => i !== selection))
							}
							placeholder={t("forms:placeholders.groupSearch")}
						/>

						<LabelText>{t("newUserInvite:checkbox")} </LabelText>

						<Row>
							<CheckBox
								value="author"
								label={t("general:checkbox.author")}
								tooltip=""
							/>
						</Row>
						<CheckBox
							value="composer"
							label={t("general:checkbox.composer")}
							tooltip=""
						/>
						<CheckBox
							value="mixer"
							label={t("general:checkbox.mixer")}
							tooltip="exemple"
						/>
						<CheckBox
							value="performer"
							label={t("general:checkbox.performer")}
							tooltip=""
						/>
						<Text secondary small>
							{t("newUserInvite:checkboxUndertext")}
						</Text>
					</Column>
				</Form>
			</Group>
		</DialogModal>
	)
}

import React, { useState, useRef } from "react"
import { View, TouchableWithoutFeedback } from "react-native"
import moment from "moment"
import { Row, Column, Section, Group, Flex, Hairline } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { DialogModal } from "../../widgets/modal"
import { TabBar, Tab } from "../../widgets/tabs"
import { Button, RoundButton } from "../../widgets/button"
import LogoAddRound from "../../svg/add-round"
import { useTranslation } from "react-i18next"
import { emailValidator, notEmptyValidator } from "../../../helpers/validators"
import {
	CheckBoxGroup,
	CheckBoxGroupButton,
	Form,
	TextField,
} from "../../forms"
import { SearchAndTag } from "../../forms"
import { inviteNewUser } from "../../../api/users"

export default function CollaboratorsPage() {
	const [modalOpen, setModal] = useState(false)

	return (
		<>
			<AddCollaboratorModal
				visible={modalOpen}
				onRequestClose={() => setModal(false)}
			/>

			<Group of="group">
				<Row of="component">
					<Heading level="2">Mes collaborateurs</Heading>
					<Flex />
					<TouchableWithoutFeedback
						onPress={() => setModal(true)}
						accessibilityRole="button"
					>
						<View>
							<LogoAddRound size="large" />
						</View>
					</TouchableWithoutFeedback>
				</Row>

				<TabBar>
					<Tab key="tab1" title="Atistes" default>
						<Column of="none" spacer={Hairline}></Column>
					</Tab>
					<Tab key="tab2" title="Groupes de musique">
						<Column of="none" spacer={Hairline}></Column>
					</Tab>
					<Tab key="tab3" title="Éditeurs">
						<Column of="none" spacer={Hairline}></Column>
					</Tab>
				</TabBar>
				<Row>
					<Flex />
					<TouchableWithoutFeedback
						onPress={() => setModal(true)}
						accessibilityRole="button"
					>
						<View>
							<LogoAddRound size="xlarge" />
						</View>
					</TouchableWithoutFeedback>
					{/* Aucune différence entre large et xlarge ? */}
				</Row>
			</Group>
		</>
	)
}

const collaboratorFormValues = {
	firstName: "",
	lastName: "",
	artistName: "",
	email: "",
	groups: [],
	roles: [],
}

export function CollaboratorForm({
	onSubmittable,
	formRef,
	children,
	onSuccess,
}) {
	const { t } = useTranslation()
	const form = formRef || useRef()
	const searchResults = ["Aut", "Chose", "Comme", "Resultat"]
	const handleChange = ({ firstName, lastName, artistName, email, groups }) => {
		if (!onSubmittable) return
		onSubmittable(
			notEmptyValidator(firstName) &&
				notEmptyValidator(lastName) &&
				notEmptyValidator(artistName) &&
				emailValidator(email) &&
				notEmptyValidator(groups)
		)
	}

	//Pas de validation de champs car refactor de form pour bientot.
	//De plus, le backend accepte uniquement les paramètres firstName, lastName et email
	//pour le moment
	const handleSubmit = async ({ firstName, lastName, email }) => {
		try {
			const user = await inviteNewUser({ firstName, lastName, email })
			console.log(user)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<Form
			ref={form}
			onChange={handleChange}
			onSubmit={handleSubmit}
			values={collaboratorFormValues}
		>
			<Column of="group">
				<Row of="component">
					<TextField
						name="firstName"
						label={t("forms:labels.legalFirstName")}
					/>
					<TextField name="lastName" label={t("forms:labels.legalLastName")} />
				</Row>
				<TextField
					name="artistName"
					label={t("forms:labels.artistName")}
					label_hint={t("forms:labels.optional")}
					undertext={t("forms:undertexts.artistName")}
					undertext_lines={1}
				/>
				<TextField
					name="email"
					label={t("forms:labels.enterEmail")}
					placeholder={t("forms:placeholders.emailExample")}
				/>
				<SearchAndTag
					name="groups"
					label={t("forms:labels.groups")}
					placeholder={t("forms:placeholders.groupSearch")}
					searchResults={searchResults}
				/>
				<CheckBoxGroup
					name="roles"
					label={t("forms:labels.defaultRoles")}
					undertext={t("forms:undertexts.defaultRoles")}
				>
					{t("forms:options.defaultRoles").map((role) => (
						<CheckBoxGroupButton
							value={role.value}
							key={role.value}
							label={role.displayValue}
						/>
					))}
				</CheckBoxGroup>
			</Column>
		</Form>
	)
}

export function AddCollaboratorModal(props) {
	const { t } = useTranslation()
	const form = useRef()
	const submit = () => form.current.submit()
	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("forms:addCollabArtist")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={props.onRequestClose}
					/>
					<Button text={t("general:buttons.save")} onClick={submit} />
				</>
			}
		>
			<Group>
				<CollaboratorForm formRef={form} />
			</Group>
		</DialogModal>
	)
}

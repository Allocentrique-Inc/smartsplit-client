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
import { CheckBoxGroup, CheckBoxGroupButton } from "../../forms"
import TextField from "../../forms/text"
import { SearchAndTag } from "../../forms"
import { inviteNewUser } from "../../../api/users"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"

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

export const CollaboratorForm = observer(
	({ onSubmittable, formRef, children, onSuccess }) => {
		const { t } = useTranslation()
		const model = useStorePath("users", "collaborators", "model")
		//const form = formRef || useRef()
		const searchResults = ["Aut", "Chose", "Comme", "Resultat"]
		const handleChange = ({
			firstName,
			lastName,
			artistName,
			email,
			groups,
		}) => {
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
			<Column of="group">
				<Row of="component">
					<TextField field={model.firstName} />
					<TextField field={model.lastName} />
				</Row>
				<TextField
					field={model.artistName}
					label_hint={t("forms:labels.optional")}
					undertext={t("forms:undertexts.artistName")}
					undertext_lines={1}
				/>
				<TextField
					field={model.email}
					placeholder={t("forms:placeholders.emailExample")}
				/>
				<SearchAndTag field={model.groups} searchResults={searchResults} />
				<CheckBoxGroup
					field={model.defaultRoles}
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
		)
	}
)

export function AddCollaboratorModal(props) {
	const model = useStorePath("users", "collaborators", "model")
	const { t } = useTranslation()
	//const form = useRef()
	//const submit = () => form.current.submit()
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
					<Button
						text={t("general:buttons.save")}
						onClick={() => {
							model.submit()
						}}
					/>
				</>
			}
		>
			<Group>
				<CollaboratorForm />
			</Group>
		</DialogModal>
	)
}

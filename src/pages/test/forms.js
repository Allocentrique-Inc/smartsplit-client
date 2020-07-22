import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Image, View, TouchableWithoutFeedback } from "react-native"
import {
	Form,
	FormSubmit,
	LabelText,
	TextField,
	PasswordField,
	CheckBox,
	RadioButton,
	RadioGroup,
	RadioGroupButton,
	Dropdown,
	Select,
	PhoneNumberField,
	DateField,
	useImagePicker,
	FileField,
} from "../../forms"
import { Section, Column, Row, NoSpacer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import Button from "../../widgets/button"

import ArtistSelectDropdown from "../../smartsplit/artist/select"
import { SearchAndTag } from "../../forms/search-and-tag"

import { PictureCropModal } from "../../widgets/picture-crop"
import { Status } from "../../utils/enums"
import { MailList } from "../../smartsplit/components/mail-list"
import { ProIdList } from "../../smartsplit/components/pro-id-list"
import Tooltip, { TooltipIcon } from "../../widgets/tooltip"
import { Colors } from "../../theme"
import AddCollaboratorDropdown from "../../smartsplit/components/add-collaborator-dropdown"

export default function FormsTest() {
	return (
		<Section of="group">
			<TestText />
			<TestBasicFields />
			<TestFilesAndImages />
			<TestTooltips />
			<TestBasicDropdowns />
			<TestSearchAndTag />
			<TestCheckboxes />
		</Section>
	)
}

function TestSearchAndTag() {
	const searchResults = ["Aut", "Chose", "Comme", "Resultat"]

	const [search1, setSearch1] = useState("")
	const [search2, setSearch2] = useState("")
	const [selected, setSelected] = useState([
		"Lorem",
		"Ipsum",
		"Dolor",
		"Rammstein",
		"Blutengel",
		"Machinae Supremacy",
	])

	return (
		<Row of="component">
			<SearchAndTag
				label="Search and tag"
				searchResults={searchResults}
				searchInput={search1}
				onSearchChange={setSearch1}
				selectedItems={selected}
				onSelect={(selection) => setSelected([...selected, selection])}
				onUnselect={(selection) =>
					setSelected(selected.filter((i) => i !== selection))
				}
				placeholder="Cherche pour tag"
			/>
			<AddCollaboratorDropdown
				label="Add a collaborator"
				searchResults={searchResults}
				searchInput={search2}
				onSearchChange={setSearch2}
				onSelect={(selection) => console.log(selection)}
				placeholder="Ajouter un collaborateur..."
			/>
		</Row>
	)
}

function TestText() {
	const [t, i18n] = useTranslation()

	return (
		<Column of="component">
			<Heading level="1">{t("test:title")}</Heading>

			<Row of="component">
				<Button
					text="Français"
					primary={i18n.language === "fr"}
					disabled={i18n.language === "fr"}
					onClick={() => i18n.changeLanguage("fr")}
				/>
				<Button
					text="English"
					primary={i18n.language === "en"}
					disabled={i18n.language === "en"}
					onClick={() => i18n.changeLanguage("en")}
				/>
			</Row>

			<Paragraph>
				Cette page a pour but de démontrer les différentes composantes de
				formulaire et mise en page utilisées dans les formulaires à travers le
				site
				<TooltipIcon
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
				ullamcorper elit et tortor consequat dignissim vehicula id tortor."
				/>
			</Paragraph>

			<Paragraph>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
				ullamcorper elit et tortor consequat dignissim vehicula id tortor.
				Praesent tincidunt elementum tellus, quis tristique felis mollis at.
				Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non.
				Mauris convallis ultricies placerat.
			</Paragraph>
		</Column>
	)
}

function TestBasicFields() {
	const { t } = useTranslation()
	const [phoneNumber, setPhoneNumber] = useState("")
	const [date, setDate] = useState("")
	const [file, setFile] = useState(null)

	function onFileSelect(file) {
		window.selectedFile = file
		console.log("File input: ", file)
		setFile(file)
	}

	return (
		<Form
			values={{ firstName: "John", lastName: "Doe" }}
			onSubmit={(values) => alert("Submit " + JSON.stringify(values, null, 4))}
		>
			<Column of="component">
				<Row of="component">
					<TextField
						name="firstName"
						label="Prénom"
						label_hint="Optionnel"
						placeholder="prénom"
					/>

					<TextField
						name="lastName"
						label="Nom"
						placeholder="nom"
						tooltip="Cet nom sera utilisé pour la production des documents légaux, et doit donc correspondre à votre vrai nom."
					/>
				</Row>

				<PasswordField
					name="password"
					label="Mot de passe"
					undertext="Lettres et caractères spéciaux"
					placeholder="correct horse battery staple"
				/>

				<TextField
					name="email"
					label="Adresse courriel"
					label_hint="Requis"
					undertext="Entrez votre adresse courriel ici."
					defaultValue="test@smartsplit.org"
					placeholder="courriel"
				/>

				<Row of="component">
					<PhoneNumberField
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						label="Numéro de téléphone"
						label_hint="Optionnel"
						placeholder="Numero de tel"
					/>
					<DateField
						value={date}
						onChangeText={setDate}
						label="Date de naissance"
					/>
				</Row>

				<Row of="component">
					<FileField
						label="Envoie ta toune"
						file={file}
						onFileChange={onFileSelect}
					/>
				</Row>

				<Row align="right">
					<FormSubmit>
						{(submit) => <Button text="Soumettre" onClick={submit} />}
					</FormSubmit>
				</Row>
			</Column>
		</Form>
	)
}

function TestBasicDropdowns() {
	const { t } = useTranslation()
	return (
		<>
			<Row of="component">
				<Dropdown
					label="Dropdown simple"
					placeholder="Sélectionnez..."
					style={{ flex: 1 }}
					noFocusToggle
				>
					<Column
						of="component"
						layer="overground_moderate"
						padding="component"
					>
						<Heading level="4">Un dropdown simple</Heading>
						<Paragraph>
							Ce dropdown ne gère aucun état ou sélection: on est libre d'y
							mettre ce qu'on veut à l'intérieur. Pour un dropdown de sélection,
							ou autocomplete, voir: Select, AutocompleteField.
						</Paragraph>
					</Column>
				</Dropdown>

				<Select
					label="Champ de sélection"
					placeholder="Sélectionnez..."
					style={{ flex: 1 }}
					options={[
						{ key: "A", value: "Option A" },
						{ key: "B", value: "Option B" },
						{ key: "C", value: "Option C" },
					]}
				/>

				<ArtistSelectDropdown
					label="Sélectionne ton groupe"
					placeholder="Artiste ou groupe"
					artists={{
						1: "Céline Dion",
						2: "Katy Perry",
						3: "David Guetta",
						4: "M4SONIC",
						5: "Eminem",
						6: "Scandroid",
						7: "DJ Test",
						8: "Mister Valaire",
					}}
				/>
			</Row>
		</>
	)
}
function TestCheckboxes() {
	const [testCheckBox1, setTestCheckBox1] = useState(false)

	return (
		<Row of="component">
			<Column of="component" style={{ flex: 1 }}>
				<RadioGroup label="Choisis une des options suivantes:">
					<RadioGroupButton value="A" label="Option A" />
					<RadioGroupButton value="B" label="Option B" />
					<RadioGroupButton value="C" label="Option C" />
				</RadioGroup>
			</Column>

			<Column of="component" style={{ flex: 1 }}>
				<LabelText>Cases à cocher seules </LabelText>
				<CheckBox
					label="Cochez moi, cochez moi!"
					onChange={setTestCheckBox1}
					checked={testCheckBox1}
				/>

				<CheckBox label="Cochez moi aussi!" disabled={!testCheckBox1} />
			</Column>

			<Column of="component" style={{ flex: 1 }}>
				<LabelText>Boutons radios seuls</LabelText>
				<RadioButton label="Sélectionnez moi!" />

				<RadioButton
					label="Sélectionnez moi à la place!"
					disabled={!testCheckBox1}
				/>
			</Column>
		</Row>
	)
}

function TestFilesAndImages(props) {
	const [image, selectImage] = useImagePicker()
	const [showCrop, setShowCrop] = useState(false)
	const [croppedImage, setCroppedImage] = useState(null)

	return (
		<Column of="component">
			<NoSpacer>
				<PictureCropModal
					visible={showCrop}
					image={image}
					onRequestClose={() => setShowCrop(false)}
					onSaveImage={(image) => {
						setShowCrop(false)
						setCroppedImage(image)
					}}
				/>
			</NoSpacer>

			<Row of="component">
				<Button text="Sélectionner image" onClick={selectImage} />
				<Button
					text="Recadrer"
					disabled={!image}
					onClick={() => setShowCrop(true)}
				/>
			</Row>
			<Row of="component">
				{image && (
					<Image
						source={{ uri: image.uri }}
						style={{
							width: 256,
							height: 256,
						}}
						resizeMode="contain"
					/>
				)}

				{croppedImage && (
					<Image
						source={{ uri: croppedImage }}
						style={{ width: 256, height: 256 }}
					/>
				)}
			</Row>
		</Column>
	)
}

function TestTooltips() {
	const [showTooltip, setShowTooltip] = useState(false)
	const tooltipAnchorRef = React.createRef()
	const [arrowMode, setArrowMode] = useState(0)

	const MODES = [
		"bottom-center",
		"bottom-left",
		"left-bottom",
		"left-center",
		"left-top",
		"top-left",
		"top-center",
		"top-right",
		"right-top",
		"right-center",
		"right-bottom",
		"bottom-right",
	]

	useEffect(() => {
		if (!showTooltip) return
		const timer = setTimeout(() => setArrowMode(arrowMode + 1), 1000)
		return () => clearTimeout(timer)
	}, [showTooltip, arrowMode])

	return (
		<Row of="component">
			<Button
				text="Tooltip"
				onClick={() => setShowTooltip(!showTooltip)}
				viewRef={tooltipAnchorRef}
			/>

			<Tooltip
				arrow={MODES[arrowMode % MODES.length]}
				width={300}
				relativeTo={tooltipAnchorRef}
				visible={showTooltip}
				onDismiss={setShowTooltip}
				text="Cette page a pour but de démontrer les différentes composantes de
				formulaire et mise en page utilisées dans les formulaires à travers le
				site"
			/>
		</Row>
	)
}

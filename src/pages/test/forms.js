import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Image } from "react-native"
import {
	LabelText,
	TextField,
	PasswordField,
	CheckBox,
	RadioButton,
	RadioGroup,
	RadioGroupButton,
	Dropdown,
	Select,
	useImagePicker,
} from "../../forms"
import { Section, Group, Column, Row, Hairline, Layer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import Button from "../../widgets/button"

import ArtistSelectDropdown from "../../smartsplit/artist/select"
import AuthModal from "../auth/modal"
import { SearchAndTag } from "../../forms/search-and-tag"
import { PhoneNumberField } from "../../forms/phone-number"
import { DateField } from "../../forms/date"

import { PictureCropModal } from "../../widgets/picture-crop"

export default function FormsTest() {
	return (
		<Section of="group">
			<TestText />
			<TestBasicFields />
			<TestFilesAndImages />
			<TestTooltips />
			<TestBasicDropdowns />

			<Row of="component">
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

			<TestCheckboxes />
			<TestSearchAndTag />
		</Section>
	)
}

function TestSearchAndTag() {
	const searchResults = [
		"Lorem",
		"Ipsum",
		"Dolor",
		"Rammstein",
		"Blutengel",
		"Machinae Supremacy",
	]

	const [search, setSearch] = useState("")
	const [selected, setSelected] = useState([
		"Lorem",
		"Ipsum",
		"Dolor",
		"Rammstein",
		"Blutengel",
		"Machinae Supremacy",
	])

	return (
		<SearchAndTag
			label="Search and tag"
			searchResults={searchResults}
			searchInput={search}
			onSearchChange={setSearch}
			selectedItems={selected}
			onSelect={(selection) => setSelected([...selected, selection])}
			onUnselect={(selection) =>
				setSelected(selected.filter((i) => i !== selection))
			}
			placeholder="Cherche pour tag"
		/>
	)
}

function TestText() {
	const [t, i18n] = useTranslation()
	const [showAuthModal, setShowAuthModal] = useState(false)

	return (
		<Column of="component">
			<AuthModal
				visible={showAuthModal}
				onCancel={() => setShowAuthModal(false)}
				onSuccess={() => setShowAuthModal(false)}
			/>

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

				<Button text="Auth Dialog" onClick={() => setShowAuthModal(true)} />
			</Row>

			<Paragraph>
				Cette page a pour but de démontrer les différentes composantes de
				formulaire et mise en page utilisées dans les formulaires à travers le
				site
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
	const [phoneNumber, setPhoneNumber] = useState("")
	const [date, setDate] = useState("")
	return (
		<Column of="component">
			<Row of="component">
				<TextField
					label="Prénom"
					label_hint="Optionnel"
					defaultValue="Testing"
					placeholder="prénom"
				/>

				<TextField label="Nom" defaultValue="Test" placeholder="nom" />
			</Row>

			<PasswordField
				label="Mot de passe"
				undertext="Lettres et caractères spéciaux"
				placeholder="correct horse battery staple"
			/>

			<TextField
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
			</Row>
			<Row of="component">
				<DateField
					value={date}
					onChangeText={setDate}
					label="Date de naissance"
				/>
			</Row>
		</Column>
	)
}

function TestBasicDropdowns() {
	return (
		<Row of="component">
			<Dropdown
				label="Dropdown simple"
				placeholder="Sélectionnez..."
				style={{ flex: 1 }}
				noFocusToggle
			>
				<Column of="component" layer="overground_moderate" padding="component">
					<Heading level="4">Un dropdown simple</Heading>
					<Paragraph>
						Ce dropdown ne gère aucun état ou sélection: on est libre d'y mettre
						ce qu'on veut à l'intérieur. Pour un dropdown de sélection, ou
						autocomplete, voir: Select, AutocompleteField.
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
		</Row>
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
			<PictureCropModal
				visible={showCrop}
				image={image}
				onRequestClose={() => setShowCrop(false)}
				onSaveImage={(image) => {
					setShowCrop(false)
					setCroppedImage(image)
				}}
			/>

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

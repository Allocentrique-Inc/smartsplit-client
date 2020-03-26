import React, { useState } from "react"
import { View, ScrollView, TouchableWithoutFeedback } from "react-native"
import {
	LabelText,
	TextField,
	PasswordField,
	CheckBox,
	RadioButton,
	RadioGroup,
	RadioGroupButton,
	Dropdown,
	TextDropdown,
	Select,
} from "../../forms"
import { Section, Group, Column, Row, Hairline, Layer } from "../../layout"
import { Heading, Paragraph, Text }                    from "../../text"
import Button from "../../widgets/button"
import FacebookIcon from "../../svg/facebook"
import GoogleIcon from "../../svg/google"

import ArtistSelectDropdown from "../../smartsplit/artist/select"

export default function FormsTest() {
	return <Section of="group">
		<TestText />
		<TestBasicFields />
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
	</Section>
}

function TestText() {
	return <Column of="component">
		<Heading level="1">Test des formulaires</Heading>

		<Paragraph>Cette page a pour but de démontrer les différentes composantes de formulaire et mise en page utilisées dans les formulaires à travers le site</Paragraph>

		<Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit et tortor consequat dignissim vehicula id tortor. Praesent tincidunt elementum tellus, quis tristique felis mollis at. Vestibulum pellentesque laoreet lectus, quis ultrices eros vehicula non. Mauris convallis ultricies placerat.</Paragraph>
	</Column>
}

function TestBasicFields() {
	return <Column of="component">
		<Row of="component">
			<TextField
				label="Prénom"
				label_hint="Optionnel"
				defaultValue="Testing"
				placeholder="prénom"
			/>

			<TextField
				label="Nom"
				defaultValue="Test"
				placeholder="nom"
			/>
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
	</Column>
}

function TestBasicDropdowns() {
	return <Row of="component">
		<Dropdown
			label="Dropdown simple"
			placeholder="Sélectionnez..."
			style={{flex: 1}}
			noFocusToggle
		>
			<Column of="component" layer="overground_moderate" padding="component">
				<Heading level="4">Un dropdown simple</Heading>
				<Paragraph>Ce dropdown ne gère aucun état ou sélection: on est libre d'y mettre ce qu'on veut à l'intérieur. Pour un dropdown de sélection, ou autocomplete, voir: Select, AutocompleteField.</Paragraph>
			</Column>
		</Dropdown>
		
		<Select
			label="Champ de sélection"
			placeholder="Sélectionnez..."
			style={{flex: 1}}
			options={[
				{ key: "A", value: "Option A" },
				{ key: "B", value: "Option B" },
				{ key: "C", value: "Option C" },
			]}
		/>
	</Row>
}

function TestCheckboxes() {
	const [ testCheckBox1, setTestCheckBox1 ] = useState(false)
	
	return <Row of="component">
		<Column of="component" style={{flex: 1}}>
			<RadioGroup label="Choisis une des options suivantes:">
				<RadioGroupButton value="A" label="Option A" />
				<RadioGroupButton value="B" label="Option B" />
				<RadioGroupButton value="C" label="Option C" />
			</RadioGroup>
		</Column>
		
		<Column of="component" style={{flex: 1}}>
			<LabelText>Cases à cocher seules </LabelText>
			<CheckBox
				label="Cochez moi, cochez moi!"
				onChange={setTestCheckBox1}
				checked={testCheckBox1}
			/>
			 
			<CheckBox
				label="Cochez moi aussi!"
				disabled={!testCheckBox1}
			/>
		</Column>
		
		<Column of="component" style={{flex: 1}}>
			<LabelText>Boutons radios seuls</LabelText>
			<RadioButton
				label="Sélectionnez moi!"
			/>
			
			<RadioButton
				label="Sélectionnez moi à la place!"
				disabled={!testCheckBox1}
			/>
		</Column>
	</Row>
}

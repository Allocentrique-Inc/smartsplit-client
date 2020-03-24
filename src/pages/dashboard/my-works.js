import React, {useState}    from "react"
import { useHistory }       from "react-router"
import { View, StyleSheet } from "react-native"
import moment from "moment"

import { Row, Column, Section, Group, Flex, Hairline } from "../../layout"
import {
	TextField,
	CheckBox,
	RadioButton,
	RadioGroup,
	RadioGroupButton,
	Dropdown,
} from "../../forms"
import { Heading, Paragraph, Text } from "../../text"

import { TabBar, Tab }         from "../../widgets/tabs"
import { Button, RoundButton } from "../../widgets/button"
import ProgressBar             from "../../widgets/progress-bar"
import { DialogModal }         from "../../widgets/modal"
import Pager                   from "../../widgets/pager"

import { Colors, Metrics }     from "../../theme"
import ImageIcon               from "../../svg/image"
import OverflowMenuIcon        from "../../svg/overflow-menu"
import PlayIcon                from "../../svg/play"
import XIcon                   from "../../svg/x"


export const Styles = StyleSheet.create({
	row: {
		height: Metrics.size.xlarge,
		flexDirection: "row",
		alignItems: "center",
	},
	
	cover: {
		width: Metrics.size.medium,
		height: Metrics.size.medium,
		backgroundColor: Colors.background.hell,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: Metrics.borderRadius.forms,
	},
	
	row_cover: {
		margin: Metrics.spacing.component,
	},

	row_title: {
		flex: 1,
	},

	row_progress: {
		width: 300,
		marginRight: Metrics.spacing.group,
	},
})

export default function MyWorksPage() {
	const [modalOpen, setModal] = useState(false)

	return <>
		<CreateWorkModal
			visible={modalOpen}
			onRequestClose={() => setModal(false)}
		/>

		<Group of="group">
			<Row of="component">
				<Flex>
					<Heading level="2">Mes pièces musicales</Heading>
				</Flex>
				<Button primary text="Ajouter" onClick={() => setModal(true)} />
			</Row>

			<TabBar>
				<Tab key="tab1" title="Mes ajouts" default>
					<Column of="none" spacer={Hairline}>
						{demo1}
						{demo2}
						{demo3}
						{demo1}
						{demo2}
						{demo3}
					</Column>
				</Tab>
				<Tab key="tab2" title="Partagées avec moi">
					<Column of="none" spacer={Hairline}>
						{demo1}
						{demo2}
						{demo3}
					</Column>
				</Tab>
			</TabBar>
		</Group>
	</>
}

function MediaWorkRow(props) {
	const dateRel = moment(props.creationDate).fromNow()
	
	return <View style={[Styles.row, props.style]}>
		<Cover style={Styles.row_cover} />
		
		<Column style={Styles.row_title}>
			<Row of="tiny" style={{alignItems: "center"}}>
				<Text heavy>{props.title}</Text>
				<Text small>par {props.artist}</Text>
			</Row>
			<Text secondary small>Modifié {dateRel} - Partagée avec ( ) ( ) ( )</Text>
		</Column>

		<Column of="inside" style={Styles.row_progress}>
			<Row of="tiny">
				<Text small heavy>Étape {props.step} de {props.steps}</Text>
				<Text small secondary>{props.stepName} - complété à {props.progress}%</Text>
			</Row>
			<ProgressBar size="tiny" progress={props.progress} />
		</Column>

		<Button secondary text="Continuer" onClick={() => Alert.alert("Test!")} />
		<Button icon={<OverflowMenuIcon />} />
	</View>
}

function Cover(props) {
	return <View style={[Styles.cover, props.style]}>
		<ImageIcon color={Colors.stroke}/>
	</View>
}

const demo1 =
	<MediaWorkRow
		title="Fantôme"
		artist="Debbie Tebbs"
		creationDate="2019-11-04"
		step="2"
		steps="5"
		stepName="Partage des droits"
		progress="35"
	 />

const demo2 =
	<MediaWorkRow
		title="Sandbox Memories"
		artist="Inscience, Ghostnaut"
		creationDate="2018-05-18"
		step="4"
		steps="5"
		stepName="Protège ton oeuvre"
		progress="85"
	/>

const demo3 =
	<MediaWorkRow
		title="Votre première chanson"
		artist="Inscience, Ghostnaut"
		creationDate="2020-03-01"
		step="1"
		steps="5"
		stepName="Documente ton oeuvre"
		progress="0"
	/>


export function CreateWorkModal(props) {
	const history                 = useHistory()
	const [acrModal, setAcrModal] = useState(false)
	const [workName, setWorkName] = useState("")
	const [workType, setWorkType] = useState(null)
	const [workOriginalArtist, setWorkOriginalArtist] = useState("")
	
	const workArtistLabel = workType === "remix" || workType === "cover"
	                      ? `${workName} (${workOriginalArtist}), remixé par`
	                      : `${workName}, par`
	
	function next() {
		setAcrModal(true)
	}
	
	return <DialogModal
		key="create-work"
		visible={props.visible}
		onRequestClose={props.onRequestClose}
		title="Créer une pièce musicale"
		buttons={<>
			<Button tertiary text="Annuler" onClick={props.onRequestClose} />
			<Button text="C'est parti!" onClick={next} />
		</>}
	>
		<Group of="group" style={{width: 560}}>
			<TextField
				value={workName} onChangeText={setWorkName}
				label="Titre de la pièce musicale"
				undertext="Ne pas include de « featuring » dans le titre"
			/>
			
			<RadioGroup
				label="Cette oeuvre est..."
				value={workType}
				onChange={setWorkType}
			>
				<RadioGroupButton value="original" label="une création originale" />
				<RadioGroupButton value="remix"    label="un remix" />
				<RadioGroupButton value="cover"    label="une reprise (cover)" />
			</RadioGroup>
			
			{(workType === "remix" || workType === "cover") && (
				<TextField
					value={workOriginalArtist}
					onChangeText={setWorkOriginalArtist}
					label="Artiste ou groupe originel"
				/>
			)}
			
			{workType !== null && <Column of="component">
				<Dropdown
					label={workArtistLabel}
					placeholder="Artiste ou groupe"
				/>
				
				<TextField
					label="Fichier"
					placeholder="ou déposer le fichier ici"
					undertext="Format WAV ou MP3 seulement. 100 Mo maximum."
				/>
				
				<Dropdown
					label="Qui a collaboré sur cette pièce musicale?"
					placeholder="Ajouter un ou plusieurs collaborateurs"
					undertext="Ces collaborateurs seront automatiquement ajoutés au partage de droit. Vous pourrez toujours les retirer du partage."
				/>
				
				<Row of="component">
					<RightHolderTag name="Jean-Gabriel Gill-Couture"  initials="JG" />
					<RightHolderTag name="Alex A"    initials="AA" />
				</Row>
			</Column>}
		</Group>
		
		<ACRCloudModal
			visible={acrModal}
			onRequestClose={() => setAcrModal(false)}
			onValidate={() => setAcrModal(false)}
		/>
	</DialogModal>
}


function ACRCloudModal(props) {
	const [checkRights, setCheckRights] = useState(false)
	
	function handleValidate() {
		if(!checkRights)
			return
		
		if(props.onValidate)
			props.onValidate({})
	}
	
	return <DialogModal
		key="acrcloud"
		visible={props.visible}
		onRequestClose={props.onRequestClose}
		title="Fichier déjà existant sur les plateformes de diffusion"
		buttons={<>
			<Button tertiary text="Annuler" onClick={props.onRequestClose} />
			<Button
				disabled={!checkRights}
				text="Valider"
				onClick={handleValidate}
			/>
		</>}
	>
		<Group of="component">
			<Text secondary>Ton fichier <Text bold secondary>The song - copy (2) final v4 FINAL VERSION.mp3</Text> correspond à </Text>
			<Text small secondary>Trouvé sur Spotify, Apple Music, Deezer et 5 autres</Text>
			
			<ACRMatchLabel
				title="Quarantine Life"
				artist="Example"
			/>
			
			<Hairline />
			
			<Text secondary>Veux-tu importer les informations associées à cette pièce musicale?</Text>
			
			<Column of="component" style={{borderColor: Colors.background.underground, borderLeftWidth: 4, paddingLeft: 8}}>
				<ImportMusicDataCheckbox
					label="Genres musicaux"
					undertext="Nom du genre, Nom du genre, Nom du genre"
				/>
				
				<ImportMusicDataCheckbox
					label="Lien vers les paroles"
					undertext="Description"
				/>
				
				<ImportMusicDataCheckbox
					label="Liens d'écoute"
					undertext="Description"
				/>
				
				<ImportMusicDataCheckbox
					label="Autre chose"
					undertext="Description"
				/>
			</Column>
			
			<Hairline />
			
			<RadioButton checked={checkRights} onChange={setCheckRights}>
				<Text secondary>Je possède les droits sur la pièce musicale téléversée ainsi que sur la version trouvée sur les plateformes de diffusion.</Text>
			</RadioButton>
		</Group>
	</DialogModal>
}

function ImportMusicDataCheckbox(props) {
	const { label, undertext, ...nextProps } = props
	
	return <CheckBox {...nextProps}>
		<Column of="tiny">
			<Text>{label}</Text>
			<Text small secondary>{undertext}</Text>
		</Column>
	</CheckBox>
}


function ACRMatchLabel(props) {
	return <Row of="component" padding="component" layer="underground">
		<Cover />
		
		<Column flex={1}>
			<Text small secondary>{props.artist}</Text>
			<Text heavy>{props.title}</Text>
		</Column>
		
		<RoundButton>
			<PlayIcon color="white" />
		</RoundButton>
	</Row>
}


function RightHolderTag(props) {
	const { name, initials, style, ...nextProps } = props
	
	return <Row
		of="inside"
		padding="inside"
		layer="underground"
		style={[{alignItems: "center"}, style]}
		{...nextProps}
	>
		<UserAvatar initials={initials} />
		<Text>{name}</Text>
		<XIcon size="xsmall" />
	</Row>
}

function UserAvatar(props) {
	return <View style={{width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.stroke, alignItems: "center", justifyContent: "center"}}>
		<Text small bold secondary>{props.initials}</Text>
	</View>
}

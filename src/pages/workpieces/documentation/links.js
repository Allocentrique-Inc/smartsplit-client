import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import LinkIcon from "../../../svg/link"
import SpotifyIcon from "../../../svg/workpieces/spotify"
import { SearchAndTag, Dropdown, TextField } from "../../../forms"
import { TextInput } from "react-native"

const Styles = StyleSheet.create({
	logo: {
		marginRight: Metrics.spacing.logo,
	},
	link: {
		marginRight: Metrics.spacing.link,
	},
})

export default function Links() {
	const { t } = useTranslation()
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()

	function saveAndQuit() {
		history.push("/dashboard/")
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function navigateToInterpretation() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
	}

	return (
		<Layout
			workpiece={workpiece}
			title={workpiece}
			path={[t("document:navbar.document"), t("document:navbar.pages.lyrics")]}
			progress={62.5}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveClose")}
					onClick={saveAndQuit}
				/>
			}
			formNav={
				<>
					<Row flex={1}>
						<Button
							secondary
							text={t("general:buttons.back")}
							onClick={navigateToSummary}
						/>
						<Flex />
						<Button
							primary
							text={t("general:buttons.pass")}
							onClick={navigateToInterpretation}
						/>
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<LinksForm />
		</Layout>
	)
}

export function LinksForm(props) {
	const { t } = useTranslation()

	return (
		<>
			<Row>
				<Column of="group" flex={5}>
					<Text action bold valign="center">
						<LinkIcon />
						{t("document:links.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:links.title")}</Heading>
					<Paragraph>{t("document:links.paragraph")}</Paragraph>

					<Spacer of="group" />
					<Row valign="center">
						<SpotifyIcon style={Styles.logo} />
						<Text primary style={Styles.link}>
							Spotify
						</Text>
						<TextField
							name="spotify"
							placeholder={t("document:links.addLink")}
						/>
					</Row>
				</Column>
				<Flex />
				<Column of="group" flex={4}>
					<Column of="component" padding="component" layer="underground">
						<Column of="inside">
							<Text small bold tertiary>
								{t("document:help")}
							</Text>
							<Hairline />
						</Column>
						<Heading level={4}>{t("document:why")}</Heading>
						<Text secondary>
							Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
							dolor sit amet.
						</Text>
					</Column>
				</Column>
			</Row>
		</>
	)
}

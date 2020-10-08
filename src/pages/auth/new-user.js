import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Text, Heading, Paragraph } from "../../text"
import { useHistory } from "react-router-dom"
import { Row, Column, Flex } from "../../layout"
import { Form, useForm } from "../../forms"
import Button from "../../widgets/button"
import { useStorePath } from "../../appstate/react"
import PublicPageLayout from "../../layouts/public-page"
import { useStorePath as useMobxStorePath } from "../../mobX"
import MyProfile from "../../smartsplit/forms/my-profile"
import SettingsState from "../../mobX/states/SettingsState"
import AuthState from "../../mobX/states/AuthState"

export default function NewUser() {
	const history = useHistory()
	const { t, i18n } = useTranslation()

	const [error, setError] = useState(null)
	const auth: AuthState = useMobxStorePath("auth")
	const user = useMobxStorePath("auth", "user")
	const settings: SettingsState = useMobxStorePath("settings")

	const currentLanguage = i18n.language === "en" ? "Français" : "English"

	function switchLanguage() {
		i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")
	}

	const buttonSize = Platform.web ? "medium" : "large"

	function skipStep() {
		auth.skipIntro()
		history.push("/dashboard/")
	}

	return (
		<PublicPageLayout
			of="group"
			navigation={
				<>
					<Button
						tertiary
						text={t("general:buttons.nextStep")}
						onClick={skipStep}
					/>

					<Button secondary text={currentLanguage} onClick={switchLanguage} />
				</>
			}
		>
			<Column of="component">
				<Heading level="1">{t("newUser:title")}</Heading>
				<Paragraph>{t("newUser:subTitle")}</Paragraph>
			</Column>

			<MyProfile />

			{error && <Text error>{error.message}</Text>}
			<Row align="right">
				<Button
					text={t("general:buttons.go")}
					style={Platform.OS !== "web" && { flex: 1 }}
					size={buttonSize}
					onClick={async () => {
						let profile = await settings.saveProfile()
						history.push("/")
					}}
				/>
			</Row>
		</PublicPageLayout>
	)
}

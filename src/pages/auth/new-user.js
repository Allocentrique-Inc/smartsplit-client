import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Text, Heading, Paragraph } from "../../text"
import { useHistory } from "react-router-dom"
import { Row, Column, Flex } from "../../layout"
import { Form, useForm } from "../../forms"
import Button from "../../widgets/button"
import { useStorePath } from "../../appstate/react"
import { useStorePath as useMobxStorePath } from "../../mobX"
import PublicPageLayout from "../../layout/public-page"
import MyProfile from "../../smartsplit/forms/my-profile"

export default function NewUser() {
	const history = useHistory()
	const { t, i18n } = useTranslation()
	const user = useMobxStorePath("auth", "user")
	const [error, setError] = useState(null)
	const formRef = useRef()

	const initialValues = {
		firstName: "",
		lastName: "",
		artistName: "",
		avatarUrl: null,
		...user.data,
	}

	const currentLanguage = i18n.language === "en" ? "Français" : "English"

	function switchLanguage() {
		i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")
	}

	const buttonSize = Platform.web ? "medium" : "large"

	function handleSubmit(values) {
		user
			.update({ ...values, locale: i18n.language })
			.then(nextStep)
			.catch((e) => {
				console.error("Error saving user", e)
				setError(e)
			})
	}

	function nextStep() {
		history.replace("/")
	}

	function submitForm() {
		formRef.current.submit()
	}

	return (
		<PublicPageLayout
			of="group"
			navigation={
				<>
					<Button
						tertiary
						text={t("general:buttons.nextStep")}
						onClick={nextStep}
					/>

					<Button secondary text={currentLanguage} onClick={switchLanguage} />
				</>
			}
		>
			<Column of="component">
				<Heading level="1">{t("newUser:title")}</Heading>
				<Paragraph>{t("newUser:subTitle")}</Paragraph>
			</Column>
			<Form
				key={user.data}
				ref={formRef}
				values={initialValues}
				onSubmit={handleSubmit}
			>
				<MyProfile />
			</Form>
			{error && <Text error>{error.message}</Text>}
			<Row align="right">
				<Button
					text={t("general:buttons.go")}
					style={Platform.OS !== "web" && { flex: 1 }}
					size={buttonSize}
					disabled={user.state !== "ready"}
					onClick={submitForm}
				/>
			</Row>
		</PublicPageLayout>
	)
}

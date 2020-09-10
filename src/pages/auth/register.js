import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { observer } from "mobx-react"
import { useStorePath, useStores } from "../../mobX"
import { AsyncStorage } from "react-native"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useHistory } from "react-router-dom"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Platform, Web, Native } from "../../platform"
import { DialogModal } from "../../widgets/modal"
import { TextDivider, Section, Column, Row, Group, Flex } from "../../layout"
/*import {
	Form,
	useFormField,
	TextField,
	PasswordField,
	CheckBox,
} from "../../forms"*/

import TextField from "../../forms/text"
import PasswordField from "../../forms/password"
import { CheckBox } from "../../forms/checkbox"
import { Heading, Paragraph, Text, Link } from "../../text"
import AuthLayout from "./layout"
import ProgressBar from "../../widgets/progress-bar"
import FacebookIcon from "../../svg/facebook"
import GoogleIcon from "../../svg/google"
import { Metrics, Colors } from "../../theme"
import zxcvbn from "zxcvbn"
// import {
// 	notEmptyValidator,
// 	sameValidator,
// 	acceptablePasswordValidator,
// } from "../../../helpers/validators"
import { CheckEmailModal } from "./check-email"
import { registerUser } from "../../../api/users"
import RegisterModel from "../../mobX/models/auth/RegisterModel"
import AuthState from "../../mobX/states/AuthState"
import PasswordFieldWithScoreBar from "../../forms/PasswordFieldWithScoreBar"

// export function passwordBarColor(score) {
// 	switch (score) {
// 		case 0:
// 			return Colors.progressBar.darkred
// 		case 1:
// 			return Colors.progressBar.orangered
// 		case 2:
// 			return Colors.progressBar.orange
// 		case 3:
// 			return Colors.progressBar.yellowgreen
// 		case 4:
// 			return Colors.progressBar.green
// 		default:
// 			return Colors.progressBar.darkred
// 	}
// }
//
// export function passwordStrengthIndicator(score) {
// 	switch (score) {
// 		case 0:
// 		case 1:
// 			return "errors:password.weak"
// 		case 2:
// 		case 3:
// 			return "errors:password.average"
// 		case 4:
// 		default:
// 			return "errors:password.acceptable"
// 	}
// }
//
// export function passwordProgress(score) {
// 	switch (score) {
// 		case 4:
// 			return 100
// 		case 3:
// 			return 80
// 		case 2:
// 			return 50
// 		case 1:
// 			return 30
// 		case 0:
// 			return 10
// 		default:
// 			return 10
// 	}
// }

export function TermsConditionsModal({ visible, onAgree, onCancel }) {
	const [t] = useTranslation()

	return (
		<DialogModal
			visible={visible}
			onRequestClose={onCancel}
			title={t("register:conditions.title")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={onCancel}
					/>
					<Button text={t("general:buttons.accept")} onClick={onAgree} />
				</>
			}
		/>
	)
}

const registerFormValues = {
	agreeTerms: false,
	email: "",
	password: "",
	passwordRepeat: "",
}

export const RegisterForm = observer((props) => {
	const {
		showForgotPassword,
		showLogin,
		onSuccess,
		stayLoggedIn,
		onSubmittable,
		formRef,
	} = props

	const { t, i18n } = useTranslation()
	// const form = formRef || useRef()

	const [showTerms, setShowTerms] = useState(false)
	const [showCheckMails, setShowCheckMails] = useState(false)
	// const [isLoading, setIsLoading] = useState(false)
	// const [errorMessage, setErrorMessage] = useState(null)
	const { auth } = useStores()
	const model = auth.regModel
	// const handleChange = useCallback(
	// 	({ email, password, passwordRepeat, agreeTerms }) => {
	// 		if (!onSubmittable) return
	//
	// 		onSubmittable(
	// 			notEmptyValidator(email) &&
	// 				notEmptyValidator(password) &&
	// 				notEmptyValidator(passwordRepeat) &&
	// 				agreeTerms
	// 		)
	// 	}
	// )

	// const handleSubmit = useCallback(async () => {
	// 	const {
	// 		email,
	// 		password,
	// 		passwordRepeat,
	// 		agreeTerms,
	// 	} = form.current.getFields()
	//
	// 	let hasError = false
	// 	form.current.clearErrors()
	//
	// 	if (!notEmptyValidator(email.value)) {
	// 		hasError = email.error = t("errors:enterEmail")
	// 	}
	//
	// 	if (!acceptablePasswordValidator(password.value)) {
	// 		hasError = password.error = t("errors:strengthPassword")
	// 	}
	//
	// 	if (!sameValidator(password.value, passwordRepeat.value)) {
	// 		hasError = passwordRepeat.error = t("errors:samePasswords")
	// 	}
	//
	// 	if (hasError) return
	//
	// 	try {
	// 		setIsLoading(true)
	// 		onSubmittable(false)
	//
	// 		await registerUser({
	// 			email: email.value,
	// 			password: password.value,
	// 			locale: i18n.currentLanguage,
	// 		})
	//
	// 		setShowCheckMails(true)
	//
	// 		if (stayLoggedIn)
	// 			AsyncStorage.setItem("register:stayLoggedInNext", true).catch((e) =>
	// 				console.error("Failed to store stayLoggedInNext", e)
	// 			)
	//
	// 		form.current.reset()
	// 	} catch (error) {
	// 		if (error.code === "user_conflict") {
	// 			email.error = (
	// 				<>
	// 					{t("errors:password.emailTaken")}
	// 					<link error bold onClick={showForgotPassword}>
	// 						{t("errors:password.forgotEmail")}
	// 					</link>
	// 				</>
	// 			)
	// 		} else {
	// 			setErrorMessage(error.message)
	// 			onSubmittable(true)
	// 		}
	// 	} finally {
	// 		setIsLoading(false)
	// 	}
	// }, [form, stayLoggedIn, i18n, t])

	return (
		<>
			<CheckEmailModal
				visible={showCheckMails}
				onRequestClose={() => {
					setShowCheckMails(false)
					showLogin()
				}}
			/>

			<TermsConditionsModal
				visible={showTerms}
				onRequestClose={() => setShowTerms(false)}
				onAgree={() => {
					model.acceptTerms.setValue(true)
					setShowTerms(false)
				}}
				onCancel={() => {
					model.acceptTerms.setValue(false)
					setShowTerms(false)
				}}
			/>

			<Column as={Group} of={Platform.OS === "web" ? "group" : "component"}>
				{/*<Column of="inside">
					<Button
						style={{ backgroundColor: "#4267B2" }}
						icon={<FacebookIcon />}
						text={t("general:buttons.facebook")}
					/>

					<Button
						style={{ backgroundColor: "#4285F4" }}
						icon={<GoogleIcon />}
						text={t("general:buttons.google")}
					/>
				</Column>

				*/}
				<Column of="group">
					<TextField
						field={model.email}
						placeholder={t("forms:placeholders.emailExample")}
						autoCompleteType="off"
					/>

					<PasswordFieldWithScoreBar
						field={model.password}
						placeholder={t("forms:placeholders.noCharacters")}
						autoCompleteType="off"
					/>

					<PasswordField
						field={model.password2}
						placeholder={t("forms:labels.repeatPassword")}
					/>

					<CheckBox
						checked={model.acceptTerms.value}
						onChange={(checked) => {
							model.acceptTerms.setValue(checked)
						}}
					>
						<Text>
							{t("register:conditions.paragraph")(
								() => setShowTerms(true),
								() => setShowTerms(true)
							)}
						</Text>
					</CheckBox>

					{model.saveError && <Text error>{t(model.saveError)}</Text>}
				</Column>
			</Column>
		</>
	)
})

const RegisterPage = observer((props) => {
	const [t] = useTranslation()
	const history = useHistory()
	const auth: AuthState = useStorePath("auth")
	const model: RegisterModel = useStorePath("auth", "regModel")
	//const form = useRef()
	const [canSubmit, setCanSubmit] = useState(false)
	const [stayLoggedIn, setStayLoggedIn] = useState(false)

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	/*function submit() {
		form.current.submit()
	}*/

	return (
		<AuthLayout>
			{(layoutProps) => (
				<Column of="group">
					<Column of="component">
						<Heading level="1">{t("register:title")}</Heading>
						<Paragraph>{t("register:subTitle")}</Paragraph>
						<View />
					</Column>

					<RegisterForm
						{...layoutProps}
						onSuccess={layoutProps.showLogin}
						stayLoggedIn={stayLoggedIn}
						onSubmittable={setCanSubmit}
					/>

					<Platform web={Row} native={Column} of="group">
						{Platform.web && (
							<>
								<CheckBox
									checked={stayLoggedIn}
									onChange={setStayLoggedIn}
									label={t("general:checkbox.stayConnected")}
								/>
								<Flex />
							</>
						)}

						<Button
							text={t("general:buttons.createAccount")}
							onClick={async () => {
								let success = await auth.submitRegistration()
							}}
							disabled={!model.isValid || model.busy}
							size={buttonSize}
						/>

						{Platform.native && (
							<Button
								tertiary
								text={t("general:buttons.haveAccount")}
								onClick={layoutProps.showLogin}
								size={buttonSize}
							/>
						)}
					</Platform>
				</Column>
			)}
		</AuthLayout>
	)
})
export default RegisterPage

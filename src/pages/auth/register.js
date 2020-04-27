import React, { useState, useEffect } from "react"
import { AsyncStorage } from "react-native"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import * as UserActions from "../../../redux/Users/Actions"
import { View } from "react-native"
import { useHistory } from "react-router-dom"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Platform, Web, Native } from "../../platform"
import { DialogModal } from "../../widgets/modal"
import { TextDivider, Section, Column, Row, Group, Flex } from "../../layout"
import { TextField, PasswordField, CheckBox } from "../../forms"
import { Heading, Paragraph, Text, Link } from "../../text"
import AuthLayout from "./layout"
import ProgressBar from "../../widgets/progress-bar"
import FacebookIcon from "../../../assets/svg/facebook"
import GoogleIcon from "../../../assets/svg/google"
import { Metrics, Colors } from "../../theme"
import zxcvbn from "zxcvbn"
import {
	notEmptyValidator,
	sameValidator,
	acceptablePasswordValidator,
} from "../../../helpers/validators"
import { CheckEmailModal } from "./check-email"

export function passwordBarColor(score) {
	switch (score) {
		case 0:
			return Colors.progressBar.darkred
		case 1:
			return Colors.progressBar.orangered
		case 2:
			return Colors.progressBar.orange
		case 3:
			return Colors.progressBar.yellowgreen
		case 4:
			return Colors.progressBar.green
		default:
			return Colors.progressBar.darkred
	}
}

export function passwordStrengthIndicator(score) {
	switch (score) {
		case 0:
		case 1:
			return "errors:password.weak"
		case 2:
		case 3:
			return "errors:password.average"
		case 4:
		default:
			return "errors:password.acceptable"
	}
}

export function passwordProgress(score) {
	switch (score) {
		case 4:
			return 100
		case 3:
			return 80
		case 2:
			return 50
		case 1:
			return 30
		case 0:
			return 10
		default:
			return 10
	}
}

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
		>
			<Group of="group" style={{ maxWidth: 560, alignSelf: "center" }}></Group>
		</DialogModal>
	)
}

export const RegisterForm = connect(
	function mapStateToProps({ users }) {
		return {
			users,
		}
	},
	function mapDispatchToProps(dispatch) {
		return {
			registerUser: function (details) {
				dispatch(UserActions.registerUser(details))
			},
		}
	}
)(function (props) {
	const {
		users,
		registerUser,
		showForgotPassword,
		showLogin,
		onSuccess,
		setFormState,
		stayLoggedIn,
	} = props

	const [t] = useTranslation()
	const registration = users.registerUser

	const [showTerms, setShowTerms] = useState(false)
	const [showCheckMails, setShowCheckMails] = useState(false)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [agreeTerms, setAgreeTerms] = useState(false)

	const [errorEmail, setErrorEmail] = useState(null)
	const [errorPassword, setErrorPassword] = useState(null)
	const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(null)

	const score = zxcvbn(password).score

	const validEmail = notEmptyValidator(email)
	const validPassword = acceptablePasswordValidator(password)
	const validPasswordRepeat = sameValidator(password, passwordRepeat)

	const canSubmit =
		!registration.isLoading &&
		notEmptyValidator(email) &&
		notEmptyValidator(password) &&
		notEmptyValidator(passwordRepeat) &&
		agreeTerms

	const error = !registration.isLoading && registration.error
	const errorCode = error && error.code

	const errorEmailUsed = errorCode === "user_conflict" && (
		<Text small error>
			{t("errors:password.emailTaken")}
			<Link small error bold onClick={showForgotPassword}>
				{t("errors:password.forgotEmail")}
			</Link>
		</Text>
	)

	const errorMessage = !errorEmailUsed && error && error.message

	function resetForm() {
		setEmail("")
		setPassword("")
		setPasswordRepeat("")
		setAgreeTerms(false)
	}

	function handleRegister() {
		setErrorEmail(validEmail ? null : t("errors:enterEmail"))
		setErrorPassword(validPassword ? null : t("errors:strengthPassword"))
		setErrorPasswordRepeat(
			validPasswordRepeat ? null : t("errors:samePasswords")
		)

		if (canSubmit && validEmail && validPassword && validPasswordRepeat) {
			registerUser({ email, password, locale: "fr" })

			if (stayLoggedIn)
				AsyncStorage.setItem("register:stayLoggedInNext", true).catch((e) =>
					console.error("Failed to store stayLoggedInNext", e)
				)
		}
	}

	setFormState &&
		useEffect(() => {
			setFormState({
				canSubmit,
				submit: handleRegister,
			})
		}, [setFormState, canSubmit, email, password, passwordRepeat, stayLoggedIn])

	useEffect(() => {
		setShowCheckMails(!!registration.data && canSubmit)
	}, [canSubmit, email, password, passwordRepeat])

	return (
		<>
			<CheckEmailModal
				visible={showCheckMails}
				onRequestClose={() => resetForm()}
			/>

			<TermsConditionsModal
				visible={showTerms}
				onRequestClose={() => setShowTerms(false)}
				onAgree={() => {
					setAgreeTerms(true)
					setShowTerms(false)
				}}
				onCancel={() => {
					setAgreeTerms(false)
					setShowTerms(false)
				}}
			/>

			<Column as={Group} of={Platform.OS === "web" ? "group" : "component"}>
				<Column of="inside">
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

				<TextDivider text={t("general:or")} />

				<Column of="group">
					<TextField
						value={email}
						label={t("forms:labels.enterEmail")}
						placeholder={t("forms:placeholders.emailExample")}
						onChangeText={setEmail}
						error={errorEmailUsed}
					/>

					<Column of="inside">
						<PasswordField
							value={password}
							onChangeText={setPassword}
							label={t("forms:labels.choosePassword")}
							placeholder={t("forms:placeholders.noCharacters")}
							error={errorPassword}
						/>

						<Row style={{ alignItems: "center" }}>
							<Text secondary small style={{ flex: 3 }}>
								{t(passwordStrengthIndicator(score))}
							</Text>
							<Flex />
							<ProgressBar
								size="tiny"
								style={{ flex: 1 }}
								color={passwordBarColor(score)}
								progress={passwordProgress(score)}
							/>
						</Row>
					</Column>

					<PasswordField
						value={passwordRepeat}
						placeholder={t("forms:labels.repeatPassword")}
						onChangeText={setPasswordRepeat}
						error={errorPasswordRepeat}
					/>

					<CheckBox onChange={setAgreeTerms} checked={agreeTerms}>
						<Text>
							{t("register:conditions.paragraph")}
							<Link link onClick={() => setShowTerms(true)}>
								{" "}
								{t("register:conditions.paragraph2")}{" "}
							</Link>
							{t("register:conditions.paragraph3")}
							<Link link onClick={() => setShowTerms(true)}>
								{" "}
								{t("register:conditions.paragraph4")}{" "}
							</Link>
							{t("register:conditions.paragraph5")}
						</Text>
					</CheckBox>

					{errorMessage && <Text error>{errorMessage}</Text>}
				</Column>
			</Column>
		</>
	)
})

export default function RegisterPage(props) {
	const [t] = useTranslation()
	const history = useHistory()
	const [formState, setFormState] = useState({})
	const [stayLoggedIn, setStayLoggedIn] = useState(false)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

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
						setFormState={setFormState}
						onSuccess={layoutProps.showLogin}
						stayLoggedIn={stayLoggedIn}
					/>

					<Platform web={Row} native={Column} of="group">
						{Platform.web && (
							<>
								<CheckBox
									checked={stayLoggedIn}
									onChange={setStayLoggedIn}
									label={t("general:checkbox")}
								/>
								<Flex />
							</>
						)}

						<Button
							text={t("general:buttons.createAccount")}
							onClick={formState.submit}
							disabled={!formState.canSubmit}
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
}

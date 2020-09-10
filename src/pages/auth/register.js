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

import TextField from "../../forms/text"
import PasswordField from "../../forms/password"
import { CheckBox } from "../../forms/checkbox"
import { Heading, Paragraph, Text, Link } from "../../text"
import AuthLayout from "./layout"
import { CheckEmailModal } from "./check-email"
import { registerUser } from "../../../api/users"
import RegisterModel from "../../mobX/models/auth/RegisterModel"
import AuthState from "../../mobX/states/AuthState"
import PasswordFieldWithScoreBar from "../../forms/PasswordFieldWithScoreBar"

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

export const RegisterForm = observer((props) => {
	const { showLogin } = props

	const { t, i18n } = useTranslation()
	const [showTerms, setShowTerms] = useState(false)
	const [showCheckMails, setShowCheckMails] = useState(false)
	const { auth } = useStores()
	const model = auth.regModel

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
					{model.validated && model.acceptTerms.error && (
						<Text small error>
							{t(model.acceptTerms.error)}
						</Text>
					)}
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

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory, useRouteMatch } from "react-router"
import PublicPageLayout from "../../layouts/public-page"
import { Text } from "../../text"
import Button from "../../components/button"

export default function PublicAuthLayout({ children }) {
	const [t, i18n] = useTranslation()
	const history = useHistory()
	const showLogin = () => history.push("/auth/login")
	const showRegister = () => history.push("/auth/register")
	const showForgotPassword = () => history.push("/auth/forgot-password")

	const currentLanguage = i18n.language === "en" ? "Français" : "English"
	const switchLanguage = () => {
		i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")
	}

	const navigationButtons = useRouteMatch("/auth/register") ? (
		<>
			<Text secondary>{t("publicNavbarWeb:yesAccount")}</Text>
			<Button
				tertiary
				text={t("publicNavbarWeb:openAccount")}
				onClick={showLogin}
			/>
			<Button secondary text={currentLanguage} onClick={switchLanguage} />
		</>
	) : (
		<>
			<Text secondary>{t("publicNavbarWeb:noAccount")}</Text>
			<Button
				tertiary
				text={t("publicNavbarWeb:createAccount")}
				onClick={showRegister}
			/>
			<Button secondary text={currentLanguage} onClick={switchLanguage} />
		</>
	)

	return (
		<PublicPageLayout navigation={navigationButtons}>
			{typeof children === "function"
				? children({ showRegister, showLogin, showForgotPassword })
				: children}
		</PublicPageLayout>
	)
}

import React, { useState } from "react"
import { useHistory, useRouteMatch } from "react-router"
import PublicPageLayout from "../../layout/public-page"
import { Text } from "../../text"
import Button from "../../widgets/button"

import AuthModal from "./modal"

export default function PublicAuthLayout({ children }) {
	const history = useHistory()
	const showLogin = () => history.push("/auth/login")
	const showRegister = () => history.push("/auth/register")
	const showForgotPassword = () => history.push("/auth/forgot-password")
	const [showModal, setModal] = useState(false)

	const navigationButtons = useRouteMatch("/auth/register") ? (
		<>
			<Button text="Test" onClick={() => setModal(true)} />
			<Text secondary>Déjà membre?</Text>
			<Button tertiary text="Ouvrir une session" onClick={showLogin} />
			<Button secondary text="English" />
		</>
	) : (
		<>
			<Button text="Test" onClick={() => setModal(true)} />
			<Text secondary>Pas encore membre?</Text>
			<Button tertiary text="Créer un compte" onClick={showRegister} />
			<Button secondary text="English" />
		</>
	)

	return (
		<PublicPageLayout navigation={navigationButtons}>
			<AuthModal visible={showModal} onCancel={() => setModal(false)} />
			{typeof children === "function"
				? children({ showRegister, showLogin, showForgotPassword })
				: children}
		</PublicPageLayout>
	)
}

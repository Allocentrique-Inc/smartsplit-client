import React, { useState } from "react"
import { Column, Row, Group, Flex, Hairline } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import Button from "../../widgets/button"
import Modal from "../../widgets/modal"
import Pager from "../../widgets/pager"

import SmartsplitLogo from "../../svg/logo-smartsplit"
import XIcon from "../../svg/x"

import { LoginForm } from "../auth/login"
import { RegisterForm } from "../auth/register"

export const MODAL_WIDTH = 624

export default function AuthModal(props) {
	const { visible, onCancel, onSuccess, onRequestClose } = props
	const [tab, setTab] = useState("register")

	const commonProps = {
		showForgotPassword: () => setTab("forgot-password"),
		showLogin: () => setTab("login"),
		showRegister: () => setTab("register"),
	}

	const buttonsRegisterPage = (
		<>
			<Text small>Déjà membre?</Text>
			<Button
				secondary
				small
				bold
				text="Ouvrir une session"
				onClick={commonProps.showLogin}
			/>
			<Button
				tertiary
				small
				icon={<XIcon />}
				onClick={onRequestClose || onCancel}
			/>
		</>
	)

	const buttonsLoginPage = (
		<>
			<Text small>Pas encore membre?</Text>
			<Button
				secondary
				small
				bold
				text="Créer mon compte"
				onClick={commonProps.showRegister}
			/>
			<Button
				tertiary
				small
				icon={<XIcon />}
				onClick={onRequestClose || onCancel}
			/>
		</>
	)

	return (
		<Modal visible={visible}>
			<Column style={{ maxWidth: MODAL_WIDTH }}>
				<Row of="component" padding="component" valign="center" size="xlarge">
					<SmartsplitLogo />
					<Flex />
					{tab === "register" ? buttonsRegisterPage : buttonsLoginPage}
				</Row>

				<Hairline />

				<Pager page={tab}>
					<LoginModal
						key="login"
						{...props}
						{...commonProps}
						onSuccess={() => alert("Connecté!")}
					/>
					<RegisterModal
						key="register"
						{...props}
						{...commonProps}
						onSuccess={() => alert("Inscrit!")}
					/>
				</Pager>
			</Column>
		</Modal>
	)
}

export function LoginModal(props) {
	const { artistName, onRequestClose, onCancel, onSuccess } = props
	const [formState, setFormState] = useState({})

	return (
		<>
			<Column of="group" padding="group">
				<Column of="component">
					<Heading level={2}>
						{artistName || "[artistName]"}, connecte-toi pour confirmer ta
						décision.
					</Heading>
					<Paragraph>
						Tu es sur le point de signer un cotnrat important avec tes
						collaborateurs, nous avons donc besoin de confirmer ton identité.
					</Paragraph>
				</Column>

				<LoginForm setFormState={setFormState} {...props} />
			</Column>

			<Hairline />

			<Row of="component" padding="component" align="right">
				<Button tertiary text="Annuler" onClick={onCancel || onRequestClose} />
				<Button
					primary
					text="Me connecter et voter"
					disabled={!formState.canSubmit}
					onClick={formState.submit}
				/>
			</Row>
		</>
	)
}

export function RegisterModal(props) {
	const { artistName, onRequestClose, onCancel, onSuccess } = props
	const [formState, setFormState] = useState({})

	return (
		<>
			<Column of="group" padding="group">
				<Column of="component">
					<Heading level={2}>
						{artistName || "[artistName]"}, crée un compte pour confirmer ta
						décision.
					</Heading>
					<Paragraph>
						Tu es sur le point de signer un cotnrat important avec tes
						collaborateurs, nous avons donc besoin de confirmer ton identité.
					</Paragraph>
				</Column>

				<RegisterForm setFormState={setFormState} {...props} />
			</Column>

			<Hairline />

			<Row of="component" padding="component" align="right">
				<Button tertiary text="Annuler" onClick={onCancel || onRequestClose} />
				<Button
					primary
					text="Créer mon compte et voter"
					disabled={!formState.canSubmit}
					onClick={formState.submit}
				/>
			</Row>
		</>
	)
}

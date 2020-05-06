import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { useHistory, useRouteMatch } from "react-router"
import { useTranslation } from "react-i18next"
import { Group, Hairline, Flex, Row, Column, Section } from "../../layout"
import { Heading, Text } from "../../text"
import { Metrics, Colors } from "../../theme"
import { Platform } from "../../platform"

import PenIcon from "../../svg/pen"
import UserIcon from "../../svg/user"
import UserCardIcon from "../../svg/user-card"
import SettingsIcon from "../../svg/settings"
import LogoutIcon from "../../svg/logout"

export default function MyAccountPage(props) {
	const [t] = useTranslation()
	const ArtistName = null
	return (
		<>
			<Row of="component">
				<Flex>
					<Heading level="2">{ArtistName}</Heading>
				</Flex>
				<PenIcon />
			</Row>
			<Hairline />

			<AccountItem
				icon={UserIcon}
				to="/dashboard/account/my-profile"
				text={t("menu:profile")}
			/>
			<AccountItem
				icon={UserCardIcon}
				to="/dashboard/account/account-info-native"
				text={t("menu:account")}
			/>

			<AccountItem
				icon={SettingsIcon}
				to="/dashboard/account/settings"
				text={t("menu:settings")}
			/>

			<AccountItem
				icon={LogoutIcon}
				to="/auth/logout"
				text={t("menu:logout")}
			/>
		</>
	)
}

export function AccountItem(props) {
	//pour éviter répétition
	const Icon = props.icon
	const history = useHistory()

	function activate() {
		history.push(props.to)
	}

	return (
		<TouchableWithoutFeedback onPress={activate} accessibilityRole="button">
			<Row of="component">
				<Icon />
				<Text>{props.text}</Text>
			</Row>
		</TouchableWithoutFeedback>
	)
}

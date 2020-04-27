import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform, View } from "react-native"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavbarWeb from "../../../layout/dashboard-navbar-web"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"
import UserAvatar from "../../../smartsplit/user/avatar"
import PenIcon from "../../../svg/pen"

export default function MyProfile() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	return (
		<>
			{Platform.OS === "web" && (
				<Row of="component">
					<Flex>
						<Heading level="2">{t("titles:profile")}</Heading>
					</Flex>
				</Row>
			)}

			{Platform.OS !== "web" && (
				<DashboardNavbarNative header={t("dashboardHeader:native.profile")} />
			)}

			<Column of="section">
				<Row>
					<UserAvatar size="huge" />
					<View style={{ margin: 50 }}>
						<PenIcon />
					</View>
				</Row>
			</Column>

			<Row of="component">
				<TextField label={t("forms:labels.usualFirstName")} placeholder="" />
				<TextField label={t("forms:labels.usualLastName")} placeholder="" />
			</Row>

			<TextField
				//label={t("forms:labels.artistName") + t("forms:labels.optional")}
				label={t("forms:labels.artistName")}
				label_hint={<Text secondary>{t("forms:labels.optional")}</Text>}
				placeholder=""
				undertext={
					<>
						<Text small>{t("forms:undertexts.artistNameExample")}</Text>
						<Text italic small>
							{" "}
							Jay-Z
						</Text>
						<Text small> {t("forms:undertexts.artistNameExample3")}</Text>
						<Text italic small>
							{" "}
							Shawn Corey Carter
						</Text>
						.
					</>
				}
			/>

			<Hairline />
		</>
	)
}

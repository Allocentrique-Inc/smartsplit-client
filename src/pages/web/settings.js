import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View, TouchableWithoutFeedback } from "react-native"
import { Platform } from "../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import {
	TextField,
	Dropdown,
	CheckBox,
} from "../../components/forms/form-controls"
import { TabBar, Tab } from "../../components/tabs"
import DashboardNavbarWeb from "../../layouts/dashboard-navbar-web"
import MyProfile from "../../components/forms/my-profile"
import AccountInfoWeb from "./account-info-web"
import DashboardLayout from "../../layouts/dashboard.layout"
import Scrollable from "../../components/scrollable"
import { MainMenu } from "../../utils/menus"

export default function SettingsPage() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false,
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	return (
		<DashboardLayout menuItems={MainMenu}>
			<Scrollable>
				<DashboardNavbarWeb header={t("settings:settings")}/>
				<ScrollView>
					<Group
						style={
							Platform.OS === "web" && { maxWidth: 624, alignSelf: "center" }
						}
					>
						<MyProfile/>
						<AccountInfoWeb/>
					</Group>
				</ScrollView>
			</Scrollable>
		</DashboardLayout>
	)
}

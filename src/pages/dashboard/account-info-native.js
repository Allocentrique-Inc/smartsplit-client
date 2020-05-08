import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View, TouchableWithoutFeedback } from "react-native"
import { Platform } from "../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import { TextField, Dropdown } from "../../forms"
import { TabBar, Tab } from "../../widgets/tabs"
import Button from "../../widgets/button"
import DashboardNavbarNative from "../../layout/subscreen"
import MyProIdentity from "../../smartsplit/forms/my-pro-identity"
import MyAccount from "../../smartsplit/forms/my-account"
import CheckMark from "../../svg/check-mark"

export default function AccountInfoNative() {
	const [t] = useTranslation()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	return (
		<Column of="component">
			{Platform.native && (
				<>
					<DashboardNavbarNative header={t("settings:settings")} />
					<TouchableWithoutFeedback>
						<TabBar>
							<Tab key="account-info" title={t("settings:accountInfo")} default>
								<MyAccount />
							</Tab>

							<Tab key="pro-identity" title={t("settings:proIdentity")}>
								<MyProIdentity />
							</Tab>
						</TabBar>
					</TouchableWithoutFeedback>
				</>
			)}
		</Column>
	)
}

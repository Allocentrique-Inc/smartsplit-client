import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router"
import { Platform, View, StyleSheet } from "react-native"
import { observer } from "mobx-react"
import { useStorePath, useStores } from "../../mobX"
import { Row, Column, Group, Flex, Hairline } from "../../layout"
import { Heading } from "../../text"
import { TabBar, Tab } from "../../widgets/tabs"
import { Button, RoundButton } from "../../widgets/button"

import MediaWorkRow from "../../smartsplit/works/dashboard-row"
import CreateWorkModal from "../../smartsplit/works/create-work-modal"

export default function MyWorksPage() {
	const [t, i18n] = useTranslation()

	const [modalOpen, setModal] = useState(false)

	const addNewWorkButton = Platform.select({
		web: (
			<Button
				primary
				text={t("general:buttons.add")}
				onClick={() => setModal(true)}
			/>
		),
		ios: <RoundButton small text="+" />,
		android: <RoundButton small text="+" />,
	})

	return (
		<>
			<CreateWorkModal
				visible={modalOpen}
				onRequestClose={() => setModal(false)}
			/>

			<Group of="group">
				<Row of="component">
					<Flex>
						<Heading level="2">{t("dashboard:title")}</Heading>
					</Flex>
					{addNewWorkButton}
				</Row>

				<TabBar>
					<Tab key="my-works" title={t("dashboard:added")} default>
						<MyWorksTab />
					</Tab>

					<Tab key="shared-with-me" title={t("dashboard:shared")}>
						<SharedWithMeTab />
					</Tab>
				</TabBar>
			</Group>
		</>
	)
}

export const MyWorksTab = observer(function (props) {
	const workpieces = useStorePath("workpieces")
	// const user = useStorePath("auth", "user")
	//
	// useEffect(() => {
	// 	workpieces
	// 		.fetchForUser(user)
	// 		.catch((e) =>
	// 			console.error("Failed to refresh workpieces for user", user, e)
	// 		)
	// }, [user, workpieces])

	return (
		<Column of="none" spacer={Hairline}>
			{workpieces && workpieces.all.map(wp =>
				<MediaWorkRow workpiece={wp} key={wp.id} />
			)}
		</Column>
	)
})

export function SharedWithMeTab(props) {
	return <Column of="none" spacer={Hairline}></Column>
}

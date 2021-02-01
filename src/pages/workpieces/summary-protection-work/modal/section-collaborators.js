import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Flex, Hairline, Row } from "../../../../layout"
import ModifierSVG from "../../../../svg/modify-svg"
import { Heading, Text } from "../../../../text"
import Button from "../../../../widgets/button"
import ItemVersionDetailOnTouch from "./item-version-detail"
import SplitChart from "../../../../smartsplit/components/split-chart"
import { useRightSplits } from "../../../../mobX/hooks"
import { useCurrentWorkpieceId } from "../../context"
import { useStores } from "../../../../mobX"

const Styles = StyleSheet.create({
	highlightWord: {
		color: "#2DA84F",
		fontWeight: "bold",
	},
	modifyBtn: {
		borderWidth: 1,
		borderColor: "#DCDFE1",
		borderStyle: "solid",
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	part: {
		paddingBottom: 16,
	},
})

function SectionCollaborator(props) {
	const {
		splitState,
		section,
		isModal,
		canModify,
		title,
		data,
		chart,
		...nextProps
	} = props
	const { collaborators } = useStores()
	let shares = toJS(splitState.shareholdersData)
	shares = shares.map((share) => ({
		...share,
		user: toJS(collaborators.map[share.id]),
	}))
	console.log(shares)
	if (!splitState || !splitState.shareholders.filter) return null

	const [styles, setStyles] = useState({})
	useEffect(() => {
		let chartStyles = splitState.getStyles(1024)
		chartStyles.chart.position = "relative"
		chartStyles.chart.justifyContent = "center"
		chartStyles.chart.alignItems = "center"
		console.log(chartStyles)
		setStyles(chartStyles)
	}, [])

	const { t } = useTranslation()

	const dataArr = Array.from(data || [])

	return (
		<Column {...nextProps}>
			<Row style={Styles.part}>
				<Column flex={10}>
					<Heading level={5}>{title}</Heading>
				</Column>
				{canModify && (
					<Column flex={2}>
						<View>
							<Button
								small
								secondary
								bold
								text={t("shareYourRights:collaboratorModal.edit")}
							/>
						</View>
					</Column>
				)}
			</Row>
			<Row>
				<Column flex={1}>
					{dataArr.map((item, index) => (
						<ItemVersionDetailOnTouch
							style={{ paddingBottom: 16 }}
							key={index}
							boldPercent
							data={item}
							status={item.status}
							isModal={isModal}
						/>
					))}
				</Column>
				<Column flex={1}>
					<View style={styles.chart}>{chart}</View>
				</Column>
			</Row>
		</Column>
	)
}
export default SectionCollaborator

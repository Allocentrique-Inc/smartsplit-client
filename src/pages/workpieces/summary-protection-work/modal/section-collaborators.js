import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Column, Flex, Row } from "../../../../layout"
import { Heading } from "../../../../text"
import Button from "../../../../widgets/button"
import ItemVersionDetailOnTouch from "./item-version-detail"

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
	const { isModal, canModify, title, data, ...nextProps } = props
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
				<Flex>
					<Column>
						{dataArr.map((item, index) => (
							<ItemVersionDetailOnTouch
								style={{ paddingBottom: 16 }}
								key={index}
								secondaryPercent
								data={item}
								status={item.status}
								isModal={isModal}
							/>
						))}
					</Column>
				</Flex>
			</Row>
		</Column>
	)
}
export default SectionCollaborator

import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Flex, Hairline, Row } from "../../../../layout"
import ModifierSVG from "../../../../svg/modify-svg"
import { Heading, Text } from "../../../../text"
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
	const { canModify, title, data, ...nextProps } = props
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
							<TouchableWithoutFeedback>
								<View style={Styles.modifyBtn}>
									<Row>
										<Column
											flex={1}
											style={{
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<ModifierSVG />
										</Column>
										<Column flex={3} style={{ alignItems: "center" }}>
											<Text small bold action>
												{t("shareYourRights:collaboratorModal.edit")}
											</Text>
										</Column>
									</Row>
								</View>
							</TouchableWithoutFeedback>
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
								boldPercent
								data={item}
								status={item.status}
							/>
						))}
					</Column>
				</Flex>
			</Row>
		</Column>
	)
}
export default SectionCollaborator

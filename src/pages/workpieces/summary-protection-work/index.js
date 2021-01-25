import { observer } from "mobx-react"
import React, { useState } from "react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Flex, Hairline, Row } from "../../../layout"
import AlbumArt from "../../../smartsplit/media/albumArt"
import { Heading, Text } from "../../../text"
import Scrollable from "../../../widgets/scrollable"
import ArrowLeft from "../../../svg/arrow-left"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import moment from "moment"
import { Tab, TabBar } from "../../../widgets/tabs"
import EmptyState from "../../../svg/empty-state"
import Button from "../../../widgets/button"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import VerticalThreeDot from "../../../svg/vertical-threedot"
import UserAvatar from "../../../smartsplit/user/avatar"
//import { Board } from "react-native-draganddrop-board"

const Styles = StyleSheet.create({
	navBarCol: {
		borderBottomColor: "#DCDFE1",
		borderBottomWidth: 2,
	},
	taskBar: {
		paddingTop: 32,
		width: "100%",
	},
	emptyStateIcon: {
		alignItems: "center",
	},
	emptyStateView: {
		paddingTop: 90,
		alignItems: "center",
	},
	columnName: { marginBottom: 16, marginTop: 32 },
})
const grid = 8
const getListStyle = (isDraggingOver) => ({
	background: "#FAF8F9",
	padding: grid,
	borderRadius: 8,
	width: 304,
})

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	borderRadius: 4,
	background: "#FFFFFF",
	width: 288,
	...draggableStyle,
})

const getItems = (count, offset = 0) =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `item-${k + offset}`,
		content: `item ${k + offset}`,
	}))

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source)
	const destClone = Array.from(destination)
	const [removed] = sourceClone.splice(droppableSource.index, 1)

	destClone.splice(droppableDestination.index, 0, removed)

	const result = {}
	result[droppableSource.droppableId] = sourceClone
	result[droppableDestination.droppableId] = destClone

	return result
}

const SummaryProtectionWorkPage = observer(() => {
	const history = useHistory()
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const navigateToSummary = () => {
		history.push(`/workpieces/${workpiece.id}`)
	}

	const [isEmpty, setIsEmpty] = useState(false)
	const [items, setItems] = useState(getItems(3))
	console.log(
		"🚀 ~ file: index.js ~ line 95 ~ SummaryProtectionWorkPage ~ items",
		items
	)
	const [selected, setSelected] = useState(getItems(2, 4))
	console.log(
		"🚀 ~ file: index.js ~ line 97 ~ SummaryProtectionWorkPage ~ selected",
		selected
	)
	const [decided, setDecided] = useState(getItems(4, 5))
	console.log(
		"🚀 ~ file: index.js ~ line 99 ~ SummaryProtectionWorkPage ~ decided",
		decided
	)

	const clickArrowLeft = () => {
		navigateToSummary()
	}

	const getList = (id) => {
		if (id === "droppable") {
			return items
		} else if (id === "droppable2") {
			return selected
		} else if (id === "droppable3") {
			return decided
		}
	}

	const onDragEnd = (result) => {
		const { source, destination } = result
		console.log("🚀 ~ file: index.js ~ line 118 ~ onDragEnd ~ result", result)

		// dropped outside the list
		if (!destination) {
			return
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(
				getList(source.droppableId),
				source.index,
				destination.index
			)

			debugger
			// let state = { items }
			if (source.droppableId === "droppable") {
				setItems(items)
			} else if (source.droppableId === "droppable2") {
				setSelected(items)
			} else if (source.droppableId === "droppable3") {
				setDecided(items)
			}
		} else {
			debugger
			const result = move(
				getList(source.droppableId),
				getList(destination.droppableId),
				source,
				destination
			)

			setItems(result.droppable)
			setSelected(result.droppable2)
			setDecided(result.droppable3)
		}
	}

	let shareInfo = {
		updateBy: "Inscience",
		lastUpdate: "01/22/2021 07:50 AM",
		columns: {
			waitingToSend: [
				{
					version: "1",
					updateBy: "ArtistName",
					lastUpdate: "01/25/2021 17:03",
					userUrls: [
						"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
						"",
						"",
					],
				},
				{
					version: "2",
					updateBy: "ArtistName2",
					lastUpdate: "01/25/2021 17:03",
					userUrls: [
						"",
						"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
						"",
					],
				},
				{
					version: "3",
					updateBy: "ArtistName3",
					lastUpdate: "01/25/2021 17:03",
					userUrls: [
						"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
						"",
						"",
					],
				},
			],
			awaitingDecision: [""],
		},
	}

	return (
		<View style={{ height: "100%" }}>
			<Row style={{ width: "100%" }}>
				<Column flex={2} style={[Styles.navBarCol]}>
					<Row of="component" padding="component" valign="center">
						<TouchableWithoutFeedback onPress={clickArrowLeft}>
							<View>
								<ArrowLeft />
							</View>
						</TouchableWithoutFeedback>
					</Row>
				</Column>
				<Column flex={8} style={[Styles.navBarCol]}>
					<Row of="component" padding="component" valign="center">
						<AlbumArt />
						<Text bold>Fantôme</Text>
						<Text>· {t("shareYourRights:sharingRights")}</Text>
					</Row>
				</Column>
				<Column flex={2} style={[Styles.navBarCol]}></Column>
			</Row>
			<Scrollable autoScrollToTop>
				<Row style={{ width: "100%", paddingTop: 32, paddingBottom: 60 }}>
					<Column flex={2} />
					<Column flex={8}>
						<Row>
							<Heading level={2}>{t("shareYourRights:summarySharing")}</Heading>
						</Row>
						<Row>
							<Text small secondary>
								{t("shareYourRights:updateBy")}
							</Text>
							<Text bold small action>
								{" "}
								{shareInfo.updateBy}{" "}
							</Text>
							<Text secondary small>
								{t("shareYourRights:ago", {
									hour: moment(shareInfo.lastUpdate).startOf("hour").fromNow(),
								})}
							</Text>
						</Row>
						<Row>
							<TabBar style={Styles.taskBar}>
								<Tab
									key="my-collaborators"
									title={t("shareYourRights:tabBar.myCollaborators.title")}
									heavy
									bold
								></Tab>
								<Tab
									key="my-editor"
									title={t("shareYourRights:tabBar.myEditor.title")}
									default
									heavy
									bold
								>
									{isEmpty && <EmptyStateView />}
									{!isEmpty && (
										<View>
											<Row>
												<DragDropContext onDragEnd={onDragEnd}>
													<Column style={{ marginRight: 16 }}>
														<Row style={Styles.columnName}>
															<Text bold>En attente d’envoi</Text>
														</Row>
														<Row>
															<Droppable droppableId="droppable">
																{(provided, snapshot) => (
																	<div
																		ref={provided.innerRef}
																		style={getListStyle(
																			snapshot.isDraggingOver
																		)}
																	>
																		{items.map((item, index) => (
																			<Draggable
																				key={item.id}
																				draggableId={item.id}
																				index={index}
																			>
																				{(provided, snapshot) => (
																					<div
																						ref={provided.innerRef}
																						{...provided.draggableProps}
																						{...provided.dragHandleProps}
																						style={getItemStyle(
																							snapshot.isDragging,
																							provided.draggableProps.style
																						)}
																					>
																						<Column>
																							<Row>
																								<Column flex={5}>
																									<Text bold>
																										{item.content}
																									</Text>
																								</Column>
																								<Column>
																									<VerticalThreeDot />
																								</Column>
																							</Row>
																							<Row>
																								<Text small secondary>
																									{t(
																										"shareYourRights:updateBy"
																									)}
																								</Text>
																								<Text small action bold>
																									{" "}
																									{shareInfo.updateBy}{" "}
																								</Text>
																								<Text small secondary>
																									{t("shareYourRights:ago", {
																										hour: moment(
																											shareInfo.lastUpdate
																										)
																											.startOf("hour")
																											.fromNow(),
																									})}
																								</Text>
																							</Row>
																							<Row
																								style={{
																									marginBottom: 16,
																									marginTop: 16,
																								}}
																							>
																								<UserAvatar size="small" />
																							</Row>
																							<Hairline />
																							<Row style={{ marginTop: 16 }}>
																								<Column flex={5}>
																									<Button text="Envoyer à l’éditeur" />
																								</Column>
																							</Row>
																						</Column>
																					</div>
																				)}
																			</Draggable>
																		))}
																		{provided.placeholder}
																	</div>
																)}
															</Droppable>
														</Row>
													</Column>
													<Column>
														<Row style={Styles.columnName}>
															<Text bold>En attente d’envoi</Text>
														</Row>
														<Row>
															<Droppable droppableId="droppable2">
																{(provided, snapshot) => (
																	<div
																		ref={provided.innerRef}
																		style={getListStyle(
																			snapshot.isDraggingOver
																		)}
																	>
																		{selected.map((item, index) => (
																			<Draggable
																				key={item.id}
																				draggableId={item.id}
																				index={index}
																			>
																				{(provided, snapshot) => (
																					<div
																						ref={provided.innerRef}
																						{...provided.draggableProps}
																						{...provided.dragHandleProps}
																						style={getItemStyle(
																							snapshot.isDragging,
																							provided.draggableProps.style
																						)}
																					>
																						<Column>
																							<Row>
																								<Column flex={5}>
																									<Text bold>
																										{item.content}
																									</Text>
																								</Column>
																								<Column>
																									<VerticalThreeDot />
																								</Column>
																							</Row>
																							<Row>
																								<Text small secondary>
																									{t(
																										"shareYourRights:updateBy"
																									)}
																								</Text>
																								<Text small action bold>
																									{" "}
																									{shareInfo.updateBy}{" "}
																								</Text>
																								<Text small secondary>
																									{t("shareYourRights:ago", {
																										hour: moment(
																											shareInfo.lastUpdate
																										)
																											.startOf("hour")
																											.fromNow(),
																									})}
																								</Text>
																							</Row>
																							<Row
																								style={{
																									marginBottom: 16,
																									marginTop: 16,
																								}}
																							>
																								<UserAvatar size="small" />
																							</Row>
																							<Hairline />
																							<Row style={{ marginTop: 16 }}>
																								<Column flex={5}>
																									<Button text="Envoyer à l’éditeur" />
																								</Column>
																							</Row>
																						</Column>
																					</div>
																				)}
																			</Draggable>
																		))}
																		{provided.placeholder}
																	</div>
																)}
															</Droppable>
														</Row>
													</Column>
													{/* <Column>
														<Row style={Styles.columnName}>
															<Text bold>Décidées</Text>
														</Row>
														<Row>
															<Droppable droppableId="droppable3">
																{(provided, snapshot) => (
																	<div
																		ref={provided.innerRef}
																		style={getListStyle(
																			snapshot.isDraggingOver
																		)}
																	>
																		{decided.map((item, index) => (
																			<Draggable
																				key={item.id}
																				draggableId={item.id}
																				index={index}
																			>
																				{(provided, snapshot) => (
																					<div
																						ref={provided.innerRef}
																						{...provided.draggableProps}
																						{...provided.dragHandleProps}
																						style={getItemStyle(
																							snapshot.isDragging,
																							provided.draggableProps.style
																						)}
																					>
																						<Column>
																							<Row>
																								<Column flex={5}>
																									<Text bold>Version 1</Text>
																								</Column>
																								<Column>
																									<VerticalThreeDot />
																								</Column>
																							</Row>
																							<Row>
																								<Text small secondary>
																									{t(
																										"shareYourRights:updateBy"
																									)}
																								</Text>
																								<Text small action bold>
																									{" "}
																									{shareInfo.updateBy}{" "}
																								</Text>
																								<Text small secondary>
																									{t("shareYourRights:ago", {
																										hour: moment(
																											shareInfo.lastUpdate
																										)
																											.startOf("hour")
																											.fromNow(),
																									})}
																								</Text>
																							</Row>
																							<Row
																								style={{
																									marginBottom: 16,
																									marginTop: 16,
																								}}
																							>
																								<UserAvatar size="small" />
																							</Row>
																							<Hairline />
																							<Row style={{ marginTop: 16 }}>
																								<Column flex={5}>
																									<Button text="Envoyer à l’éditeur" />
																								</Column>
																							</Row>
																						</Column>
																					</div>
																				)}
																			</Draggable>
																		))}
																		{provided.placeholder}
																	</div>
																)}
															</Droppable>
														</Row>
													</Column> */}
												</DragDropContext>
											</Row>
										</View>
									)}
								</Tab>
								<Tab
									key="my-manager"
									title={t("shareYourRights:tabBar.myManager.title")}
									heavy
									bold
								></Tab>
							</TabBar>
						</Row>
					</Column>
					<Column flex={2} />
				</Row>
			</Scrollable>
		</View>
	)
})

export function EmptyStateView(props) {
	const { t } = useTranslation()
	return (
		<Column style={Styles.emptyStateView}>
			<View style={Styles.emptyStateIcon}>
				<EmptyState />
			</View>
			<Text align="center" bold style={{ paddingTop: 50 }}>
				{t("shareYourRights:tabBar.myEditor.why")}
			</Text>
			<Text align="center" secondary style={{ paddingTop: 8 }}>
				{t("shareYourRights:tabBar.myEditor.whyContent")}
			</Text>

			<Button
				style={{ maxWidth: 169, marginTop: 32 }}
				text={t("shareYourRights:tabBar.myEditor.addEditor")}
			/>
		</Column>
	)
}

export default SummaryProtectionWorkPage

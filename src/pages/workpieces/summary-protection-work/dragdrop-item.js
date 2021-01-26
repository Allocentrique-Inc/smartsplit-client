import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Column, Row } from "../../../layout"
import { Heading, Text } from "../../../text"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import ItemBox from "./item-box"
import { StyleSheet, View } from "react-native"

const Styles = StyleSheet.create({
	textColumn: {
		paddingTop: 2,
		paddingRight: 7,
		paddingBottom: 2,
		paddingLeft: 7,
	},
	columnName: { width: 304, marginRight: 16 },
	numItem: {
		paddingTop: 8,
		paddingRight: 10,
		paddingBottom: 7,
		paddingLeft: 10,
		marginLeft: 1,
		backgroundColor: "#F5F2F3",
		borderRadius: "100%",
	},
})

const grid = 8
const getListStyle = (isDraggingOver) => ({
	background: "#FAF8F9",
	padding: grid,
	borderRadius: 8,
	width: 304,
	marginRight: 16,
	minHeight: 508,
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

const reOrder = (list, startIndex, endIndex) => {
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

function DragDropItem(props) {
	const { columns } = props
	const { t } = useTranslation()
	const [waitingToSend, setWaitingToSend] = useState(
		columns && columns.waitingToSend != undefined ? columns.waitingToSend : []
	)
	const [awaitingDecision, setAwaitingDecision] = useState(
		columns && columns.awaitingDecision != undefined
			? columns.awaitingDecision
			: []
	)
	const [decided, setDecided] = useState(
		columns && columns.decided != undefined ? columns.decided : []
	)
	const getList = (id) => {
		if (id === "droppable") {
			return waitingToSend
		} else if (id === "droppable2") {
			return awaitingDecision
		} else if (id === "droppable3") {
			return decided
		}
	}
	const onDragEnd = (result) => {
		const { source, destination } = result

		// dropped outside the list
		if (!destination) {
			return
		}

		if (source.droppableId === destination.droppableId) {
			const items = reOrder(
				getList(source.droppableId),
				source.index,
				destination.index
			)

			// let state = { items }
			if (source.droppableId === "droppable") {
				setWaitingToSend(items)
			} else if (source.droppableId === "droppable2") {
				setAwaitingDecision(items)
			} else if (source.droppableId === "droppable3") {
				setDecided(items)
			}
		} else {
			const result = move(
				getList(source.droppableId),
				getList(destination.droppableId),
				source,
				destination
			)

			setWaitingToSend(
				result["droppable"]
					? result["droppable"]
					: waitingToSend
					? waitingToSend
					: []
			)
			setAwaitingDecision(
				result["droppable2"]
					? result["droppable2"]
					: awaitingDecision
					? awaitingDecision
					: []
			)
			setDecided(
				result["droppable3"] ? result["droppable3"] : decided ? decided : []
			)
		}
	}
	return (
		<Row style={{ marginTop: 32 }}>
			<Column flex={12} style={{ alignItems: "center" }}>
				<Row style={{ paddingBottom: 16 }}>
					<Column style={Styles.columnName}>
						<Row>
							<Heading level={4} style={Styles.textColumn}>
								{t("shareYourRights:tabBar.dragDrop.waitingToSend")}
							</Heading>
							<Text small style={Styles.numItem}>
								{waitingToSend.length}
							</Text>
						</Row>
					</Column>
					<Column style={Styles.columnName}>
						<Row>
							<Heading level={4} style={Styles.textColumn}>
								{t("shareYourRights:tabBar.dragDrop.awaitingDecision")}
							</Heading>
							<Text small style={Styles.numItem}>
								{awaitingDecision.length}
							</Text>
						</Row>
					</Column>
					<Column style={Styles.columnName}>
						<Row>
							<Heading level={4} style={Styles.textColumn}>
								{t("shareYourRights:tabBar.dragDrop.decided")}
							</Heading>
							<Text small style={Styles.numItem}>
								{decided.length}
							</Text>
						</Row>
					</Column>
				</Row>
				<Row>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppable">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}
								>
									{waitingToSend &&
										waitingToSend.map((item, index) => (
											<Draggable
												key={item.version}
												draggableId={item.version}
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
														<ItemBox dataItem={item} key={index} />
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<Droppable droppableId="droppable2">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}
								>
									{awaitingDecision &&
										awaitingDecision.map((item, index) => (
											<Draggable
												key={item.version}
												draggableId={item.version}
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
														<ItemBox dataItem={item} key={index} />
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<Droppable droppableId="droppable3">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}
								>
									{decided &&
										decided.map((item, index) => (
											<Draggable
												key={item.version}
												draggableId={item.version}
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
														<ItemBox dataItem={item} key={index} />
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</Row>
			</Column>
		</Row>
	)
}
export default DragDropItem

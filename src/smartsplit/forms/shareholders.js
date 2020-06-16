import React, {
	useState,
	useEffect,
	useReducer,
	useRef,
	useLayoutEffect,
} from "react"
import { CheckBoxGroupButton, Form } from "../../forms"
import { Column, Row } from "../../layout"
import AddCollaboratorDropdown from "../components/add-collaborator-dropdown"
import ShareCard from "../components/share-card"
import { CheckBoxGroup } from "../../forms/checkbox"
import {
	useCurrentWorkpiece,
	WorkpieceContext,
} from "../../pages/workpieces/context"
import { Colors, Metrics } from "../../theme"
import SplitChart from "../components/split-chart"
import CircledC from "../../svg/circled-c"
import { Card } from "../../pages/workpieces/rights-splits/copyright"
import { TouchableWithoutFeedback, View } from "react-native"
import XIcon from "../../svg/x"
import { useDimensions } from "../../utils/hooks"
import { getShareTotal } from "../../widgets/pie-chart"

export default function ShareHoldersForm({ fields }) {
	const [, rerender] = useReducer((n) => n + 1, 0)
	const splits = useCurrentWorkpiece("rightsSplits", "copyright")
	const shares = useCurrentWorkpiece("rightsSplits", "copyright", "allShares")
	const [chartSize, setChartSize] = useState(0)
	console.log("splits", splits)
	console.log("shares", shares)
	function addShareHolder(rightHolder_id) {
		splits.addRightHolder(rightHolder_id, {
			shares: 1,
		})
	}

	useEffect(() => {
		//testing purposes
		splits.addRightHolder("55327089-10c0-4735-afc9-171e96865fce", {
			shares: 1,
		})
		splits.addRightHolder("235556b5-3bbb-4c90-9411-4468d873969b", { shares: 1 })
	}, [])

	const shareColors = Object.values(Colors.secondaries)

	function colorByIndex(index) {
		return shareColors[index % shareColors.length]
	}

	let chartData = shares.map((share, i) => ({
		key: share.rightHolder,
		name: share.rightHolder,
		share: share.shares,
		color: colorByIndex(i),
	}))

	console.log("chart", chartData)

	const totalShares = shares
		.map((share) => share.shares)
		.reduce((a, n) => a + n, 0)

	useEffect(() => {
		const unsubscribes = shares.map((share) => share.subscribe(rerender))
		return function () {
			unsubscribes.forEach((unsub) => unsub())
		}
	}, [shares])

	return (
		<Row>
			<Column of="component" flex={1}>
				{shares.map((share, i) => (
					<ShareCard
						key={share.rightHolder}
						rightHolderId={share.rightHolder}
						color={colorByIndex(i)}
						actions={
							<TouchableWithoutFeedback
								onPress={() => splits.removeRightHolder(share.rightHolder)}
							>
								<View>
									<XIcon />
								</View>
							</TouchableWithoutFeedback>
						}
						sharePercent={
							share.shares > 0 ? (100 * share.shares) / totalShares : 0
						}
					/>
				))}
				{/*{shareHolders.map((id, index) => <ShareCard rightHolderId={id} key={id} share={33}*/}
				{/*                                            error={index % 2 !== 0 && "Plz fais une selection"}>*/}
				{/*	<CheckBoxGroup error={index % 2 !== 0}>*/}
				{/*		<Row>*/}
				{/*			<Column flex={1} of="component">*/}
				{/*				<CheckBoxGroupButton value="A" label="Option A"/>*/}
				{/*				<CheckBoxGroupButton value="B" label="Option B"/>*/}
				{/*			</Column>*/}
				{/*			<Column flex={1} of="component">*/}
				{/*				<CheckBoxGroupButton value="C" label="Option C"/>*/}
				{/*				<CheckBoxGroupButton value="D" label="Option D"/>*/}
				{/*			</Column>*/}
				{/*		</Row>*/}
				{/*	</CheckBoxGroup></ShareCard>)}*/}
				<AddCollaboratorDropdown onSelect={addShareHolder} />
			</Column>
			<View
				style={{
					width: 3 * Metrics.spacing.group,
					height: 3 * Metrics.spacing.group,
				}}
			/>
			<Column
				flex={1}
				align="center"
				onLayout={(e) => setChartSize(e.nativeEvent.layout.width)}
			>
				<SplitChart data={chartData} logo={CircledC} size={chartSize} />
			</Column>
		</Row>
	)
}

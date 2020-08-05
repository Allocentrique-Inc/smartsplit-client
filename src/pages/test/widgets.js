import React from "react"
import { Column, Section, Spacer } from "../../layout"
import { PieChart } from "../../widgets/pie-chart"
import { useTranslation } from "react-i18next"
import {
	AdminList,
	AdminListItem,
} from "../../smartsplit/components/admin-list"
import { Text } from "../../text"
import { TouchableWithoutFeedback, View } from "react-native"
import Pen from "../../svg/pen"
import Button from "../../widgets/button"
import Trash from "../../svg/trash"
import { Colors } from "../../theme"
import SplitChart, {
	DualSplitChart,
} from "../../smartsplit/components/split-chart"
import CircledC from "../../svg/circled-c"
import CircledP from "../../svg/circled-p"
import CircledStar from "../../svg/circled-star"

export default function WidgetTests() {
	return (
		<Column of="group">
			<PieChartTests />
			<AdminListTest />
		</Column>
	)
}

function PieChartTests() {
	const data = [
		{
			key: "user1",
			name: "Groupe 1",
			share: 1,
			color: Colors.secondaries.purple,
		},
		{
			key: "user2",
			name: "Groupe 2",
			share: 1,
			color: Colors.secondaries.scarlett,
		},
		{
			key: "user3",
			name: "Groupe 3",
			share: 1,
			color: Colors.secondaries.pink,
		},
		{
			key: "user4",
			name: "Groupe 4",
			share: 1,
			color: Colors.secondaries.salmon,
		},
		{
			key: "user5",
			name: "Groupe 5",
			share: 1,
			color: Colors.secondaries.coral,
		},
		{
			key: "user6",
			name: "Groupe 6",
			share: 1,
			color: Colors.secondaries.peach,
		},
		{
			key: "user7",
			name: "Groupe 7",
			share: 5.34,
			color: Colors.secondaries.orange,
		},
		{
			key: "user8",
			name: "Groupe 8",
			share: 1,
			color: Colors.secondaries.yellow,
		},
	]
	return (
		<Column of="group" align="center">
			{/*<PieChart data={data} size={512} />*/}
			<SplitChart data={data} logo={CircledP} />
			<SplitChart data={data} logo={CircledC} />
			<DualSplitChart
				dataRight={data}
				dataLeft={data}
				titleLeft="paroles"
				titleRight="musique"
				logo={CircledStar}
			/>
		</Column>
	)
}

function AdminListTest() {
	const { t } = useTranslation()
	return (
		<AdminList
			collapsable
			title={
				<Column>
					<Text bold>Super titre de liste</Text>
					<Text secondary small>
						Mouain, faut pas exagérer quand même.
					</Text>
				</Column>
			}
		>
			<AdminListItem key={0} content="Piano" pending />
			<AdminListItem key={1} content="Accordeon" />
			<AdminListItem
				key={2}
				content={
					<Column>
						<Text bold>Le ouarkalélé</Text>
						<Text small secondary>
							Petite description
						</Text>
					</Column>
				}
			/>
			<AdminListItem key={3} content="Whatever" />
			<AdminListItem key={4} content="With custom action">
				<TouchableWithoutFeedback>
					<View>
						<Pen />
					</View>
				</TouchableWithoutFeedback>
				<Button
					dangerWithIcon
					icon={<Trash color={Colors.error} />}
					text={t("general:buttons.toRefuse")}
				/>
			</AdminListItem>
			<AdminListItem
				hideBullet
				contentIsList
				key={5}
				content={
					<AdminList
						collapsable
						title={
							<Column>
								<Text bold>Super titre de sous-liste</Text>
								<Text secondary small>
									Mouain, faut pas exagérer quand même.
								</Text>
							</Column>
						}
					>
						<AdminListItem key={0} content="Piano" pending />
						<AdminListItem key={1} content="Accordeon" />
						<AdminListItem
							key={2}
							content={
								<>
									<Text bold>Le ouarkalélé</Text>
									<Text small secondary>
										Petite description
									</Text>
								</>
							}
						/>
						<AdminListItem key={3} content="Whatever" />
						<AdminListItem key={4} content="With custom action">
							<TouchableWithoutFeedback>
								<View>
									<Pen />
								</View>
							</TouchableWithoutFeedback>
							<Button
								dangerWithIcon
								icon={<Trash color={Colors.error} />}
								text={t("general:buttons.toRefuse")}
							/>
						</AdminListItem>
					</AdminList>
				}
			/>
		</AdminList>
	)
}

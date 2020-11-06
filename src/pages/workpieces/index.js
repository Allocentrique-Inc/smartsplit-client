import React from "react"
import {
	Switch,
	Route,
	Redirect,
	generatePath,
	useHistory,
	useRouteMatch,
	useParams,
} from "react-router"
import { StyleSheet, View } from "react-native"
import { WorkpieceContext, useCurrentWorkpiece } from "./context"
import RightsSplitsPage from "./rights-splits"
import ProtectWork from "./protect"
import { Column, Row, Spacer } from "../../layout"
import { Colors, Metrics } from "../../theme"
import { Navbar } from "../../smartsplit/components/navbar"
import AlbumArt from "../../smartsplit/media/albumArt"
import { Heading, Text } from "../../text"
import { TouchableWithoutFeedback } from "react-native-web"
import PenIcon from "../../svg/pen"
import { Tag } from "../../widgets/tag"
import { useTranslation } from "react-i18next"
import { Tab, TabBar } from "../../widgets/tabs"
import UserAvatar from "../../smartsplit/user/avatar"
import ChevronDown from "../../svg/chevron-down"
import { DocumentYourWork, ProtectYourWork, ShareYourCopyright } from "./cards"
import { useStorePath, useStores } from "../../mobX"
import { observer } from "mobx-react"
import DocumentationPage from "./documentation"
const WorkpiecesRouter = observer(() => {
	const match = useRouteMatch("/workpieces/:workpiece_id")
	const workpiece = useStorePath("workpieces").fetch(match.params.workpiece_id)

	return (
		<WorkpieceContext.Provider value={workpiece}>
			<Switch>
				<Route
					path="/workpieces/:workpiece_id"
					exact
					component={WorkpiecePage}
				/>

				<Route
					path={[
						"/workpieces/:workpiece_id/rights-splits/:split_type",
						"/workpieces/:workpiece_id/rights-splits",
					]}
					component={RightsSplitsPage}
				/>
				<Route
					path={[
						"/workpieces/:workpiece_id/documentation/:type",
						"/workpieces/:workpiece_id/documentation",
					]}
					component={DocumentationPage}
				/>

				<Route path="/workpieces/:workpiece_id/protect">
					<ProtectWork />
				</Route>

				{/*<Route path="/workpieces/:workpiece_id/documentation/recording">*/}
				{/*	<Recording />*/}
				{/*</Route>*/}
				{/*<Route path="/workpieces/:workpiece_id/documentation/creation">*/}
				{/*	<Creation />*/}
				{/*</Route>*/}
				{/*<Route path="/workpieces/:workpiece_id/documentation/performance">*/}
				{/*	<Performance />*/}
				{/*</Route>*/}
				{/*<Route path="/workpieces/:workpiece_id/documentation/files">*/}
				{/*	<Files />*/}
				{/*</Route>*/}
			</Switch>
		</WorkpieceContext.Provider>
	)
})

export const demoPiece = {
	title: "Titre de la pièce",
}

const Styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: Colors.background.underground,
		height: "100%",
		paddingRight: Metrics.spacing.small,
		paddingLeft: Metrics.spacing.small,
	},
	innerContainer: {
		maxWidth: 976,
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		paddingRight: Metrics.spacing.small,
		paddingLeft: Metrics.spacing.small,
	},
	tabContainer: {
		height: "100%",
		marginRight: -Metrics.spacing.small,
		marginLeft: -Metrics.spacing.small,
	},

	navBar: {
		paddingTop: Metrics.size.small,
		paddingBottom: Metrics.size.small,
	},
	cardContainer: {
		paddingTop: Metrics.spacing.section,
		backgroundColor: Colors.background.ground,
	},
	albumArt: {
		height: Metrics.size.xlarge,
		width: Metrics.size.xlarge,
	},
	tag: {
		backgroundColor: Colors.background.hell,
	},
	infoBar: {
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
		paddingTop: Metrics.size.small,
		paddingRight: 0,
		paddingLeft: 0,
	},
})

const stubWorkpiece = {
	title: "Yes yes, this is my song !",
	original: true,
	artist: "PlagiatDude",
	updated: "3h",
}

export function WorkpiecePage() {
	const history = useHistory()
	const { t } = useTranslation()

	return (
		<Column style={Styles.outerContainer}>
			<Navbar
				onBack={() => history.push("/dashboard/")}
				actions={
					<TouchableWithoutFeedback>
						<Row of="inside" valign="center">
							<UserAvatar />
							<ChevronDown />
						</Row>
					</TouchableWithoutFeedback>
				}
				style={Styles.navBar}
			/>
			<Column of="component" style={{ height: "100%" }}>
				<InfoBar />
				<TabBar
					barStyle={Styles.innerContainer}
					style={Styles.tabContainer}
					noBorder
				>
					<Tab key="tasks" title={t("workpieces:tasks")} default heavy bold>
						<Column
							style={{
								height: "100%",
								backgroundColor: Colors.background.ground,
							}}
						>
							<Column style={Styles.innerContainer}>
								<Row wrap style={Styles.cardContainer}>
									<DocumentYourWork />
									<ShareYourCopyright />
									<ProtectYourWork />
								</Row>
							</Column>
						</Column>
					</Tab>
					<Tab key="files" title={t("workpieces:files")} />
				</TabBar>
			</Column>
		</Column>
	)
}

function InfoBar() {
	const { t } = useTranslation()

	const { workpiece_id, type } = useParams()
	//console.log(workpiece_id)
	const { workpieces } = useStores()
	const workpiece = workpieces.list[workpiece_id].data
	//console.log(workpiece)
	return (
		<Row
			of="group"
			style={[Styles.innerContainer, Styles.infoBar]}
			valign="bottom"
		>
			<AlbumArt style={Styles.albumArt} />
			<Column of="component">
				<Row of="component" valign="center">
					<Heading level={2}>{workpiece.title}</Heading>
					<TouchableWithoutFeedback>
						<View>
							<PenIcon />
						</View>
					</TouchableWithoutFeedback>
				</Row>
				<Row of="component">
					<Tag small style={Styles.tag}>
						<Text>
							{t(
								`workpieces:${stubWorkpiece.original ? "original" : "remake"}`
							)}
						</Text>
					</Tag>
					<Text secondary>
						{t("workpieces:addedBy")}
						<Spacer of="tiny" />
						<TouchableWithoutFeedback>
							<Text action bold>
								{stubWorkpiece.artist}
							</Text>
						</TouchableWithoutFeedback>
						<Spacer of="tiny" />
						&#183;
						<Spacer of="tiny" />
						{t("workpieces:updated")(stubWorkpiece.updated)}
					</Text>
				</Row>
			</Column>
		</Row>
	)
}

export default WorkpiecesRouter

import React, { useState, useEffect } from "react"
import { Column, Row } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { useTranslation } from "react-i18next"
import { Colors, Metrics } from "../../../theme"
import { RadioGroup, RadioGroupButton, Select } from "../../../forms"
import ShareCard from "../../../smartsplit/components/share-card"
import AddCollaboratorDropdown from "../../../smartsplit/components/AddCollaboratorDropdown"
import { View } from "react-native"
import SplitChart from "../../../smartsplit/components/split-chart"
import CircledP from "../../../svg/circled-p"
import { Observer, observer } from "mobx-react"
import Slider from "../../../widgets/slider"
import LockButton from "../../../widgets/lock-button"
import { PercentageInput } from "../../../forms/percentage"
import ProgressBar from "../../../widgets/progress-bar"
import { formatPercentage } from "../../../utils/utils"
import { runInAction } from "mobx"
import { useRightSplits } from "../../../mobX/hooks"
import { useCurrentWorkpieceId } from "../context"
import { CHART_WINDOW_RATIO } from "../../../mobX/states/right-splits/RightSplitState"
import SendCollaboratorsModal from "../summary-protection-work/modal/send-collaborators-modal"
import CollaboratorModal from "../summary-protection-work/modal/collaborators-modal"
import { shareInfo } from "../summary-protection-work/index"
const SendPage = observer((props) => {
	const splitState = useRightSplits(useCurrentWorkpieceId(), "recording")
	const domainState = splitState.domainState
	const [sendVisible, setSendVisible] = useState(false)
	return (
		<Row
			onLayout={(e) =>
				(splitState.chartSize = e.nativeEvent.layout.width * CHART_WINDOW_RATIO)
			}
		>
			<CollaboratorModal
				visible={true}
				data={shareInfo.columns.waitingToSend[0]}
				onRequestClose={props.back}
				onClickSend={() => {
					setSendVisible(true)
				}}
			/>
			<SendCollaboratorsModal
				visible={sendVisible}
				onRequestClose={() => setSendVisible(false)}
			/>
		</Row>
	)
})

export default SendPage

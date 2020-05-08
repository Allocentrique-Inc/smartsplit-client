import React, { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { View, BackHandler } from "react-native"
import { Platform } from "../platform"
import { Flex, Row, Hairline, Column, Group, Spacer } from "../layout"
import { Heading } from "../text"
import Button from "../widgets/button"
import ArrowLeft from "../../assets/svg/arrow-left"
import Scrollable from "../widgets/scrollable"
import { Navbar } from "../smartsplit/components/navbar"
import { AvatarIcon } from "./dashboard"
import { Metrics } from "../theme"

export default function SubScreenLayout(props) {
	const {
		title,
		onBack,
		actions,
		children,
	} = props

	return (
		<>
			<Navbar title={title}/>
			<Scrollable>
				<Column align="center"
				        style={{
					        paddingRight: Metrics.spacing.medium,
					        paddingLeft: Metrics.spacing.medium,
				        }}>
					<Column of="none" style={{ maxWidth: 944, flex: 1 }}>
						{children}
					</Column>
					<Spacer of="component"/>
				</Column>
			</Scrollable>
		</>
	)
}

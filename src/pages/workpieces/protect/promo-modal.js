import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import TextField from "../../../forms/text"
import { Column, Flex, Row } from "../../../layout"
import LayoutStyles from "../../../styles/layout"
import XIcon from "../../../svg/x"
import { Heading, Text } from "../../../text"
import { Metrics } from "../../../theme"
import { Button } from "../../../widgets/button"
import { ModalStyles } from "../../../widgets/modal"
import LayerStyles from "../../../styles/layout"
import MetricsStyles from "../../../styles/metrics"
import { observer } from "mobx-react"
import { Overlay } from "../../../portals"
import promoImage from "../../../../assets/protect-promo-modal.png"
import PromoIcon from "../../../../assets/promo-icon.png"

const Styles = StyleSheet.create({
	dialogForm: {
		maxWidth: 500,
	},
	rowContent: { padding: 10 },
	medium: {
		maxWidth: 500,
		minWidth: 280,
		borderRadius: Metrics.borderRadius.modals,
		maxHeight: "90%",
	},
	modal_background: {
		backgroundColor: "rgba(0, 0, 0, 0.35)",
	},
	header_button: {
		marginTop: Metrics.spacing.small,
		marginRight: Metrics.spacing.small,
	},
	header_background: {
		height: 280,
	},
	promoBackground: {
		backgroundImage: `url(${promoImage})`,
		width: "100%",
		height: "100%",
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	},
	promoAmountContent: {
		justifyContent: "flex-end",
	},
	promoIcon: {
		backgroundImage: `url(${PromoIcon})`,
		width: "100%",
		height: "100%",
		backgroundPosition: "top",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
	},
	text1PromoIcon: { fontSize: 12, fontWeight: "bold", color: "#A55108" },
	text2PromoIcon: {
		color: "#A55108",
		fontSize: 12,
		textDecorationLine: "underline",
	},
})

@observer
export class Modal extends React.PureComponent {
	render() {
		const { layer, children, size, ...nextProps } = this.props

		return (
			<Overlay {...nextProps}>
				<View
					style={[
						LayoutStyles.centerContent,
						Styles.modal_background,
						ModalStyles.background,
					]}
				>
					<View
						style={[
							LayerStyles[layer || "modal"],
							MetricsStyles.components.group,
							ModalStyles.container,
							Styles.medium,
						]}
					>
						{children}
					</View>
				</View>
			</Overlay>
		)
	}
}

const codeInfo = {
	code: "PO4023715225745249",
	expire: new Date(2021, 12, 16, 9, 17, 0, 0),
	creationTime: new Date(2020, 12, 16, 9, 17, 0, 0),
	type: 0,
}

export function PromoModal(props) {
	const { t } = useTranslation()
	const { onRequestClose, ...nextProps } = props
	const [hasCode, setHasCode] = useState(false)
	const [stepPromo, setStepPromo] = useState(0)
	const [stateCredit, setStateCredit] = useState(
		t("protect:promo.applyThisCredit").toString()
	)
	const [validate, setValidate] = useState("")
	const [codeValid, setCodeValid] = useState(false)
	const [price, setPrice] = useState(5)
	const [priceAddCode, setPriceAddCode] = useState(undefined)
	const [codeValueContent, setCodeValueContent] = useState("")
	const [amount, setAmount] = useState(7)
	const [flexPromo, setFlexPromo] = useState(8)
	const onClickBuy = () => {
		if (!hasCode && stepPromo === 0) {
			setStepPromo(1)
		} else if (stepPromo === 1) {
			setAmount(amount - (hasCode ? priceAddCode : price))
			setStateCredit(t("protect:promo.creditApplied"))
			if (amount >= 0) {
				setPrice(0)
				setPriceAddCode(0)
			}
			setStepPromo(2)
		} else if (stepPromo === 2) {
			setStepPromo(3)
			setFlexPromo(2)
		} else if (stepPromo === 3) {
			props.onRequestClose()
		} else if (hasCode && stepPromo === 0) {
			props.onRequestClose()
		}
	}

	const onFindOutMore = () => {}

	const applyPromo = () => {
		if (stepPromo !== 2) setStepPromo(0)
	}

	const onChangeCode = (val) => {
		if (val === codeInfo.code) {
			setValidate(t("protect:promo.validCode"))
			setCodeValid(true)
			var hoursRemaining =
				(codeInfo.expire - codeInfo.creationTime) / (1000 * 60 * 60)
			switch (codeInfo.type) {
				case 0:
					setCodeValueContent(
						t("protect:promo.codeValueContent", {
							hoursRemaining: hoursRemaining,
							expire: codeInfo.expire.toDateString(),
						})
					)
					setPriceAddCode(price - price)
					break
			}
			setHasCode(true)
		} else {
			setPriceAddCode(undefined)
			setCodeValueContent("")
			setCodeValid(false)
			setValidate("")
			setHasCode(false)
		}
	}

	return (
		<Modal {...nextProps}>
			<Column style={{ maxWidth: 500, flex: 1 }}>
				<Row
					of="component"
					layer="overground_moderate"
					style={Styles.header_background}
				>
					<Column flex={12} style={Styles.promoBackground} align="right">
						<Button
							small
							icon={<XIcon />}
							onClick={onRequestClose}
							style={Styles.header_button}
						/>
					</Column>
				</Row>
				<Flex />
				<Row style={{ backgroundColor: "white" }}>
					<Column flex={12} style={{ padding: 20 }}>
						<Row style={Styles.rowContent}>
							<Text action bold>
								{t("protect:promo.heading")}
							</Text>
						</Row>
						<Row style={Styles.rowContent}>
							<Heading level={3}>{t("protect:promo.title")}</Heading>
						</Row>

						<Row style={Styles.rowContent}>
							<Text secondary>{t("protect:promo.description")}</Text>
						</Row>
						{stepPromo === 0 && (
							<>
								<Row style={Styles.rowContent}>
									<TextField
										label={t("protect:promo.codeTitle")}
										placeholder={t("protect:promo.codePlaceHolder")}
										after={<Text action>{validate}</Text>}
										onChangeText={onChangeCode}
										error={!codeValid}
									/>
								</Row>

								{codeValid && (
									<Row style={[Styles.rowContent]}>
										<Text
											secondary
											small
											align="right"
											dangerouslySetInnerHTML={{ __html: codeValueContent }}
										></Text>
									</Row>
								)}
							</>
						)}

						{(stepPromo === 1 || stepPromo === 2) && (
							<Row style={[Styles.rowContent, Styles.promoAmountContent]}>
								<Column>
									<Text bold>
										{t("protect:promo.amountRemaining", { amount: amount })}
									</Text>
									<TouchableWithoutFeedback onPress={applyPromo}>
										<Text
											align="right"
											action
											style={{
												textDecorationLine: "underline",
											}}
										>
											{stateCredit}
										</Text>
									</TouchableWithoutFeedback>
								</Column>
							</Row>
						)}

						<Row style={[Styles.rowContent]}>
							{/* {stepPromo === 3 && (
								<Column flex={2}>
									<Row align="center">
										<Text
											style={{
												textDecorationLine: "line-through",
												fontSize: 13,
											}}
										>
											${price.toString()}
										</Text>
									</Row>
									<Row align="center">
										<Text style={{ fontWeight: "bold" }}>
											${price.toString()}
										</Text>
									</Row>
								</Column>
							)}
							{stepPromo === 3 && (
								<Column flex={4}>
									<Column style={Styles.promoIcon}>
										<Row align="center">
											<Text style={Styles.text1PromoIcon}>
												{t("protect:promo.dollarOfCredit", { price: 5 })}
											</Text>
										</Row>
										<Row align="center">
											<TouchableWithoutFeedback onPress={onFindOutMore}>
												<Text style={Styles.text2PromoIcon}>
													{t("protect:promo.findOutMore")}
												</Text>
											</TouchableWithoutFeedback>
										</Row>
									</Column>
								</Column>
							)} */}
							<Column flex={flexPromo}></Column>
							<Column flex={4}>
								<Button
									text={t("protect:promo.buy", {
										price: priceAddCode ?? price,
									})}
									style={{ height: 46 }}
									onClick={() => {
										onClickBuy()
									}}
								/>
							</Column>
						</Row>
					</Column>
				</Row>
			</Column>
		</Modal>
	)
}

export default PromoModal

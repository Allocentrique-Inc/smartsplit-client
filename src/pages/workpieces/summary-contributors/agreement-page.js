import React from "react"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { StyleSheet, View } from "react-native"
import { Column, Flex, Row } from "../../../layout"
import Button from "../../../widgets/button"
import { Metrics, Typography } from "../../../theme"
import LogoSmartSplitBlackGreen from "../../../svg/smartsplit-logo-black-green"
import { Heading, Text } from "../../../text"
import Scrollable from "../../../widgets/scrollable"

const Styles = StyleSheet.create({
	paddingLayout: {
		paddingHorizontal: "17%",
		paddingVertical: "2%",
	},
	rowBtnTop: { justifyContent: "flex-end" },
	logoPadding: {
		paddingTop: 48,
	},
})

const data = [
	{
		fullName: "Debbie Herbie Tebbs",
		artistName: "Debbie Tebbs",
		ipi: "#518507355",
		address: "5540, 5e avenue, Montréal, Québec, Canada, H1Y 2S7",
		phone: "(514) 771-8322",
		email: "debbie@debbietebbs.com",
	},
	{
		fullName: "Debbie Herbie Tebbs",
		artistName: "Debbie Tebbs",
		ipi: "#518507355",
		address: "5540, 5e avenue, Montréal, Québec, Canada, H1Y 2S7",
		phone: "(514) 771-8322",
		email: "debbie@debbietebbs.com",
	},
	{
		fullName: "Debbie Herbie Tebbs",
		artistName: "Debbie Tebbs",
		ipi: "#518507355",
		address: "5540, 5e avenue, Montréal, Québec, Canada, H1Y 2S7",
		phone: "(514) 771-8322",
		email: "debbie@debbietebbs.com",
	},
]

const AgreementPage = observer((props) => {
	const { t } = useTranslation()

	return (
		<Scrollable style={Styles.paddingLayout}>
			<Column flex={1}>
				<Row style={Styles.rowBtnTop}>
					<Button
						style={{ marginRight: 16 }}
						secondary
						text={t("shareYourRights:sensitiveInfoModal.downloadAsPDF")}
					/>
					<Button text={t("shareYourRights:agreement.toPrint")} />
				</Row>
				<Row style={Styles.logoPadding}>
					<LogoSmartSplitBlackGreen />
				</Row>
				<Row style={{ paddingTop: Metrics.spacing.xlarge }}>
					<Column>
						<Heading level={2}>
							{t("shareYourRights:agreement.sharingAgreement")}
						</Heading>
						<Text style={{ paddingTop: 8 }}>
							{t("shareYourRights:agreement.desc")}
						</Text>
					</Column>
				</Row>
				<Row style={{ paddingTop: 56 }}>
					<Column flex={4}>
						<Heading level={5}>
							{t("shareYourRights:agreement.agreementConcerningThe")}
						</Heading>
						<Text
							style={{ paddingTop: Metrics.spacing.small }}
							secondary
							dangerouslySetInnerHTML={{
								__html: t("shareYourRights:agreement.workInformation", {
									musicName: "Vrai ou Faux",
									descMusic: "feat. Sara-Danielle, Meggie Lennon",
									performer: "Debbie Tebbs",
								}),
							}}
						></Text>
					</Column>
					<Column flex={6} />
				</Row>
				{data.map((item, index) => {
					return (
						<PartiesAgreement
							key={index}
							index={index}
							data={item}
							style={{ paddingTop: index === 0 ? 56 : 32 }}
						/>
					)
				})}
				<Row style={{ paddingTop: Metrics.spacing.large }}>
					<Text secondary>{t("shareYourRights:agreement.allOfTheAbove")}</Text>
				</Row>
				<Row style={{ paddingVertical: 77 }}>
					<Text bold>{t("shareYourRights:agreement.sign")}</Text>
				</Row>
			</Column>
		</Scrollable>
	)
})

function PartiesAgreement(props) {
	const { data, index, ...nextProps } = props
	const { t } = useTranslation()
	const flexConfig = {
		info: { title: 2, value: 14 },
	}
	return (
		<Row {...nextProps}>
			<Column flex={4}>
				<Heading level={5}>
					{index === 0
						? t("shareYourRights:agreement.agreementBetween")
						: t("shareYourRights:agreement.and")}
				</Heading>
			</Column>
			<Column flex={8}>
				<Row>
					<Text
						secondary
						dangerouslySetInnerHTML={{
							__html: t("shareYourRights:agreement.nameAndArtistName", {
								fullName: data.fullName,
								artistName: data.artistName,
							}),
						}}
					/>
				</Row>
				<Row style={{ paddingTop: 16 }}>
					<Column flex={flexConfig.info.title}>
						<Text secondary>
							{t("shareYourRights:sensitiveInfoModal.ipi")}:
						</Text>
					</Column>
					<Column flex={flexConfig.info.value}>
						<Text secondary>{data.ipi}</Text>
					</Column>
				</Row>
				<Row>
					<Column flex={flexConfig.info.title}>
						<Text secondary>{t("shareYourRights:agreement.address")}:</Text>
					</Column>
					<Column flex={flexConfig.info.value}>
						<Text secondary>{data.address}</Text>
					</Column>
				</Row>
				<Row>
					<Column flex={flexConfig.info.title}>
						<Text secondary>{t("shareYourRights:agreement.phone")}:</Text>
					</Column>
					<Column flex={flexConfig.info.value}>
						<Text secondary>{data.phone}</Text>
					</Column>
				</Row>
				<Row>
					<Column flex={flexConfig.info.title}>
						<Text secondary>
							{t("shareYourRights:sensitiveInfoModal.email")}:
						</Text>
					</Column>
					<Column flex={flexConfig.info.value}>
						<Text secondary>{data.email}</Text>
					</Column>
				</Row>
			</Column>
		</Row>
	)
}

export default AgreementPage

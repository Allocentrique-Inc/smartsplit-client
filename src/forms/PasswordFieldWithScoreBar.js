import React from "react"
import { observer } from "mobx-react"
import RegisterModel from "../mobX/models/auth/RegisterModel"
import { useStorePath } from "../mobX"
import { useTranslation } from "react-i18next"
import { Column, Flex, Row } from "../layout"
import PasswordField from "./password"
import { Text } from "../text"
import ProgressBar from "../widgets/progress-bar"

const PasswordFieldWithScoreBar = observer((props) => {
	//const model: RegisterModel = useStorePath("auth", "regModel")
	const { field } = props
	const { model } = field
	const { t } = useTranslation()
	//const field = useFormField(props.name)
	//const score = zxcvbn(field.value).score

	return (
		<Column of="inside">
			<PasswordField {...props} />
			<Row style={{ alignItems: "center" }}>
				<Text secondary small style={{ flex: 3 }}>
					{t(model.passwordStrength)}
				</Text>
				<Flex />
				<ProgressBar
					size="tiny"
					style={{ flex: 1 }}
					color={model.passwordBarColor}
					progress={model.passwordProgress}
				/>
			</Row>
		</Column>
	)
})
export default PasswordFieldWithScoreBar

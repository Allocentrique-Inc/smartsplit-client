import React, { useState } from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import Slider from "../../widgets/slider"
import { formatPercentage } from "../../utils/utils"
import { Text } from "../../text"

const ManualShare = observer((value, onChange, ...nextProps) => {
	const [displayValue] = useState(() => observable.box(value))

	return (
		<>
			<Slider
				value={value}
				onChange={(value) => displayValue.set(value)}
				{...nextProps}
				onRelease={onChange}
			/>
			<Text bold>{formatPercentage(displayValue, 1)}</Text>
		</>
	)
})

export default ManualShare

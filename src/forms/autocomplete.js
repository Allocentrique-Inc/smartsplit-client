import React, { useState } from "react"
import { Column } from "../layout"
import TextDropdown from "./text-dropdown"
import { BasicTextField } from "./text"

export default function AutoCompleteField(props) {
	return <TextDropdown {...props}>
		{props.children}
	</TextDropdown>
}

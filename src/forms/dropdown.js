import React from "react"
import Dropdown from "../widgets/dropdown"
import Wrapper from "./wrapper"
import Frame from "./frame"
import { Metrics } from "../theme"

export default class DropdownField extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			managed: typeof props.open !== "undefined",
			open: !!props.open,
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (typeof props.open !== "undefined" && props.open !== state.open)
			return { open: props.open }

		return null
	}

	handleOnFocus = () => {
		if (this.props.onFocus) this.props.onFocus()

		if (!this.state.managed) this.setState({ open: true })
	}

	handleOnBlur = () => {
		if (this.props.onBlur) this.props.onBlur()

		if (!this.state.managed) this.setState({ open: false })
	}

	render() {
		const {
			label,
			label_hint,
			undertext,
			children,
			open,
			onFocus,
			onBlur,
			...nextProps
		} = this.props

		return (
			<Wrapper {...this.props}>
				<Frame focused={this.state.open}>
					<Dropdown
						{...nextProps}
						open={this.state.open}
						onFocus={this.handleOnFocus}
						onBlur={this.handleOnBlur}
						positionAdjust={{
							x: -Metrics.spacing.inside,
							y: Metrics.spacing.inside - Metrics.borderRadius.forms,
							width: 2 * Metrics.spacing.inside + 2,
						}}
					>
						{children}
					</Dropdown>
				</Frame>
			</Wrapper>
		)
	}
}

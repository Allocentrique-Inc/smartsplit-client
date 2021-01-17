import * as React from "react"

function WaitingSVG(props) {
	return (
		<svg
			width={144}
			height={144}
			viewBox="0 0 144 144"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			{...props}
		>
			<rect x={22} y={26} width={96} height={96} rx={48} fill="#F5F2F3" />
			<rect
				x={26}
				y={22}
				width={96}
				height={96}
				rx={48}
				stroke="#DCDFE1"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M137 49v6M140 52h-6M11 104v6M14 107H8M13 2v10M13 22v10M8 17H2M24 17h-6"
				stroke="#DCDFE1"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx={13} cy={17} r={1} fill="#DCDFE1" />
			<path fill="url(#prefix__pattern0)" d="M44 44h56v56H44z" />
			<defs>
				<pattern
					id="prefix__pattern0"
					patternContentUnits="objectBoundingBox"
					width={1}
					height={1}
				>
					<use xlinkHref="#prefix__image0" transform="scale(.00926)" />
				</pattern>
				<image
					id="prefix__image0"
					width={108}
					height={108}
					xlinkHref="data:image/png;base64,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"
				/>
			</defs>
		</svg>
	)
}

export default WaitingSVG

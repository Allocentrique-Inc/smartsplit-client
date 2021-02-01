import * as React from "react"

function ShareYourRights(props) {
	return (
		<svg
			width={56}
			height={56}
			viewBox="0 0 56 56"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle
				cx={28}
				cy={28}
				r={9.429}
				stroke="#DCDFE1"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M26.429 49.945c.519.036 1.043.055 1.571.055 12.15 0 22-9.85 22-22 0-.796-.042-1.583-.125-2.357M12.68 43.788A21.935 21.935 0 016 28c0-3.687.907-7.162 2.51-10.214M18.57 8.117A21.915 21.915 0 0128 6c5.79 0 11.057 2.237 14.986 5.893M28 6v12.571M18.571 28H6M50 28H37.429"
				stroke="#DCDFE1"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M34.679 34.679l9.035 9.035"
				stroke="#DCDFE1"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<g
				filter="url(#prefix__filter0_d)"
				stroke="#8DA0B3"
				strokeWidth={2}
				strokeLinejoin="round"
			>
				<rect
					x={4}
					y={1}
					width={16}
					height={16}
					rx={8}
					fill="#fff"
					strokeLinecap="round"
				/>
				<path d="M12 9a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" />
				<path d="M16 16v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
			</g>
			<g
				filter="url(#prefix__filter1_d)"
				stroke="#8DA0B3"
				strokeWidth={2}
				strokeLinejoin="round"
			>
				<rect
					x={37}
					y={4}
					width={16}
					height={16}
					rx={8}
					fill="#fff"
					strokeLinecap="round"
				/>
				<path d="M45 12a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" />
				<path d="M49 19v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
			</g>
			<g
				filter="url(#prefix__filter2_d)"
				stroke="#8DA0B3"
				strokeWidth={2}
				strokeLinejoin="round"
			>
				<rect
					x={4}
					y={37}
					width={16}
					height={16}
					rx={8}
					fill="#fff"
					strokeLinecap="round"
				/>
				<path d="M12 45a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" />
				<path d="M16 52v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
			</g>
			<defs>
				<filter
					id="prefix__filter0_d"
					x={3}
					y={0}
					width={20}
					height={20}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx={2} dy={2} />
					<feColorMatrix values="0 0 0 0 0.94902 0 0 0 0 0.937255 0 0 0 0 0.941176 0 0 0 1 0" />
					<feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
					<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
				</filter>
				<filter
					id="prefix__filter1_d"
					x={36}
					y={3}
					width={20}
					height={20}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx={2} dy={2} />
					<feColorMatrix values="0 0 0 0 0.94902 0 0 0 0 0.937255 0 0 0 0 0.941176 0 0 0 1 0" />
					<feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
					<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
				</filter>
				<filter
					id="prefix__filter2_d"
					x={3}
					y={36}
					width={20}
					height={20}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx={2} dy={2} />
					<feColorMatrix values="0 0 0 0 0.94902 0 0 0 0 0.937255 0 0 0 0 0.941176 0 0 0 1 0" />
					<feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
					<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
				</filter>
			</defs>
		</svg>
	)
}

export default ShareYourRights

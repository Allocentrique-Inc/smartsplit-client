/**
 * Tailles et dimmensions
 */
export const Metrics = {
	/**
	 * Espacement entre composantes, incluant toutes marges de composantes intérieures
	 */
	spacing: {
		components: {
			// Espacement total entre deux sections
			xlarge:  64,
			section: 64,

			// Espacement total entre deux groupes
			large: 32,
			group: 32,

			// Espacement total entre deux composantes
			medium:    16,
			component: 16,

			// Espacement total entre deux sous-composantes 
			small:  8,
			inside: 8,

			// Marge standard entre les petits éléments visuels
			xsmall: 4,
			tiny:   4,
		},
	},

	// Taille des widgets: boutons, images, etc.
	size: {
		xlarge: 72,
		large:  56,
		medium: 40,
		small:  24,
		xsmall: 16,
	},

	// Courbature des bordures */
	borderRadius: {
		forms:  2,
		modals: 4,
	},
}

export const Colors = {
	action:           "#2DA84F",
	primary:          "#203548",
	primary_reversed: "#FFFFFF",
	secondary:        "#687A8B",
	tertiary:         "#8DA0B2",
	stroke:           "#DCDFE1",
	inactive:         "#8DA0B3",

	secondaries: {
		purple:   "#BCBBF2",
		scarlett: "#D9ACF7",
		pink:     "#EBB1DC",
		salmon:   "#FFAFA8",
		coral:    "#FCB8C5",
		peach:    "#FAC0AE",
		orange:   "#FFD0A9",
		yellow:   "#F8EBA3",
		olive:    "#C6D9AD",
		green:    "#C6F3B6",
		teal:     "#93E9E4",
		skyblue:  "#91DDFE",
		indigo:   "#A4B7F1",
	},

	background: {
		ground:                "#FFFFFF",
		underground:           "#FAF8F9",
		hell:                  "#F2EFF0",
		underground_reversed:  "#322129",
		underground_reversed2: "#3F2933",
	},
}

export const Typography = {
	Weight: {
		normal: "400",
		heavy:  "500",
		bold:   "700",
	},

	font: "IBM Plex Sans",

	titles: {
		1: {
			size:   40,
			height: 48,
			weight: "500",
		},

		2: {
			size:   32,
			height: 40,
			weight: "700",
		},

		3: {
			size:   24,
			height: 32,
			weight: "700",
		},

		4: {
			size:   18,
			height: 24,
			weight: "700",
		},

		5: {
			size:   16,
			height: 24,
			weight: "700",
		},
	},

	text: {
		small: {
			size:   12,
			height: 16,
		},
		medium: {
			size:   16,
			height: 24,
		},
	},
}

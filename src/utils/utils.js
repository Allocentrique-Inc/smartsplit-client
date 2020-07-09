export const Origin = {
	x: 0,
	y: 0,
}

export function degreesToRadians(angle) {
	return -(angle * Math.PI) / 180
}

export function vectorOf(a, b, scalar) {
	return {
		x: (b.x - a.x) * (scalar || 1),
		y: (b.y - a.y) * (scalar || 1),
	}
}

export function rotatePoint(from, center, angle) {
	return translatePoint(
		rotateCenteredPoint(translatePoint(from, vectorOf(center, Origin)), angle),
		vectorOf(Origin, center)
	)
}

export function translatePoint(from, vector, scalar) {
	return {
		x: from.x + vector.x * (scalar || 1),
		y: from.y + vector.y * (scalar || 1),
	}
}

export function rotateCenteredPoint(from, angle) {
	return {
		x: from.x * Math.cos(angle) + from.y * Math.sin(angle),
		y: -from.x * Math.sin(angle) + from.y * Math.cos(angle),
	}
}

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
export function lightenDarkenColor(color, amount) {
	let usePound = false

	if (color[0] === "#") {
		color = color.slice(1)
		usePound = true
	}

	let num = parseInt(color, 16)

	let r = (num >> 16) + amount

	if (r > 255) r = 255
	else if (r < 0) r = 0

	let b = ((num >> 8) & 0x00ff) + amount

	if (b > 255) b = 255
	else if (b < 0) b = 0

	let g = (num & 0x0000ff) + amount

	if (g > 255) g = 255
	else if (g < 0) g = 0

	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}

export function formatPercentage(percent) {
	return percent ? `${percent.toFixed(2)} %` : ""
}

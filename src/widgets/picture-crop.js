import React, { useState, useEffect } from "react"
import { Platform, View, Image, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { DialogModal } from "./modal"
import Button from "./button"

import TextField from "../forms/text"

export const MAX_ZOOM = 4
export const ZOOM_WHEEL_DIVIDER = 200

export const Styles = StyleSheet.create({
	cropContainer: {
		margin: 32,
		width: 512,
		height: 512,
		borderRadius: 256,
		overflow: "hidden",
		position: "relative",
	},
})

export default function PictureCropWeb(props) {
	const { image, onCropChange } = props

	// TODO: Les performances pourraient être largement améliorées en modifiant
	// directement le tag <img> et le repositionnant. L'utilisation de React ici
	// cause énormément de re-rendus assez coûteux en performance.

	const [layoutWidth, setLayoutWidth] = useState(0)
	const [layoutHeight, setLayoutHeight] = useState(0)
	const [imageWidth, setImageWidth] = useState(0)
	const [imageHeight, setImageHeight] = useState(0)

	const [left, setLeft] = useState(0)
	const [top, setTop] = useState(0)
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [zoom, setZoomState] = useState(1.0)

	const setZoom = (newZoom) =>
		setZoomState(Math.max(1, Math.min(newZoom, MAX_ZOOM)))

	const [dragging, setDragging] = useState(null)

	const handleRef = (img) => {
		if (!img) return
		if (img.naturalWidth) setImageWidth(img.naturalWidth)
		if (img.naturalHeight) setImageHeight(img.naturalHeight)
	}

	const onLayout = ({ nativeEvent }) => {
		setLayoutWidth(nativeEvent.layout.width)
		setLayoutHeight(nativeEvent.layout.height)
	}

	const handleScrollWheelZoom = (e) => {
		const delta = e.deltaY || e.deltaZ || e.deltaX
		setZoom(zoom - delta / ZOOM_WHEEL_DIVIDER)
	}

	const handleMouseDown = (e) => {
		e.preventDefault()

		setDragging({
			imageX: left,
			imageY: top,
			mouseX: e.clientX,
			mouseY: e.clientY,
		})
	}

	const handleMouseUp = () => setDragging(null)

	const handleMouseMove = (e) => {
		if (!dragging) return
		setLeft(dragging.imageX - dragging.mouseX + e.clientX)
		setTop(dragging.imageY - dragging.mouseY + e.clientY)
	}

	const computeImageSize = () => {
		if (!imageWidth || !imageHeight || !layoutWidth || !layoutHeight)
			return [0, 0]

		let ratio, newWidth, newHeight

		if (imageWidth > imageHeight) {
			ratio = layoutHeight / imageHeight
			newWidth = imageWidth * ratio * zoom
			newHeight = layoutHeight * zoom
		} else {
			ratio = (layoutWidth / imageWidth) * zoom
			newWidth = layoutWidth * zoom
			newHeight = imageHeight * ratio
		}

		return [newWidth, newHeight]
	}

	const updateCrop = () => {
		const scaleX = imageWidth / width
		const scaleY = imageHeight / height

		onCropChange(
			-left * scaleX,
			-top * scaleY,
			layoutWidth * scaleX,
			layoutHeight * scaleY
		)
	}

	// Gestion du changement de zoom
	useEffect(() => {
		const [newWidth, newHeight] = computeImageSize()
		setWidth(newWidth)
		setHeight(newHeight)
		setLeft(left - (newWidth - width) / 2)
		setTop(top - (newHeight - height) / 2)
	}, [layoutWidth, layoutHeight, imageWidth, imageHeight, zoom])

	// Limiter les bornes
	useEffect(() => {
		setLeft(Math.max(layoutWidth - width, Math.min(left, 0)))
		setTop(Math.max(layoutHeight - height, Math.min(top, 0)))
		updateCrop()
	}, [layoutWidth, layoutHeight, width, height, left, top])

	// Recentrer lorsque le conteneur ou l'image change
	useEffect(() => {
		const [newWidth, newHeight] = computeImageSize()
		setLeft((layoutWidth - newWidth) / 2)
		setTop((layoutHeight - newHeight) / 2)
		updateCrop()
	}, [layoutWidth, layoutHeight, imageWidth, imageHeight])

	return (
		<View style={Styles.cropContainer} onLayout={onLayout}>
			<img
				ref={handleRef}
				src={image}
				style={{
					position: "absolute",
					left,
					top,
					width,
					height,
				}}
				onWheel={handleScrollWheelZoom}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			/>
		</View>
	)
}

export const PictureCrop = Platform.select({ web: PictureCropWeb })

export function cropPicture(imageData, x, y, width, height) {
	const original = document.createElement("img")
	original.src = imageData

	const canvas = document.createElement("canvas")
	canvas.width = width
	canvas.height = height

	const ctx = canvas.getContext("2d")
	ctx.drawImage(original, x, y, width, height, 0, 0, width, height)

	return canvas.toDataURL("image/jpeg")
}

export function PictureCropModal(props) {
	const [t] = useTranslation()
	const {
		visible,
		onRequestClose,
		onCropChange,
		onSave,
		onSaveImage,
		image,
		...nextProps
	} = props

	let cropState = [0, 0, 0, 0] // hack performance

	const handleCropChange = (x, y, width, height) => {
		cropState = [x, y, width, height]
		onCropChange && onCropChange(...cropState)
	}

	const handleSave = () => {
		onSave && onSave(...cropState)
		onSaveImage && onSaveImage(cropPicture(image.uri, ...cropState))
	}

	return (
		<DialogModal
			{...nextProps}
			visible={visible}
			onRequestClose={onRequestClose}
			title={t("widgets:pictureCrop.title")}
			buttons={
				<>
					<Button
						secondary
						text={t("general:buttons.cancel")}
						onClick={onRequestClose}
					/>
					<Button
						primary
						text={t("general:buttons.save")}
						onClick={handleSave}
					/>
				</>
			}
		>
			{image && (
				<PictureCrop image={image.uri} onCropChange={handleCropChange} />
			)}
		</DialogModal>
	)
}

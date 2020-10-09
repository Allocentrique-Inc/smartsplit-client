import { useState, useEffect } from "react"
import * as ImagePicker from "expo-image-picker"

export default function useImagePicker() {
	const [image, setImage] = useState(null)
	const [imageError, setImageError] = useState(null)

	function pickImage(imageOverride = undefined) {
		// Forcer la sélection d'image (pour reset)
		if (imageOverride !== undefined) {
			setImage(imageOverride)
			setImageError(null)
			return
		}

		ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			base64: false,
			exif: false,
		})
			.then((result) => {
				if (result.cancelled) setImage(false)
				else setImage(result)
			})
			.catch((error) => {
				//console.log("Error selecting picture:", error)
				setImageError(error)
			})
	}

	return [image, pickImage, imageError]
}

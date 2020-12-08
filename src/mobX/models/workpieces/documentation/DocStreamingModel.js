import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
import PandoraIcon from "../../../../svg/workpieces/pandora"
import SoundcloudIcon from "../../../../svg/workpieces/soundcloud"
import DeezerIcon from "../../../../svg/workpieces/deezer"
import YoutubeIcon from "../../../../svg/workpieces/youtube"
import SpotifyIcon from "../../../../svg/workpieces/spotify"
import ITunesIcon from "../../../../svg/workpieces/itunes"
import AmazonIcon from "../../../../svg/workpieces/amazon"
import GooglePlayIcon from "../../../../svg/workpieces/google-play"
export default class DocStreamingModel extends BaseModel {
	@observable links = new Field(this, "links", {
		type: FieldType.map,
		default: {
			spotify: "",
			google: "",
			apple: "",
			amazon: "",
			youtube: "",
			pendora: "",
			soundcloud: "",
			deezer: "",
		},
	})
	importData(obj) {
		if (!obj) return null
		let linksNormalized = {
			spotify: "",
			google: "",
			apple: "",
			amazon: "",
			youtube: "",
			pendora: "",
			soundcloud: "",
			deezer: "",
		}
		console.log(linksNormalized)
		if (obj && obj.links)
			obj.links.forEach((link) => {
				linksNormalized[link.platform] = link.url
			})
		return { links: linksNormalized }
	}
	toJS() {
		let values = super.toJS().links
		let links = []
		Object.keys(values).forEach((key) => {
			links.push({ platform: key, url: values[key] })
		})
		return { links: links }
	}
	@observable otherPlatforms = new Field(this, "otherPlatforms", {
		type: FieldType.collection,
	})
}

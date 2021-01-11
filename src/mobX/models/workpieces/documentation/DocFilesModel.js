import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { API_BASE_URL } from "../../../../../config"
import { observable, action, computed, runInAction } from "mobx"
import { uploadDocFile } from "../../../../../api/workpieces"

export default class DocFilesModel extends BaseModel {
	@observable scores = new Field(this, "scores", { type: FieldType.collection })
	@observable midi = new Field(this, "midi", { type: FieldType.collection })
	@observable audio = new Field(this, "audio", { type: FieldType.collection })
	@observable art = new Field(this, "art", { type: FieldType.collection })

	@observable uploading = false
	@observable uploadProgress = 0
	@observable uploadType = null
	@action async upload(workpieceId, file, type) {
		let response = await uploadDocFile(
			workpieceId,
			file,
			(percentCompleted) => {
				console.log(percentCompleted)
				runInAction(() => {
					this.uploadProgress = percentCompleted
				})
			}
		)
		return response
	}
}

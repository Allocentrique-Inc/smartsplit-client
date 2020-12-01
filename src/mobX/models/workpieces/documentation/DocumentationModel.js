import { observable, action, computed } from "mobx"
import DocCreationModel from "./DocCreationModel"
import DocPerformanceModel from "./DocPerformanceModel"
import DocLyricsModel from "./DocLyricsModel"
import DocRecordingModel from "./DocRecordingModel"
import DocFilesModel from "./DocFilesModel"
import DocReleaseModel from "./DocReleaseModel"
import DocInfosModel from "./DocInfosModel"
import BaseModel from "../../../BaseModel/BaseModel"
const makeObservable = () => {}
export default class DocumentationModel extends BaseModel {
	workpiece
	@observable creation = new DocCreationModel(this)
	@observable performance = new DocPerformanceModel(this)
	@observable lyrics = new DocLyricsModel(this)
	@observable files = new DocFilesModel(this)
	@observable recording = new DocRecordingModel(this)
	@observable release = new DocReleaseModel(this)
	@observable infos = new DocInfosModel(this)
	constructor(parent, workpiece) {
		super()
		makeObservable(this)
		this.workpiece = workpiece
		window.docModel = this
	}
	// small change
}

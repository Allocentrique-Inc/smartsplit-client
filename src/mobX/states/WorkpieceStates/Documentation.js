import { observable, action, computed } from "mobx"
import DocCreationModel from "../../models/workpieces/documentation/DocCreationModel"
import DocPerformanceModel from "../../models/workpieces/documentation/DocPerformanceModel"
import DocLyricsModel from "../../models/workpieces/documentation/DocLyricsModel"
import DocRecordingModel from "../../models/workpieces/documentation/DocRecordingModel"
import DocFilesModel from "../../models/workpieces/documentation/DocFilesModel"
import DocReleaseModel from "../../models/workpieces/documentation/DocReleaseModel"

export default class Documentation {
	workpiece
	@observable creation = new DocCreationModel()
	@observable performance = new DocPerformanceModel()
	@observable lyrics = new DocLyricsModel()
	@observable files = new DocFilesModel()
	@observable recording = new DocRecordingModel()
	@observable release = new DocReleaseModel()
	constructor(workpiece, docsData) {
		this.workpiece = workpiece
		console.log("intializing the creation model")
		this.creation.init()
		this.performance.init()
		this.lyrics.init()
		this.files.init()
		this.recording.init()
		this.release.init()
	}
}

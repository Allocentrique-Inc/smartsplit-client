import BaseModel from "../../../BaseModel"
import { observable } from "mobx"
import CopyrightSplitModel from "./CopyrightSplitModel"
import PerformanceSplitModel from "./PerformanceSplitModel"
import RecordingSplitModel from "./RecordingSplitModel"

/**
 *	Model class managing the 3 splits (copyright, performance, recording)
 **/
export default class RightSplitsModel extends BaseModel {
	workpiece
	@observable copyright = new CopyrightSplitModel()
	@observable performance = new PerformanceSplitModel()
	@observable recording = new RecordingSplitModel()

	constructor(parent, workpiece) {
		super(parent)
		this.workpiece = workpiece
	}
}

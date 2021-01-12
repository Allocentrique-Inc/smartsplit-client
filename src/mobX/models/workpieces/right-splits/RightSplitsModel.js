import BaseModel from '../../../BaseModel';
import CopyrightSplitModel from "./CopyrightSplitModel.js"
import PerformanceSplitModel from "./PerformanceSplitModel"
import RecordingSplitModel from "./RecordingSplitModel"
import { observable } from 'mobx';

export default class RightSplitsModel extends BaseModel {
	constructor(workpiece) {
		super()
		this.workpiece = workpiece
	}
	@observable workpiece
	@observable copyright = new CopyrightSplitModel(this)
	@observable performance = new PerformanceSplitModel(this)
	@observable recording = new RecordingSplitModel(this)
}
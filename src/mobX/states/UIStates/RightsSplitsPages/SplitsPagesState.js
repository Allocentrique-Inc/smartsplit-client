import CopyrightSplit from "./CopyrightSplit"
import PerformanceSplit from "./PerformanceSplit"
import RecordingSplit from "./RecordingSplit"
export default class SplitsPagesState {
	copyright = new CopyrightSplit()
	performance = new PerformanceSplit()
	recording = new RecordingSplit()
}

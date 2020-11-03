import BaseState from "../../../BaseState"
import CopyrightSplit from "./CopyrightSplit"
import PerformanceSplit from "./PerformanceSplit"

export default class SplitsPagesState extends BaseState {
	copyright = new CopyrightSplit()
	performance = new PerformanceSplit()
}
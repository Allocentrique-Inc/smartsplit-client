import { createEntityListState } from "../crud"
import ContentLanguageModel from "../models/ContentLanguageModel"
const ContentLanguageState = createEntityListState(
	"content-languages",
	ContentLanguageModel
)
export default ContentLanguageState

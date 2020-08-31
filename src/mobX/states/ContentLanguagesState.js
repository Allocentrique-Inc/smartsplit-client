import { createEntityListState } from "../factory"
import ContentLanguageModel from "../models/ContentLanguageModel"
const ContentLanguageState = createEntityListState(
	"content-languages",
	ContentLanguageModel
)
export default ContentLanguageState

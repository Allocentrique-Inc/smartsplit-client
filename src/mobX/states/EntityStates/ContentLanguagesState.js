import { createEntityListState } from "../../crud"
import ContentLanguageModel from "../../models/entities/ContentLanguageModel"
const ContentLanguageState = createEntityListState(
	"content-languages",
	ContentLanguageModel
)
export default ContentLanguageState

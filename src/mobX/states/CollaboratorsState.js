import ContributorsState from "./ContributorsState"
import CollaboratorModel from "../models/user/CollaboratorModel"
import CollaboratorsApi from "../../../api/collaborators"

/**
 * this state is virtually identical to contributors
 */
export default class CollaboratorsState extends ContributorsState {
	modelType = CollaboratorModel
	apiType = CollaboratorsApi
	type = "collaborator"
}

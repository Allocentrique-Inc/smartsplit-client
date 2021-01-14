import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
import { cleanUsersForPosting } from "./DocumentationModel"
export default class DocInfosModel extends BaseModel {
	@computed get isEmpty() {
		return (
			!this.length.value &&
			!this.BPM.value &&
			!this.primaryGenre.value &&
			this.secondaryGenres.array.length === 0 &&
			this.influences.array.length === 0
		)
	}
	@observable length = new Field(this, "length", {
		type: FieldType.string,
		label: "document:infos.length",
	})
	@observable BPM = new Field(this, "BPM", {
		type: FieldType.int,
		label: "BPM",
	})
	@observable primaryGenre = new Field(this, "primaryGenre", {
		type: FieldType.string,
	})
	@observable secondaryGenres = new Field(this, "secondaryGenres", {
		type: FieldType.collection,
	})

	@observable influences = new Field(this, "influences", {
		type: FieldType.collection,
	})

	@action async addNewSecondaryGenre(name) {
		//TODO add genre via entity API
		// const genre = await CreateGenre(name);
		const genre = { id: "test" + new Date().getTime(), name: name }
		this.secondaryGenres.add(genre)
	}
}

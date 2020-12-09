import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocInfosModel extends BaseModel {
	@observable length = new Field(this, "length", { type: FieldType.string })
	@observable bpm = new Field(this, "bpm", { type: FieldType.string })
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

import { observable } from "mobx";
import BaseModel, { Field, FieldType } from "../../../BaseModel";
import { cleanUsersForPosting } from "./ProtectionModel";


export default class CertificateModel extends BaseModel {
    @observable musicalPiece = new Field(this, "musicalPiece", {
        type: FieldType.string
    })
    @observable sourceFile = new Field(this, "sourceFile", {
        type: FieldType.string
    })
    @observable format = new Field(this, "format", {
        type: FieldType.string
    })
    @observable versionName = new Field(this, "versionName", {
        type: FieldType.string
    })
    @observable workingVersion = new Field(this, "workingVersion", {
        type: FieldType.string
    })
    @observable listedBy = new Field(this, "listedBy", {
        type: FieldType.string
    })
    @observable sha256 = new Field(this, "sha256", { type: FieldType.string })
    @observable md5 = new Field(this, "md5", { type: FieldType.string })

    @observable title = ""

    @observable firstName = "First Name"
    toJS(excludePrimary) {
        return cleanUsersForPosting(super.toJS())
    }
}
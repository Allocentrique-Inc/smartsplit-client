import { observable } from "mobx";
import BaseModel, { Field, FieldType } from "../../../BaseModel";
import { cleanUsersForPosting } from "./ProtectionModel";


export default class CertificateModel extends BaseModel {
    @observable musicalPiece = new Field(this, "musicalPiece", {
        type: FieldType.string
    })

    toJS(excludePrimary) {
        return cleanUsersForPosting(super.toJS())
    }
}
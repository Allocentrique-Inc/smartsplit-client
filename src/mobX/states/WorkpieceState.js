import { createCrudObservable, createEntityListObservable } from "../crud"
import WorkpiecesCrudAPI, {
	getDocumentation,
	getProtection,
	listForUser,
} from "../../../api/workpieces"
import { action, observable, reaction, runInAction } from "mobx"
import DocumentationModel from "../models/workpieces/documentation/DocumentationModel"
import ProtectionModel from "../models/workpieces/protect/ProtectionModel"
import WorkpieceModel from "../models/workpieces/WorkpieceModel"
import RightSplitsState from "../models/workpieces/right-splits/RightSplitsState"
const WorkpieceObservable = createCrudObservable(
	WorkpiecesCrudAPI,
	"workpiece_id"
)

export const $workpiece = Symbol("Workpiece")

export class Workpiece extends WorkpieceObservable {
	/**
	 * the documentation model
	 */
	@observable documentation: DocumentationModel
	@observable protection: ProtectionModel
	@observable rightSplits: RightSplitsState

	constructor(id, initData = null, initState) {
		const { files, rightSplit, ...data } = initData || {}
		super(id, data, initState)
		this.rightSplits = new RightSplitsState(this)
		// initialising the documentation by passing the workpiece for id, etc
		this.documentation = new DocumentationModel(
			null,
			this /*, documentation data extracted from data */
		)
		getDocumentation(id).then((docs) => {
			this.documentation.init(docs.data)
		})
		//this.documentation.init()
		//console.log(toJS(this.documentation))
		//console.log(this.documentation.toJS())

		this.protection = new ProtectionModel(null, this)

		getProtection(id).then((pro) => {
			this.protection.init({
				files: [],
				certificate: {
					listedBy: {
						user_id: "09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb",
						firstName: "Willy",
						lastName: "Nilly",
						artistName: "Willy the Poo",
						avatarUrl:
							"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
					},
					sourceFile: "Valaire - Fantome v1.wav",
					format: "WAV 44,1 kHz",
					versionName: "Fantôme V1",
					workingVersion: "Démo",
					sha256:
						"0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
					md5: "d41d8cd98f00b204e9800998ecf8427e",
					addictions: [
						{
							id: 1,
							status: 0,
							name: "Valaire - Fantome v2 mixdown.wav",
							time: new Date(),
							author: "Inscience",
							tag: "Demo",
						},
						{
							id: 2,
							status: 1,
							name: "Valaire - Fantome v1.wav",
							time: new Date(2020, 11, 10),
							author: "Inscience",
							tag: "Mix",
						},
						{
							id: 3,
							status: 1,
							name: "Valaire - Fantome v1.wav",
							time: new Date(2020, 11, 8),
							author: "Inscience",
							tag: "Mix",
						},
					],
				},
				selection: {
					files: [
						{ fileId: "1", name: "Fantome_Mix_v01.wav" },
						{ fileId: "2", name: "Fantome_Demo_v01.wav" },
					],
				},
			})
		})
	}

	/**
	 * the documentation observable which contains models for the various sections
	 * of the workpiece documentation section
	 */
	@observable documentation

	set(props) {
		if (props.data) {
			const { rightSplit } = props.data
			if (rightSplit) {
				this.rightSplits._updateRightsSplits(rightSplit)
			}
		}
	}

	setData(data) {
		this.set({ data: { ...this.data, ...data } })
	}
}

const WorkpieceListObservable = createEntityListObservable(
	Workpiece,
	"workpiece_id"
)

export default class WorkpieceState extends WorkpieceListObservable {
	@observable error = null
	@observable isLoading = false
	@observable model = new WorkpieceModel()
	@action async submit() {
		await this.model.validate()
		if (this.model.isValid) {
			try {
				let workpiece = this.model.submit()
				await this.fetchWorkpieceList(this.root.auth.user_id)
				return workpiece
			} catch (e) {
				console.log(e)
				//	return false;
			}
		}
		return false
	}

	/**
	 * init workpieces
	 *
	 * we use a reaction in init that will fire immediately.
	 * and will also fire anytime the user id changes
	 * which normallu only happens when there is a login event
	 *
	 * @return {Promise<void>}
	 */
	async init() {
		//console.log(userId)
		this.model.init()
		reaction(
			() => this.root.auth.user_id,
			(userId) => {
				this.fetchWorkpieceList(userId)
			},
			{ fireImmediately: true }
		)
	}

	//Method overwrites current list atm
	@action
	async fetchWorkpieceList(userId) {
		if (!userId) return
		this.isLoading = true
		this.error = null
		try {
			const workpieces = await listForUser(userId)
			workpieces.forEach((wp) => {
				this.addToList(new Workpiece(wp.workpiece_id, wp, "ready"))
			})
			runInAction(() => {
				this.isLoading = false
			})
		} catch (e) {
			console.error("Error while fetching workpiece list:", e)
			runInAction(() => {
				this.isLoading = false
				this.error = e
			})
		}
	}

	get all() {
		return Object.values(this.list)
	}
}
